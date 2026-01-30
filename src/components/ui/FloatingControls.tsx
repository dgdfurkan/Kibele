import React from 'react';

interface FloatingControlsProps {
    onAddClick: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ onAddClick }) => {
    return (
        <>
            {/* Bottom Right Floating Action Button (FAB) */}
            <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-50 flex flex-col items-center gap-4">
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
            <div className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-50 hidden md:block">
                <div className="w-48 h-32 bg-white/80 dark:bg-[#1c1f21]/80 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-1.5 relative overflow-hidden group hover:bg-white dark:hover:bg-[#1c1f21] transition-colors">
                    <div className="w-full h-full bg-background-light dark:bg-background-dark rounded-lg relative overflow-hidden opacity-80">
                        {/* Abstract squares representing content */}
                        <div className="absolute top-[10%] left-[10%] w-[15%] h-[20%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
                        <div className="absolute top-[15%] left-[30%] w-[25%] h-[15%] bg-primary/30 rounded-[2px]"></div>
                        <div className="absolute top-[40%] left-[15%] w-[20%] h-[20%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
                        <div className="absolute top-[35%] left-[50%] w-[15%] h-[25%] bg-gray-300 dark:bg-gray-600 rounded-[2px]"></div>
                        {/* Active Viewport Indicator */}
                        <div className="absolute top-[5%] left-[5%] w-[60%] h-[50%] border-[1.5px] border-primary rounded bg-primary/5 cursor-grab active:cursor-grabbing shadow-sm backdrop-blur-[1px]"></div>
                    </div>
                    <span className="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 tracking-widest pointer-events-none">NAVIGATOR</span>
                </div>
            </div>

            {/* Current Zoom Level Indicator (Centered Bottom) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#131516]/80 dark:bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide pointer-events-none opacity-0 md:opacity-100 shadow-lg">
                100%
            </div>
        </>
    );
};
