import React, { useRef } from 'react';

interface FloatingControlsProps {
    onAddClick: () => void;
    scale?: number;
    position?: { x: number; y: number };
    onNavigate?: (pos: { x: number; y: number }) => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ onAddClick, scale = 1, position = { x: 0, y: 0 }, onNavigate }) => {
    const navRef = useRef<HTMLDivElement>(null);

    const handleNavClick = (e: React.MouseEvent) => {
        if (!onNavigate || !position || !navRef.current) return;

        const rect = navRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const dx = clickX - centerX;
        const dy = clickY - centerY;

        // Map is 0.05x scale of world
        // Inverse scale = 20
        const worldDx = dx * 20;
        const worldDy = dy * 20;

        // Subtract because moving map "view" right means shifting content left
        onNavigate({
            x: position.x - worldDx,
            y: position.y - worldDy
        });
    };

    return (
        <>
            {/* Bottom Right Floating Action Button (FAB) */}
            <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-50 flex flex-col items-center gap-4 select-none">
                <button
                    onClick={onAddClick}
                    className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-white shadow-[0_8px_30px_rgb(60,107,124,0.4)] hover:shadow-[0_15px_35px_rgb(60,107,124,0.5)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                    <span className="material-symbols-outlined text-3xl md:text-4xl transition-transform duration-300 group-hover:rotate-90">add</span>
                    {/* Tooltip */}
                    <span className="absolute right-full mr-5 bg-[#131516] text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-lg">
                        Add Project
                    </span>
                </button>
            </div>

            {/* Bottom Left Mini-Map / Navigator */}
            <div className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-50 hidden md:block select-none">
                <div
                    ref={navRef}
                    onClick={handleNavClick}
                    className="w-48 h-32 bg-white/80 dark:bg-[#1c1f21]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 relative overflow-hidden group hover:bg-white dark:hover:bg-[#1c1f21] transition-colors cursor-crosshair active:cursor-grabbing"
                >
                    <div className="w-full h-full bg-background-light dark:bg-background-dark rounded-lg relative overflow-hidden opacity-80 pointer-events-none">
                        {/* Center content representation */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/20 rounded-full blur-xl"></div>

                        {/* Dynamic Viewport Indicator */}
                        <div
                            className="absolute bg-primary/10 border border-primary/50 shadow-sm rounded-sm backdrop-blur-[1px] transition-all duration-100"
                            style={{
                                top: '50%',
                                left: '50%',
                                width: `${Math.max(20, 100 / scale)}%`,
                                height: `${Math.max(20, 60 / scale)}%`,
                                transform: `translate(-50%, -50%) translate(${-position.x * 0.05}px, ${-position.y * 0.05}px)`
                            }}
                        ></div>
                    </div>
                    <span className="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 tracking-widest pointer-events-none select-none">NAVIGATOR</span>
                </div>
            </div>

            {/* Current Zoom Level Indicator (Centered Bottom) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#131516]/80 dark:bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide pointer-events-none opacity-0 md:opacity-100 shadow-lg transition-opacity select-none">
                {Math.round(scale * 100)}%
            </div>
        </>
    );
};
