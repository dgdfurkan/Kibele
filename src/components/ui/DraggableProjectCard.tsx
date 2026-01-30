import React, { useState, useRef, useEffect } from 'react';
import type { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { updateProjectPosition } from '../../services/projects';

interface DraggableProjectCardProps {
    project: Project;
    scale: number;
    initialPosition?: { x: number; y: number };
}

export const DraggableProjectCard: React.FC<DraggableProjectCardProps> = ({
    project,
    scale,
    initialPosition
}) => {
    // Local state for immediate feedback
    const [position, setPosition] = useState(initialPosition || { x: Math.random() * 500, y: Math.random() * 500 });
    const [isDragging, setIsDragging] = useState(false);

    // Check if initialPosition prop updates (re-sync from DB)
    useEffect(() => {
        if (initialPosition) {
            setPosition(prev => {
                // Only update if difference is significant to avoid jitter during own drag
                if (Math.abs(prev.x - initialPosition.x) > 1 || Math.abs(prev.y - initialPosition.y) > 1) {
                    if (!isDragging) return initialPosition;
                }
                return prev;
            });
        }
    }, [initialPosition, isDragging]);

    const dragStartRef = useRef<{ x: number; y: number } | null>(null);
    const startPosRef = useRef<{ x: number; y: number } | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent canvas pan
        e.preventDefault(); // Prevent text selection

        setIsDragging(true);
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        startPosRef.current = { ...position };

        const handleMouseMove = (mmE: MouseEvent) => {
            if (!dragStartRef.current || !startPosRef.current) return;

            // Calculate delta taking scale into account
            const dx = (mmE.clientX - dragStartRef.current.x) / scale;
            const dy = (mmE.clientY - dragStartRef.current.y) / scale;

            setPosition({
                x: startPosRef.current.x + dx,
                y: startPosRef.current.y + dy
            });
        };

        const handleMouseUp = (muE: MouseEvent) => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            // Save final position to Firebase
            if (dragStartRef.current && startPosRef.current) {
                const dx = (muE.clientX - dragStartRef.current.x) / scale;
                const dy = (muE.clientY - dragStartRef.current.y) / scale;
                const finalX = startPosRef.current.x + dx;
                const finalY = startPosRef.current.y + dy;

                // Debounce or just save? For single move, just save.
                updateProjectPosition(project.id, { x: finalX, y: finalY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`absolute select-none will-change-transform ${isDragging ? 'z-50 cursor-grabbing scale-105 shadow-2xl' : 'z-10 cursor-grab hover:z-20'}`}
            style={{
                top: 0,
                left: 0,
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s',
            }}
            onMouseDown={handleMouseDown}
        >
            <ProjectCard project={project} />
        </div>
    );
};
