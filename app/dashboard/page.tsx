import { FaUserCircle } from "react-icons/fa";
import FeedToggle from "./components/feed/feed-toggle";
import Feed from "./components/feed/feed-main";
import PeopleYouMayKnow from "./components/right-sidebar/people-you-may-know";
import YourFriends from "./components/right-sidebar/your-friends";

interface DashboardProps {
    searchParams: Promise<{
        page?: string;
        feedType?: string;
    }>;
}

export default async function Dashboard({ searchParams }: DashboardProps) {
    // Await the searchParams promise before accessing its properties
    const resolvedSearchParams = await searchParams;

    const page = Number(resolvedSearchParams?.page) || 1;
    // Default feedType to "feed" if not specified
    const feedType = resolvedSearchParams?.feedType || "feed";

    return (
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6">
            {/* Feed Toggle Positioned at the Top */}
            <div className="w-full max-w-5xl mb-4">
                <FeedToggle currentFeedType={feedType} />
            </div>
            {/* Main Content */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl mt-6 gap-4">
                {/* Left Sidebar - Profile Card */}
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md max-h-56">
                    <div className="flex flex-col items-center">
                        <FaUserCircle size={50} />
                        <h2 className="text-lg font-semibold">
                            William Haspel
                        </h2>
                        <p className="text-sm text-gray-600">
                            Just trying my best out here
                        </p>
                        <p className="text-sm font-bold">Total winnings: -$2</p>
                        <p className="text-sm">32 friends</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                            Visit profile
                        </button>
                    </div>
                </div>
                <Feed page={page} feedType={feedType} />
                {/* Right Sidebar - friends/suggestions*/}
                <div className="w-full md:w-1/4 space-y-4">
                    <PeopleYouMayKnow />
                    <YourFriends />
                </div>
            </div>
        </div>
    );
}
