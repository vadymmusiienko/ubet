export default function FeedToggle({ feedType, setFeedType }) {
  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      {/* Feed Toggle Buttons */}
      <div className="flex justify-center bg-gray-100 p-1 rounded-lg">
        <button
          className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
            feedType === "engagements"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-transparent text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setFeedType("engagements")}
        >
          My Engagements
        </button>
        <button
          className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
            feedType === "feed"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-transparent text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setFeedType("feed")}
        >
          My Feed
        </button>
      </div>
    </div>
  );
}
