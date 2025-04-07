// Loading component for suspense boundary
export default function LoadingGoals() {
    return (
        <div className="w-full space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-gray-100 p-6 rounded-lg shadow-md animate-pulse h-32"
                />
            ))}
        </div>
    );
}
