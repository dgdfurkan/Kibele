import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
// ProjectCard is used inside DraggableProjectCard, so we don't need it here directly anymore
// import { ProjectCard } from '../components/ui/ProjectCard'; 
import { DraggableProjectCard } from '../components/ui/DraggableProjectCard';
import { FloatingHeader } from '../components/ui/FloatingHeader';
import { FloatingControls } from '../components/ui/FloatingControls';
import { IngestionOverlay } from '../components/ingestion/IngestionOverlay';
import { InfiniteCanvas } from '../components/canvas/InfiniteCanvas';
import { getProjects } from '../services/projects';
import type { Project } from '../types';

export const Home: React.FC = () => {
    const [isIngestionOpen, setIsIngestionOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // UI State for Navigator (Read-only representation of Canvas State)
    const [canvasState, setCanvasState] = useState({ scale: 1, position: { x: 0, y: 0 } });

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

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.font.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <FloatingHeader onSearch={setSearchQuery} />
            <FloatingControls
                onAddClick={() => setIsIngestionOpen(true)}
                scale={canvasState.scale}
                position={canvasState.position}
            />

            <IngestionOverlay
                isOpen={isIngestionOpen}
                onClose={() => setIsIngestionOpen(false)}
                onSuccess={handleProjectAdded}
            />

            <InfiniteCanvas onTransformChange={setCanvasState}>
                <InfiniteCanvas onTransformChange={setCanvasState}>
                    <div className="w-full h-full absolute top-0 left-0">
                        {loading ? (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 pointer-events-none">Loading...</div>
                        ) : filteredProjects.length === 0 ? (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-400/50 text-xl font-light pointer-events-none select-none">Canvas Empty</div>
                        ) : filteredProjects.map((project, index) => {
                            // Default positions for initial layout (simple grid-like scatter)
                            const defaultPos = {
                                x: (index % 4) * 400 + 100,
                                y: Math.floor(index / 4) * 450 + 100
                            };

                            return (
                                <DraggableProjectCard
                                    key={project.id}
                                    project={project}
                                    scale={canvasState.scale}
                                    initialPosition={project.position || defaultPos}
                                />
                            );
                        })}
                    </div>
                </InfiniteCanvas>
            </InfiniteCanvas>
        </Layout>
    );
};
