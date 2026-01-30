import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { ProjectCard } from '../components/ui/ProjectCard';
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
                <div className="flex items-center justify-center min-h-[100vh] min-w-[100vw] p-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pointer-events-auto">
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
            </InfiniteCanvas>
        </Layout>
    );
};
