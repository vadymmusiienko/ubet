// Loading component for suspense boundary
export default function LoadingFeed() {
    return (
        <div className="w-full space-y-4">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-githubDark p-6 rounded-lg shadow-md animate-pulse h-32"
                />
            ))}
        </div>
    );
}
