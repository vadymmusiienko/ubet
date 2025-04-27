import { GoalCardProps } from "./goal-card";
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
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 border border-gray-700">
                <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-100">{title}</h2>
                    <button
                        className="text-gray-400 hover:text-gray-200"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                    {startDate} - {endDate}
                </p>
                <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2 text-gray-200">
                        Description
                    </h3>
                    <p className="text-gray-300">{description}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => {
                            /* Add bet functionality here */
                        }}
                    >
                        Place Bet
                    </button>
                    <button
                        className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    onClick={handleBet}
                    >
                        Bet on Goal
                    </button>
                </div>
            </div>
        </div>
    );
}
