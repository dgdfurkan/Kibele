import React, { useRef, useState, useEffect } from 'react';

interface InfiniteCanvasProps {
    children: React.ReactNode;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
    onTransformChange?: (transform: { scale: number; position: { x: number; y: number } }) => void;
}

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    children,
    initialScale = 1,
    minScale = 0.1,
    maxScale = 5,
    onTransformChange
}) => {
    // State
    const [scale, setScale] = useState(initialScale);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);

    // Notify parent of changes
    useEffect(() => {
        onTransformChange?.({ scale, position });
    }, [scale, position, onTransformChange]);

    // --- Space Key Handling ---
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && !e.repeat) {
                // Ignore if user is typing in an input
                if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
                e.preventDefault(); // Prevent page scroll mostly
                setIsSpacePressed(true);
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                setIsSpacePressed(false);
                setIsDragging(false); // Stop dragging if space released
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // --- Wheel Zoom (To Cursor) ---
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Stop browser gestures
            e.preventDefault();

            // Zoom Sensitivity
            const zoomSensitivity = 0.001;
            const delta = -e.deltaY * zoomSensitivity;

            // Calculate new scale with limits
            const newScale = Math.min(Math.max(minScale, scale + delta), maxScale);

            // MATH: Zoom towards mouse pointer
            // 1. Get mouse position relative to the container
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // 2. Calculate the offset change required to keep the point under the mouse stationary
            // The world coordinate under the mouse is: (mouseX - position.x) / scale
            // We want that same world coordinate to be at mouseX after scaling:
            // mouseX = position_new.x + worldX * newScale
            // position_new.x = mouseX - worldX * newScale

            const worldX = (mouseX - position.x) / scale;
            const worldY = (mouseY - position.y) / scale;

            const newX = mouseX - worldX * newScale;
            const newY = mouseY - worldY * newScale;

            setScale(newScale);
            setPosition({ x: newX, y: newY });
        };

        // Passive false is CRITICAL for preventing default
        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [scale, position, minScale, maxScale]);

    // --- Mouse Drag Handling (Pan) ---
    const handleMouseDown = (e: React.MouseEvent) => {
        // Pan only allowed if Space is pressed (or Middle click - optional, sticking to Space for now)
        if (isSpacePressed || e.button === 1) {
            setIsDragging(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            e.preventDefault(); // Prevent text selection etc
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;

        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className={`w-full h-screen overflow-hidden bg-[#101622] relative select-none ${isSpacePressed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
                }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {/* Dot Grid Layer - True Infinite via Background Position */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20 will-change-[background-position,background-size]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: `${20 * scale}px ${20 * scale}px`,
                    backgroundPosition: `${position.x}px ${position.y}px`
                }}
            />

            {/* Content Layer */}
            <div
                className="w-full h-full absolute inset-0 origin-top-left will-change-transform"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                }}
            >
                {children}
            </div>

            {/* HUD / Indicators (Optional debug) */}
            <div className="fixed bottom-4 left-4 text-white/30 text-xs pointer-events-none font-mono z-[60]">
                {Math.round(scale * 100)}% | {Math.round(position.x)}, {Math.round(position.y)}
                {!isSpacePressed && <span className="ml-2 opacity-50">(Hold SPACE to Pan)</span>}
            </div>

            {/* Export specific props if needed via context or ref in future */}
        </div>
    );
};
