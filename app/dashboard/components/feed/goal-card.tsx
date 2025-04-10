"use client";
import { useState } from "react";
import GoalDetailModal from "./goal-detail-modal";

export interface GoalCardProps {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function GoalCard({
    title,
    startDate,
    endDate,
    description,
}: GoalCardProps) {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="mx-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-500">
                    {startDate} - {endDate}
                </p>
                <p className="mt-2">{description}</p>
                <button
                    className="text-blue-500 text-sm mt-2 hover:underline focus:outline-none"
                    onClick={openModal}
                >
                    See more details →
                </button>
            </div>

            <GoalDetailModal
                isOpen={modalOpen}
                onClose={closeModal}
                title={title}
                startDate={startDate}
                endDate={endDate}
                description={description}
            />
        </div>
    );
}
