import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProjectDetail: React.FC = () => {
    const { id } = useParams();
    console.log("Viewing project:", id);

    // In a real app, fetch project by ID. Using static data for demo.

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30 overflow-hidden h-screen w-full relative">
            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-background-dark/80 to-transparent backdrop-blur-sm">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        </Link>
                        <h2 className="text-sm font-bold tracking-widest uppercase">Eren Suki Beleyarman</h2>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-xs font-bold tracking-widest uppercase text-primary">Canvas</Link>
                        <a href="#" className="text-xs font-bold tracking-widest uppercase text-[#9da6b9] hover:text-white transition-colors">Projects</a>
                        <a href="#" className="text-xs font-bold tracking-widest uppercase text-[#9da6b9] hover:text-white transition-colors">Archive</a>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                        <span className="material-symbols-outlined text-sm text-[#9da6b9]">search</span>
                        <input type="text" placeholder="Search archive..." className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-[#9da6b9] w-24 md:w-48 text-white" />
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                        <span className="material-symbols-outlined text-xl text-white">grid_view</span>
                    </button>
                </div>
            </header>

            {/* Main Canvas Viewport */}
            <main
                className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(16, 22, 34, 0.6), rgba(16, 22, 34, 0.9)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCt7ZeE9QrDPFibS9UkQo8OPZ5QKNlCQ4dnjIFIbkGkb5YiThOU69bRzkxTxHHpwor2mq7Ap7SnCEhCvZwiH1qK3FoOcaXkpwUWzM_tFIFIrV5nVr2hCdat8vaebQ1x_wr3XgthkU9wresWaOntgk8mOxA7AbCEBH3tRrD-BnQvxz8BExs-qs6fzW2VLDMZWJ3_mA8m4qEMD_nZL2tplvbdNAT_EewGgxF-xKCrSQnpNqHWb1k1SnyQcB2eM-Lt_MW2uG95rrqhLUO_)`
                }}
            >
                {/* Center Metadata Overlay (The Spread) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 max-w-5xl w-full px-4 md:px-12 flex flex-col items-start gap-8"
                >
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-3 text-[#9da6b9] text-xs font-bold tracking-widest uppercase">
                        <Link to="/" className="hover:text-white transition-colors">Endless Canvas</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-white">Project Detail</span>
                    </div>

                    {/* Page Heading */}
                    <div className="flex flex-col gap-6">
                        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-tighter italic text-white leading-none">Metamorphosis</h1>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Timeline</span>
                                <p className="text-lg text-white font-medium">Spring 2023</p>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Client</span>
                                <p className="text-lg text-white font-medium">Museum of Modern Art</p>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Typography</span>
                                <p className="text-lg text-white font-medium italic font-serif">Neue Haas Grotesk</p>
                            </div>
                        </div>
                    </div>

                    {/* Visual Asset Teaser */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
                        <div className="lg:col-span-7 aspect-[16/9] rounded-xl overflow-hidden group relative border border-white/10">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaX_Sa05RrifGW1Jg_Om8VoCxAl9LcdyJlfHmoY1GEQylK9c-60nVlAjVLlqdGdmRl8OMyiEXg_NIj1GhWS3c5V5OEhqErOIYNTQkU6yr8PBwbDZmNIoQJ_rhOskUZl3MQv06uZGf0xIq7Kma-mQvn3KPDX8He0hvZ_DQFWjz_vahN1ypG5OAp7lifQ-_32OIvmT6Z1hllTBfWyxzRvE6igTqxQIol39scLUmDiR548QnwcEHmhrb2Hb6sMxdvpYdwp9zyHVVne9nH')" }}
                            ></div>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-white text-sm">zoom_in</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold">Zoom for details</span>
                            </div>
                        </div>

                        <div className="lg:col-span-5 flex flex-col justify-between py-2">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">edit_note</span>
                                    <p className="text-xs uppercase tracking-[0.2em] font-bold">Process Notes</p>
                                </div>
                                <p className="text-[#9da6b9] text-base leading-relaxed max-w-sm">
                                    The visual language explores the tension between organic growth and digital decay. Using custom shaders in After Effects to simulate microscopic biological shifts.
                                </p>
                            </div>

                            {/* Color Palette Strip */}
                            <div className="space-y-4 mt-8 lg:mt-0">
                                <p className="text-[10px] uppercase tracking-widest text-[#9da6b9] font-bold">Project Palette</p>
                                <div className="flex gap-2">
                                    <div className="w-12 h-12 rounded bg-[#101622] border border-white/10" title="#101622"></div>
                                    <div className="w-12 h-12 rounded bg-[#135bec] shadow-lg shadow-primary/20" title="#135bec"></div>
                                    <div className="w-12 h-12 rounded bg-[#e2e8f0]" title="#e2e8f0"></div>
                                    <div className="w-12 h-12 rounded bg-[#4a5568]" title="#4a5568"></div>
                                    <div className="w-12 h-12 rounded bg-[#cbd5e0]" title="#cbd5e0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating UI Elements */}
                <div className="absolute top-1/4 right-20 z-20 opacity-40 pointer-events-none hidden xl:block">
                    <div className="p-4 border-l border-white/20">
                        <p className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">Technical Info</p>
                        <p className="text-xs font-medium text-white/60">Renderer: Octane v2023.1</p>
                        <p className="text-xs font-medium text-white/60">Bit-Depth: 32-bit Float</p>
                    </div>
                </div>

                {/* Sidebar Overlay (Deep Zoom Controls) */}
                <aside className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                    <div className="bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10 flex flex-col gap-4">
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-[#9da6b9] hover:text-white transition-colors">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                        <div className="h-px w-6 mx-auto bg-white/10"></div>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">
                            <span className="material-symbols-outlined">center_focus_strong</span>
                        </button>
                        <div className="h-px w-6 mx-auto bg-white/10"></div>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 text-[#9da6b9] hover:text-white transition-colors">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                    </div>
                    <button className="bg-black/40 backdrop-blur-md w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white shadow-xl">
                        <span className="material-symbols-outlined">info</span>
                    </button>
                </aside>
            </main>

            {/* Project Footer Status */}
            <footer className="fixed bottom-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-6 pointer-events-auto">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold tracking-widest text-[#9da6b9] uppercase">Current Level</p>
                        <p className="text-sm font-medium">Project Spread 1:1</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#9da6b9]">Archive Synced</span>
                    </div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 hidden md:block">
                        © 2024 ESB Archive
                    </div>
                </div>
            </footer>
        </div>
    );
};
