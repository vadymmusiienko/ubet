import { GoalCardProps } from "./goal-card";
// TODO: Aneesh add all the relevant props to the GoalCardProps interface and display it
// make it pretties, add a button to bet
// you can access the database here to get the goal details

export default function GoalDetailModal({
    isOpen,
    onClose,
    title,
    startDate,
    endDate,
    description,
}: GoalCardProps & { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    {startDate} - {endDate}
                </p>

                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{description}</p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
