export interface Project {
    id: string;
    title: string;
    font: string; // Primary font
    fonts?: string[]; // All detected fonts
    color: string;
    date: string;
    image: string; // Selected thumbnail
    pdfUrl?: string; // Cloudinary PDF link
    aspectRatio: string;
    client?: string;
    description?: string;
    position?: { x: number; y: number };
}
