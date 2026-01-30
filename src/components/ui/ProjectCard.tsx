import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }} // Removed scale: 1.01
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="break-inside-avoid mb-6 group relative rounded-xl overflow-hidden shadow-[0_12px_40px_-12px_rgba(60,107,124,0.12)] hover:shadow-[0_20px_50px_-12px_rgba(60,107,124,0.25)] cursor-pointer bg-white dark:bg-[#25282a] border border-transparent dark:border-white/5"
        >
            <div className={`w-full ${project.aspectRatio} bg-gray-100 dark:bg-gray-800 relative overflow-hidden`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Frosted Glass Metadata Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-white/90 dark:bg-[#1c1f21]/90 backdrop-blur-md border-t border-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <h3 className="text-[#131516] dark:text-white text-lg font-bold leading-tight">{project.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{project.font}</span>
                    <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: project.color }}></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium ml-auto">{project.date}</span>
                </div>
            </div>
        </motion.div>
    );
};
