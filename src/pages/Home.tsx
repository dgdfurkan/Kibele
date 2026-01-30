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

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
            setLoading(false);
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
            <FloatingControls onAddClick={() => setIsIngestionOpen(true)} />

            <IngestionOverlay
                isOpen={isIngestionOpen}
                onClose={() => setIsIngestionOpen(false)}
                onSuccess={handleProjectAdded}
            />

            {/* Content Container centered but expansive */}
            <div className="max-w-[1800px] mx-auto min-h-[120vh] p-4 md:p-12 lg:p-20 pt-28 md:pt-32">
                {/* Masonry Layout using CSS Columns */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-32">
                    {loading ? (
                        <div className="col-span-full text-center py-20 text-gray-400 font-medium">Loading workspace...</div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-gray-400 font-medium">No projects found.</div>
                    ) : (
                        filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};
