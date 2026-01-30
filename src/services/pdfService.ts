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

    // 3. Generate Visual Palette (Extract actual images)
    const images: string[] = [];
    const imageHashes = new Set<number>(); // Simple deduplication
    const pagesForImages = Math.min(pdf.numPages, 10);

    for (let i = 1; i <= pagesForImages && images.length < 12; i++) {
        try {
            const page = await pdf.getPage(i);
            const ops = await page.getOperatorList();

            for (let j = 0; j < ops.fnArray.length; j++) {
                // Check for paintImageXObject (101 is the constant for it in pdfjs common)
                // Using names directly if possible or the constant
                if (ops.fnArray[j] === (pdfjs as any).OPS?.paintImageXObject ||
                    ops.fnArray[j] === (pdfjs as any).OPS?.paintInlineImageXObject) {

                    const imgKey = ops.argsArray[j][0];
                    const imgData = await new Promise((resolve) => {
                        page.commonObjs.has(imgKey) ? resolve(page.commonObjs.get(imgKey)) :
                            page.objs.has(imgKey) ? resolve(page.objs.get(imgKey)) : resolve(null);
                    });

                    if (imgData && (imgData as any).width && (imgData as any).height) {
                        const { width, height, data } = imgData as any;

                        // Deduplicate roughly by width/height/first pixel for performance
                        const hash = width * height + data[0] + data[10];
                        if (imageHashes.has(hash)) continue;
                        imageHashes.add(hash);

                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            const imageData = ctx.createImageData(width, height);
                            // pdf.js image data can be RGB, RGBA or Grayscale. createImgData is RGBA.
                            // The conversion depends on the kind of data. Simple check:
                            if (data.length === width * height * 4) {
                                imageData.data.set(data);
                            } else if (data.length === width * height * 3) {
                                for (let k = 0, l = 0; k < data.length; k += 3, l += 4) {
                                    imageData.data[l] = data[k];
                                    imageData.data[l + 1] = data[k + 1];
                                    imageData.data[l + 2] = data[k + 2];
                                    imageData.data[l + 3] = 255;
                                }
                            } else {
                                // Fallback for grayscale or other formats if needed
                                continue;
                            }
                            ctx.putImageData(imageData, 0, 0);

                            // Only add if it's a reasonably large image (not an icon/divider)
                            if (width > 100 && height > 100) {
                                images.push(canvas.toDataURL('image/jpeg', 0.8));
                            }
                        }
                    }
                }
                if (images.length >= 12) break;
            }
        } catch (e) {
            console.warn(`Image extraction failed on page ${i}:`, e);
        }
    }

    // Fallback: If no images found, use page thumbnails (as it was before)
    if (images.length === 0) {
        const maxThumbnails = Math.min(pdf.numPages, 6);
        for (let i = 1; i <= maxThumbnails; i++) {
            try {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d', { alpha: false });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                if (context) {
                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    await page.render({ canvasContext: context, viewport }).promise;
                    images.push(canvas.toDataURL('image/jpeg', 0.8));
                }
            } catch (e) { }
        }
    }

    return {
        title,
        pageCount: pdf.numPages,
        fonts: Array.from(fontSet).slice(0, 10),
        thumbnails: images,
        creationDate
    };
};
