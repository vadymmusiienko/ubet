import { Suspense } from "react";
import FeedGoals from "./feed-goals";
import MyGoals from "./my-goals";
import LoadingGoals from "./loading-feed";

interface FeedProps {
    page: number;
    feedType: string;
}

export default function Feed({ page, feedType }: FeedProps) {
    return (
        <div className="w-full md:w-1/2 space-y-4">
            {feedType === "engagements" ? (
                <Suspense fallback={<LoadingGoals />}>
                    <MyGoals />
                </Suspense>
            ) : (
                <Suspense fallback={<LoadingGoals />}>
                    <FeedGoals page={page} feedType={feedType} />
                </Suspense>
            )}
        </div>
    );
}
