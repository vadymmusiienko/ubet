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
        <div className="bg-githubDark border border-gray-700 rounded-md p-4 hover:border-gray-600 transition-colors duration-200">
            <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-100">{title}</h3>

                <div className="text-sm text-gray-400">
                    {startDate} - {endDate}
                </div>

                <p className="text-gray-300">{description}</p>

                <button
                    onClick={openModal}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center mt-2"
                >
                    See more details →
                </button>
            </div>

            {modalOpen && (
                <GoalDetailModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    title={title}
                    startDate={startDate}
                    endDate={endDate}
                    description={description}
                />
            )}
        </div>
    );
}
