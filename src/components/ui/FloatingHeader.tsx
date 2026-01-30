import React from 'react';

interface FloatingHeaderProps {
    onSearch: (query: string) => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({ onSearch }) => {
    return (
        <div className="fixed top-0 left-0 right-0 p-6 flex justify-center items-start z-50 pointer-events-none">
            <div className="w-full max-w-5xl flex items-center justify-between gap-4 pointer-events-auto">
                {/* Branding / Logo (Left) */}
                <div className="hidden md:flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                    <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Kibele Logo" className="h-8 w-auto" />
                </div>

                {/* Central Floating Search Pill */}
                <div className="flex-1 max-w-lg mx-auto">
                    <div className="group relative">
                        {/* Subtle Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700"></div>
                        {/* Search Container */}
                        <div className="relative flex items-center bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-12 md:h-14 px-2 transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary/30">
                            <div className="pl-3 md:pl-4 text-gray-400 dark:text-gray-500">
                                <span className="material-symbols-outlined text-primary text-2xl">search</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects (e.g., Project Name + font)"
                                className="w-full bg-transparent border-none focus:ring-0 text-[#131516] dark:text-slate-200 placeholder:text-gray-400 text-sm md:text-base font-medium h-full px-3 truncate"
                                autoComplete="off"
                                onChange={(e) => onSearch(e.target.value)}
                            />
                            {/* Command Key Hint */}
                            <div className="hidden sm:flex items-center pr-2 gap-1 text-xs text-gray-400 font-medium">
                                <kbd className="hidden lg:inline-flex items-center justify-center px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] font-bold text-gray-500">⌘K</kbd>
                            </div>
                            {/* Filter Button */}
                            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
                                <span className="material-symbols-outlined text-xl">tune</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile (Right) */}
                <div className="flex items-center justify-end gap-3">
                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 shadow-sm flex items-center justify-center overflow-hidden hover:scale-105 transition-all cursor-pointer group">
                        <img
                            alt="Eren Sukibeleyarman Profile"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6NUKfdiMUTuBDlxMwItAPE_Sf0v_mQCuK8syPb9-SnDqCzDWeyM4h8HIiq67J0QOuC7akiVT4qc_r9W5yTO7mVGl_dyep08ikS_2CuJoURke-mc4QvJ0AuLZOpjbRw8BFMEJBeAGv6TRtxiyB0hA7cgkcU8AQwI-bSItdZm1jnARmG4dpWK88s-44PG1l2aQ-FuHTWtOg7GqiSbJA1WRWIK6hhhkLn-vBpw5INbIDCRbJZCrzksgbUxdh_TDUTtpF3Sf-Ow7oAVA"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
