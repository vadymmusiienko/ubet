import FeedToggle from "./components/feed/feed-toggle";
import Feed from "./components/feed/feed-main";
import PeopleYouMayKnow from "./components/right-sidebar/people-you-may-know";
import YourFriends from "./components/right-sidebar/your-friends";
import ProfileCard from "./components/left-sidebar/profile-card";

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
        <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 ">
            {/* Feed Toggle Positioned at the Top */}
            <div className="w-full max-w-6xl mb-6">
                <FeedToggle currentFeedType={feedType} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-5">
                {/* Left Sidebar - Profile Card (Hidden on small screens, visible as top section) */}
                <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:self-start order-1 lg:order-1 mb-5 lg:mb-0">
                    <ProfileCard />
                </div>

                {/* Main Feed */}
                <div className="w-full lg:w-2/4 order-3 lg:order-2">
                    <Feed page={page} feedType={feedType} />
                </div>

                {/* Right Sidebar - friends/suggestions */}
                <div className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:self-start space-y-5 order-2 lg:order-3 mb-5 lg:mb-0">
                    <PeopleYouMayKnow />
                    <YourFriends />
                </div>
            </div>
        </div>
    );
}
