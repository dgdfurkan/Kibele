import React from 'react';
import { CanvasBackground } from './CanvasBackground';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display selection:bg-primary/30">
            <CanvasBackground />
            <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
                {children}
            </div>
        </div>
    );
};
