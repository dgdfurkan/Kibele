import React, { useRef, useState, useEffect } from 'react';

interface InfiniteCanvasProps {
    children: React.ReactNode;
    initialScale?: number;
    minScale?: number;
    maxScale?: number;
    onTransformChange?: (transform: { scale: number; position: { x: number; y: number } }) => void;
    programmaticPosition?: { x: number; y: number }; // New prop for external control
}

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
    children,
    initialScale = 1,
    minScale = 0.1,
    maxScale = 5,
    onTransformChange,
    programmaticPosition
}) => {
    // State
    const [scale, setScale] = useState(initialScale);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Sync from external control (Navigator)
    useEffect(() => {
        if (programmaticPosition) {
            setPosition(programmaticPosition);
        }
    }, [programmaticPosition]);
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
            const zoomSensitivity = 0.0005; // Reduced from 0.001 for smoother control
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

    const [lastTouchPos, setLastTouchPos] = useState<{ x: number; y: number } | null>(null);
    const [lastTouchDist, setLastTouchDist] = useState<number | null>(null);

    // --- Mouse Drag Handling (Pan) ---
    const handleMouseDown = (e: React.MouseEvent) => {
        if (isSpacePressed || e.button === 1 || e.button === 0) {
            setIsDragging(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            e.preventDefault();
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

    // --- Touch Handling (Mobile) ---
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setLastTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            setLastTouchDist(null);
        } else if (e.touches.length === 2) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            setLastTouchDist(dist);
            setLastTouchPos({
                x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
                y: (e.touches[0].clientY + e.touches[1].clientY) / 2
            });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const container = containerRef.current;
        if (!container) return;

        if (e.touches.length === 1 && lastTouchPos) {
            const dx = e.touches[0].clientX - lastTouchPos.x;
            const dy = e.touches[0].clientY - lastTouchPos.y;
            setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            setLastTouchPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        } else if (e.touches.length === 2 && lastTouchDist && lastTouchPos) {
            const dist = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
            const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

            // Zoom
            const zoomFactor = dist / lastTouchDist;
            const newScale = Math.min(Math.max(minScale, scale * zoomFactor), maxScale);

            // Pan towards center of pinch
            const rect = container.getBoundingClientRect();
            const mouseX = centerX - rect.left;
            const mouseY = centerY - rect.top;

            const worldX = (mouseX - position.x) / scale;
            const worldY = (mouseY - position.y) / scale;

            const newX = mouseX - worldX * newScale + (centerX - lastTouchPos.x);
            const newY = mouseY - worldY * newScale + (centerY - lastTouchPos.y);

            setScale(newScale);
            setPosition({ x: newX, y: newY });
            setLastTouchDist(dist);
            setLastTouchPos({ x: centerX, y: centerY });
        }
    };

    const handleTouchEnd = () => {
        setLastTouchPos(null);
        setLastTouchDist(null);
    };

    return (
        <div
            ref={containerRef}
            className={`w-full h-screen overflow-hidden bg-[#101622] relative select-none touch-none ${isDragging ? 'cursor-grabbing' : (isSpacePressed ? 'cursor-grab' : 'cursor-default')
                }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            {/* Dot Grid Layer - True Infinite via Background Position */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.07] will-change-[background-position,background-size]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
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
            </div>

            {/* Export specific props if needed via context or ref in future */}
        </div>
    );
};
