import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addProject } from '../../services/projects';

interface IngestionOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const IngestionOverlay: React.FC<IngestionOverlayProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [extractionComplete, setExtractionComplete] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (file && !extractionComplete) {
            setIsProcessing(true);
            // Simulate AI Processing
            const timer = setTimeout(() => {
                setIsProcessing(false);
                setExtractionComplete(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [file, extractionComplete]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101622]/80 backdrop-blur-xl"
                >
                    {/* Header */}
                    <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-4 border-b border-white/10">
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm">archive</span>
                            </div>
                            <h2 className="text-white text-lg font-bold leading-tight">Eren Suki Beleyarman Archive</h2>
                        </div>
                        <button onClick={onClose} className="text-white/60 hover:text-white flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                            ESC to cancel
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </header>

                    <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8">
                        {/* Left: Drop Zone */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <div className="flex flex-col">
                                <h1 className="text-white text-3xl font-bold leading-tight pb-2">New Ingestion</h1>
                                <p className="text-white/40 text-sm mb-6">Drag and drop assets directly into the creative workspace.</p>
                            </div>

                            {!file ? (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed ${isDragging ? 'border-primary bg-primary/10' : 'border-white/20 bg-white/5'} hover:bg-white/10 transition-all cursor-pointer px-6 py-24 group`}
                                >
                                    <input type="file" accept=".pdf" className="hidden" id="file-upload" onChange={handleFileSelect} />
                                    <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full">
                                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">upload_file</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 mt-6">
                                            <p className="text-white text-xl font-bold">Drop PDF to Archive</p>
                                            <p className="text-white/40 text-sm max-w-[320px] text-center">Files will be automatically processed for metadata extraction</p>
                                        </div>
                                        <div className="mt-6 flex items-center justify-center rounded-lg h-10 px-6 bg-warm-gray text-white text-sm font-bold border border-white/10 hover:border-white/20 transition-all">
                                            Browse Files
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-white/20 bg-white/5 px-6 py-24">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                                    </div>
                                    <p className="text-white text-xl font-bold">File Uploaded</p>
                                    <button onClick={() => { setFile(null); setExtractionComplete(false); }} className="text-primary text-sm font-bold hover:underline">Replace File</button>
                                </div>
                            )}
                        </div>

                        {/* Right: Processing / Mock Results */}
                        <div className="lg:col-span-5 flex flex-col gap-4 self-start lg:mt-20">
                            {file && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-warm-gray/40 border border-white/10 rounded-xl p-6 relative overflow-hidden"
                                >
                                    {isProcessing && (
                                        <div className="absolute top-0 left-0 h-1 bg-primary w-2/3 shadow-[0_0_15px_rgba(19,91,236,0.6)] animate-pulse"></div>
                                    )}
                                    {extractionComplete && (
                                        <div className="absolute top-0 left-0 h-1 bg-green-500 w-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                                    )}

                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-white text-sm font-bold tracking-wider uppercase opacity-60">Auto-Extraction</h3>
                                        {isProcessing ? (
                                            <span className="flex items-center gap-1.5 text-[10px] text-primary font-bold">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                                                PROCESSING
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                                                COMPLETE
                                            </span>
                                        )}
                                    </div>

                                    {/* File Mockup */}
                                    <div className="flex items-center gap-4 p-4 mb-8 bg-black/20 rounded-lg border border-white/5">
                                        <div className="w-12 h-16 bg-white/10 rounded flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white/40">picture_as_pdf</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white truncate max-w-[180px]">{file.name}</p>
                                            <p className="text-xs text-white/30">Mocked Size • Processing...</p>
                                        </div>
                                    </div>

                                    {/* Extracted Data */}
                                    {extractionComplete && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <h4 className="text-xs text-white/40 mb-3 ml-1">Extracted Metadata</h4>
                                                <div className="flex gap-2.5 flex-wrap">
                                                    <div className="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5">
                                                        <span className="material-symbols-outlined text-primary text-[18px]">text_format</span>
                                                        <p className="text-white text-sm font-medium">Font: Helvetica</p>
                                                    </div>
                                                    <div className="flex h-9 items-center gap-x-2 rounded-lg bg-warm-gray pl-2 pr-4 border border-white/5">
                                                        <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
                                                        <p className="text-white text-sm font-medium">Year: 2024</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 pt-6 border-t border-white/10">
                                                <button
                                                    onClick={async () => {
                                                        if (!file) return;
                                                        try {
                                                            await addProject({
                                                                title: file.name.replace(/\.[^/.]+$/, ""),
                                                                font: 'Helvetica',
                                                                color: '#135bec', // Primary blue
                                                                date: 'Nov 2024',
                                                                aspectRatio: 'aspect-video',
                                                                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUNvqs_sebdU66YhjWqqYMlTOKw-zJbnuGmRWEtW8RjJfGp57G-18DJdT7pelfThl718I5_I-inTZxHxU1YKpiSpzHBBfDrdwz4TjlhFlVDd_UPAA8qA4KHc9IYxDl1ylgQH8sztNmkl580kXICtSx268GerZX7cDXnjNHOPplaRaWj0EbO1NU5bcl5LVBP97nUDkP_VI1G2Zngj_YjPQn9-oqmF5D5kVWLefsEFOUKQkn5D3iLuBNA7e5S8CXtxq2yalfEkmNE58'
                                                            });
                                                            onSuccess();
                                                        } catch (error) {
                                                            console.error("Failed to add project", error);
                                                        }
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                                >
                                                    <span>Place on Canvas</span>
                                                    <span className="material-symbols-outlined text-sm">arrow_outward</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
