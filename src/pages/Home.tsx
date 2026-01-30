import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ProjectCard } from '../components/ui/ProjectCard';
import { FloatingHeader } from '../components/ui/FloatingHeader';
import { FloatingControls } from '../components/ui/FloatingControls';
import { IngestionOverlay } from '../components/ingestion/IngestionOverlay';
import { getProjects } from '../services/projects';
import type { Project } from '../types';

export const Home: React.FC = () => {
    const [isIngestionOpen, setIsIngestionOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Canvas State
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectAdded = () => {
        setLoading(true);
        getProjects().then(data => {
            setProjects(data);
            setLoading(false);
        });
        setIsIngestionOpen(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
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

    const handleWheel = (e: React.WheelEvent) => {
        // Zoom on wheel (optional: check for metaKey/ctrlKey if user refers to trackpad pinch usually mapped to Ctrl+Wheel)
        // For "Infinite Canvas" usually wheel is pan or zoom. Let's make it zoom.
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const zoomSensitivity = 0.001;
            const newScale = Math.min(Math.max(0.1, scale - e.deltaY * zoomSensitivity), 5);
            setScale(newScale);
        } else {
            // Pan on wheel if no key pressed (natural scroll) or ignore if we want only drag
            // User requested "Drag/Pan" mostly.
            setPosition(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.font.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <FloatingHeader onSearch={setSearchQuery} />
            <FloatingControls onAddClick={() => setIsIngestionOpen(true)} scale={scale} setScale={setScale} />

            <IngestionOverlay
                isOpen={isIngestionOpen}
                onClose={() => setIsIngestionOpen(false)}
                onSuccess={handleProjectAdded}
            />

            {/* Infinite Canvas Container */}
            <div
                className="w-full h-screen overflow-hidden bg-transparent cursor-grab active:cursor-grabbing relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                {/* Transform Layer */}
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '50% 50%',
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                    className="w-full h-full absolute inset-0 flex items-center justify-center p-20"
                >
                    {/* Grid Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-w-[80vw] pointer-events-none">
                        {loading ? (
                            <div className="col-span-full text-center text-gray-400">Loading...</div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400/50 text-xl font-light">Canvas Empty</div>
                        ) : filteredProjects.map((project) => (
                            <div key={project.id} className="pointer-events-auto transform transition-transform hover:scale-105">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
