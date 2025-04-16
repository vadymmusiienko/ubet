"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface FeedToggleProps {
    currentFeedType: string;
}

export default function FeedToggle({ currentFeedType }: FeedToggleProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Create a new URLSearchParams instance to preserve other parameters
    const createQueryString = (feedType: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("feedType", feedType);
        return params.toString();
    };

    return (
        <div className="space-y-4 w-full max-w-md mx-auto">
            {/* Feed Toggle Buttons */}
            <div className="flex justify-center bg-githubDark p-1 rounded-lg">
                <Link
                    href={`${pathname}?${createQueryString("engagements")}`}
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        currentFeedType === "engagements"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-transparent text-gray-600 hover:bg-gray-400"
                    }`}
                >
                    My Engagements
                </Link>
                <Link
                    href={`${pathname}?${createQueryString("feed")}`}
                    className={`px-4 py-1.5 rounded-md transition-all duration-200 font-medium ${
                        currentFeedType === "feed"
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-transparent text-gray-600 hover:bg-gray-400"
                    }`}
                >
                    My Feed
                </Link>
            </div>
        </div>
    );
}
