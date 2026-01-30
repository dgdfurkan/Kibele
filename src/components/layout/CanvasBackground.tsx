import React from 'react';

export const CanvasBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-dot-pattern bg-[length:32px_32px] opacity-[0.08] dark:opacity-[0.15]"></div>
        </div>
    );
};
