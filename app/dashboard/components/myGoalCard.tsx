//TODO: Aneesh - Make this component dynamic by passing in props and using them to display the goal details
export default function MyGoalCard() {
    return (
        <div className="w-1/2 mx-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">My Goal</h2>
                <p className="text-sm text-gray-500">
                    Jan 20th, 2025 - Feb 3rd, 2025
                </p>
                <p className="mt-2">
                    Have a screentime of less than 5 hours a day
                </p>
                <button className="text-blue-500 text-sm mt-2">
                    See more details →
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">John Smith&apos;s Goal</h2>
                <p className="text-sm text-gray-500">
                    Jan 5th, 2025 - Feb 5th, 2025
                </p>
                <p className="mt-2">Work out everyday for a month</p>
            </div>
        </div>
    );
}
