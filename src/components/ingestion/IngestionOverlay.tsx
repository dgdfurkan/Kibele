import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { addProject } from '../../services/projects';
import type { PDFMetadata } from '../../services/pdfService';
import { extractPDFData } from '../../services/pdfService';
import { uploadToCloudinary } from '../../services/cloudinaryService';

interface IngestionOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const IngestionOverlay: React.FC<IngestionOverlayProps> = ({ isOpen, onClose, onSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [extractionComplete, setExtractionComplete] = useState(false);
    const [extractedData, setExtractedData] = useState<PDFMetadata | null>(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null);
    const [filteredFonts, setFilteredFonts] = useState<string[]>([]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (file && !extractionComplete && !isProcessing) {
            setIsProcessing(true);
            extractPDFData(file).then(data => {
                setExtractedData(data);
                setSelectedThumbnail(data.thumbnails[0] || null);
                setFilteredFonts(data.fonts);
                setIsProcessing(false);
                setExtractionComplete(true);
            }).catch(err => {
                console.error("PDF Processing Error:", err);
                setIsProcessing(false);
            });
        }
    }, [file, extractionComplete, isProcessing]);

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

    const handleClear = () => {
        setFile(null);
        setExtractionComplete(false);
        setExtractedData(null);
        setSelectedThumbnail(null);
        setFilteredFonts([]);
        setIsProcessing(false);
    };

    const removeFont = (fontToRemove: string) => {
        setFilteredFonts(prev => prev.filter(f => f !== fontToRemove));
    };

    const handleSave = async () => {
        if (!extractedData || isSaving) return;
        setIsSaving(true);

        try {
            let finalImageUrl = selectedThumbnail || '';
            let finalPdfUrl = '';

            // 1. Upload Thumbnail to Cloudinary if it's base64
            if (selectedThumbnail && selectedThumbnail.startsWith('data:')) {
                finalImageUrl = await uploadToCloudinary(selectedThumbnail, 'image');
            }

            // 2. Upload PDF to Cloudinary (if file is < 20MB)
            if (file && file.size < 20 * 1024 * 1024) {
                finalPdfUrl = await uploadToCloudinary(file, 'raw');
            }

            // 3. Save to Firestore
            await addProject({
                title: extractedData.title,
                font: filteredFonts[0] || 'Helvetica',
                fonts: filteredFonts,
                color: '#135bec',
                date: new Date().getFullYear().toString(),
                aspectRatio: 'aspect-video',
                image: finalImageUrl,
                pdfUrl: finalPdfUrl
            });

            setIsSaving(false);
            onSuccess();
        } catch (error) {
            console.error("Failed to save project", error);
            setIsSaving(false);
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
                        {/* Left: Drop Zone / File Status */}
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
                                            <p className="text-white/40 text-sm max-w-[320px] text-center">Files will be automatically processed for gallery and font extraction</p>
                                        </div>
                                        <div className="mt-6 flex items-center justify-center rounded-lg h-10 px-6 bg-warm-gray text-white text-sm font-bold border border-white/10 hover:border-white/20 transition-all">
                                            Browse Files
                                        </div>
                                    </label>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-white/20 bg-white/5 px-6 py-20 relative">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                                        </div>
                                        <p className="text-white text-xl font-bold">File Uploaded</p>
                                        <button onClick={handleClear} className="text-primary text-sm font-bold hover:underline">Replace File</button>
                                    </div>

                                    {/* Visual Palette */}
                                    {extractionComplete && extractedData && (
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-white text-xs font-bold tracking-widest uppercase opacity-40 ml-1">Visual Palette</h3>
                                                {extractedData.thumbnails.length === 0 && (
                                                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">No Images Found</span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {extractedData.thumbnails.map((thumb, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => setSelectedThumbnail(thumb)}
                                                        className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${selectedThumbnail === thumb ? 'border-primary shadow-[0_0_15px_rgba(19,91,236,0.3)]' : 'border-white/10 hover:border-white/30'}`}
                                                    >
                                                        <img
                                                            src={thumb}
                                                            alt={`Page ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400';
                                                            }}
                                                        />
                                                        {selectedThumbnail === thumb && (
                                                            <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                                <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right: Processing / Mock Results / Manual Entry */}
                        <div className="lg:col-span-5 flex flex-col gap-4 self-start lg:mt-20">
                            {!file ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-warm-gray/40 border border-white/10 rounded-xl p-8"
                                >
                                    <h3 className="text-white text-sm font-bold tracking-wider uppercase opacity-60 mb-6">Manual Entry</h3>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs text-white/40 font-medium ml-1">Project Title</label>
                                            <input
                                                type="text"
                                                placeholder="Enter project name..."
                                                className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                                id="manual-title"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs text-white/40 font-medium ml-1">Font</label>
                                            <select className="w-full h-12 bg-black/20 border border-white/10 rounded-lg px-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none" id="manual-font">
                                                <option value="Helvetica">Helvetica</option>
                                                <option value="Futura">Futura</option>
                                                <option value="Garamond">Garamond</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-6 border-t border-white/10">
                                        <button
                                            onClick={async () => {
                                                const titleInput = document.getElementById('manual-title') as HTMLInputElement;
                                                const fontInput = document.getElementById('manual-font') as HTMLSelectElement;

                                                if (!titleInput.value) return;

                                                try {
                                                    await addProject({
                                                        title: titleInput.value,
                                                        font: fontInput.value || 'Helvetica',
                                                        color: '#135bec',
                                                        date: new Date().getFullYear().toString(),
                                                        aspectRatio: 'aspect-video',
                                                        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
                                                    });
                                                    onSuccess();
                                                } catch (error) {
                                                    console.error("Failed to add project", error);
                                                }
                                            }}
                                            className="w-full flex items-center justify-center gap-2 rounded-lg h-14 bg-white/5 text-white text-sm font-bold tracking-wide hover:bg-white/10 transition-all border border-white/10"
                                        >
                                            <span>Create Project</span>
                                            <span className="material-symbols-outlined text-sm">add</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-warm-gray/40 border border-white/10 rounded-xl p-8 relative overflow-hidden h-full"
                                >
                                    {(isProcessing || isSaving) && (
                                        <div className="absolute top-0 left-0 h-1 bg-primary w-full shadow-[0_0_15px_rgba(19,91,236,0.6)] animate-[shimmer_2s_infinite]"></div>
                                    )}
                                    {extractionComplete && !isSaving && (
                                        <div className="absolute top-0 left-0 h-1 bg-green-500 w-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                                    )}

                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-white text-sm font-bold tracking-wider uppercase opacity-60">Auto-Extraction</h3>
                                        {isProcessing || isSaving ? (
                                            <span className="flex items-center gap-2 text-[10px] text-primary font-bold tracking-widest">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                                {isSaving ? 'UPLOADING TO CLOUDINARY' : 'PROCESSING PDF'}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold tracking-widest">
                                                <span className="material-symbols-outlined text-sm">verified</span>
                                                READY
                                            </span>
                                        )}
                                    </div>

                                    {/* File Info */}
                                    <div className="flex items-center gap-4 p-5 mb-8 bg-black/20 rounded-xl border border-white/5">
                                        <div className="w-14 h-18 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                                            <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-base font-bold text-white truncate">{file.name}</p>
                                            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">
                                                {extractedData ? `${extractedData.pageCount} Pages • ARCHIVE READY` : 'Analyzing Architecture...'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Extracted Data */}
                                    {extractionComplete && extractedData && (
                                        <motion.div
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="space-y-8"
                                        >
                                            <div>
                                                <h4 className="text-xs text-white/40 font-bold tracking-widest uppercase mb-4 ml-1">Font Detection (Filterable)</h4>
                                                <div className="flex gap-2 flex-wrap">
                                                    {filteredFonts.map((font, idx) => (
                                                        <div key={idx} className="flex h-10 items-center gap-x-3 rounded-xl bg-white/5 pl-3 pr-2 border border-white/10 group hover:border-primary/50 transition-colors">
                                                            <span className="material-symbols-outlined text-primary text-[20px]">text_format</span>
                                                            <p className="text-white text-sm font-bold">{font}</p>
                                                            <button
                                                                onClick={() => removeFont(font)}
                                                                className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-colors border border-white/5"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">close</span>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    {filteredFonts.length === 0 && (
                                                        <p className="text-white/30 text-xs italic ml-1">No fonts selected. Fallback to Helvetica.</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-12 pt-8 border-t border-white/10">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={isSaving}
                                                    className={`w-full flex items-center justify-center gap-3 rounded-xl h-14 text-white text-sm font-bold tracking-widest uppercase transition-all shadow-xl ${isSaving ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-primary/20'}`}
                                                >
                                                    <span>Place on Canvas</span>
                                                    <span className="material-symbols-outlined text-lg">{isSaving ? 'sync' : 'arrow_outward'}</span>
                                                </button>
                                                <p className="text-[10px] text-white/20 text-center mt-4 tracking-widest uppercase">Cloudinary Powered Storage System</p>
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
