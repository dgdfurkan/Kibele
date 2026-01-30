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

    // Ref for the canvas container to attach non-passive listener
    const canvasRef = React.useRef<HTMLDivElement>(null);

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

    // Better Wheel Handler specific ref pattern to avoid re-binding:
    const onWheelRef = React.useRef((_e: WheelEvent) => { });
    onWheelRef.current = (e: WheelEvent) => {
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
            const zoomSensitivity = 0.001;
            // We need current scale. simplest way without re-binding is functional update with checks?
            // Or just use the state in dependency.
            // Let's stick to functional update approach for correctness without closure staleness
            setScale(prevScale => {
                const newScale = Math.min(Math.max(0.1, prevScale - e.deltaY * zoomSensitivity), 5);
                return newScale;
            });
        } else {
            setPosition(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const handler = (e: WheelEvent) => onWheelRef.current(e);
        canvas.addEventListener('wheel', handler, { passive: false });
        return () => canvas.removeEventListener('wheel', handler);
    }, []);


    const handleMouseDown = (e: React.MouseEvent) => {
        // Allow interacting with child elements (cards) without dragging canvas immediately
        // if target is not the canvas itself or the overlay
        if ((e.target as HTMLElement).closest('.project-card')) return;

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

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.font.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <FloatingHeader onSearch={setSearchQuery} />
            <FloatingControls
                onAddClick={() => setIsIngestionOpen(true)}
                scale={scale}
                setScale={setScale}
                position={position}
            />

            <IngestionOverlay
                isOpen={isIngestionOpen}
                onClose={() => setIsIngestionOpen(false)}
                onSuccess={handleProjectAdded}
            />

            {/* Infinite Canvas Container */}
            <div
                ref={canvasRef}
                className="w-full h-screen overflow-hidden bg-[#101622] cursor-grab active:cursor-grabbing relative touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Transform Layer */}
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transformOrigin: '50% 50%',
                        willChange: 'transform',
                        transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(0.1, 0.7, 1.0, 0.1)'
                    }}
                    className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-w-[80vw] pointer-events-auto origin-center">
                        {loading ? (
                            <div className="col-span-full text-center text-gray-400">Loading...</div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="col-span-full text-center text-gray-400/50 text-xl font-light">Canvas Empty</div>
                        ) : filteredProjects.map((project) => (
                            <div key={project.id} className="project-card transform transition-transform hover:scale-105 duration-200">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
