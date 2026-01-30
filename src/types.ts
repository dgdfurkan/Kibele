export interface Project {
    id: string;
    title: string;
    font: string;
    color: string;
    date: string;
    image: string;
    aspectRatio: string;
    client?: string; // Optional for details
    description?: string; // Optional for details
    position?: { x: number; y: number }; // Canvas Coordinates
}
