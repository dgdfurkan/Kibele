import * as pdfjs from 'pdfjs-dist';

// Use UNPKG for the worker, often more reliable for ESM imports in Vite.
const PDFJS_VERSION = '4.10.38';
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

export interface PDFMetadata {
    title: string;
    pageCount: number;
    fonts: string[];
    thumbnails: string[]; // Array of base64 images for Visual Palette
    creationDate?: string;
}

export const extractPDFData = async (file: File): Promise<PDFMetadata> => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    // 1. Basic Metadata
    const metadata = await pdf.getMetadata();
    const title = (metadata.info as any)?.Title || file.name.replace(/\.[^/.]+$/, "");
    const creationDate = (metadata.info as any)?.CreationDate || "";

    // 2. Extract Fonts
    const fontSet = new Set<string>();
    const pagesToScan = Math.min(pdf.numPages, 15); // Scan more pages for better detection

    // Formatting function for better display names
    const formatFontName = (name: string): string => {
        // Strip quotes and trim
        let cleaned = name.replace(/['"]/g, '').trim();

        // Map common generics FIRST before any cleaning
        const lower = cleaned.toLowerCase();
        if (lower === 'sans-serif' || lower.includes('sansserif')) return 'Sans Serif';
        if (lower === 'serif') return 'Serif';
        if (lower === 'monospace') return 'Monospace';

        // Clean subset prefix (e.g., ABCDEF+Montserrat -> Montserrat)
        if (cleaned.includes('+')) {
            cleaned = cleaned.split('+')[1];
        }

        // Remove PDF-specific internal prefixes
        if (/^g_d\d+_f\d+$/.test(cleaned)) return "";

        // Remove common PDF suffixes like ,Italic or -Bold
        cleaned = cleaned.replace(/[,\-](Bold|Italic|Regular|BoldItalic|SemiBold|Medium|Light|Black|ExtraBold|ExtraLight|Thin)$/i, '');

        // Replace dashes and underscores with spaces
        cleaned = cleaned.replace(/[_\-\.]/g, ' ');

        // Title Case: capitalize each word
        const result = cleaned.split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim();

        // One last check for remaining 'Sans Serif' issues
        if (result.toLowerCase() === 'sans serif') return 'Sans Serif';

        return result;
    };

    for (let i = 1; i <= pagesToScan; i++) {
        try {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();

            Object.values((textContent as any).styles).forEach((style: any) => {
                if (style.fontFamily) {
                    const formatted = formatFontName(style.fontFamily);
                    // Filter out purely numeric fonts or too short ones
                    if (formatted && formatted.length > 2 && !/^\d+$/.test(formatted)) {
                        fontSet.add(formatted);
                    }
                }
            });
        } catch (e) {
            console.warn(`Font extraction failed for page ${i}:`, e);
        }
    }

    if (fontSet.size === 0) fontSet.add("Helvetica");

    // 3. Generate Visual Palette
    const thumbnails: string[] = [];
    const maxThumbnails = Math.min(pdf.numPages, 6);

    for (let i = 1; i <= maxThumbnails; i++) {
        try {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.5 }); // Balanced scale
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d', { alpha: false }); // Better performance

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (context) {
                // Ensure white background (essential for transparent PDFs)
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);

                await page.render({
                    canvasContext: context,
                    viewport,
                    intent: 'display' // Optimization
                }).promise;

                thumbnails.push(canvas.toDataURL('image/jpeg', 0.85));
            }
        } catch (e) {
            console.error(`Thumbnail generation failed for page ${i}:`, e);
        }
    }

    return {
        title,
        pageCount: pdf.numPages,
        fonts: Array.from(fontSet).slice(0, 10),
        thumbnails,
        creationDate
    };
};
