// TODO:  Make this component dynamic by passing in props and using them to display the goal details
// TODO: Use GoalCard component to display the goal details
// TODO: Make more like feedGoalCard.tsx
// ?DELETE and use feedGoalCard.tsx instead
export default function MyGoals() {
    return (
        <div className="w-full space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Angie Zhou&apos;s Goal</h2>
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
                <h2 className="text-lg font-bold">
                    Anson Bouchard&apos;s Goal
                </h2>
                <p className="text-sm text-gray-500">
                    Jan 5th, 2025 - Feb 5th, 2025
                </p>
                <p className="mt-2">Work out everyday for a month</p>
                <button className="text-blue-500 text-sm mt-2">
                    See more details →
                </button>
            </div>
        </div>
    );
}
