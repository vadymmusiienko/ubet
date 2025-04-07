import { Suspense } from "react";
import FeedGoalCard from "./feedGoalCard";
import MyGoals from "./myGoals";
import LoadingGoals from "./loadingGoals";

interface MainFeedProps {
    page: number;
    feedType: string;
}

export default function MainFeed({ page, feedType }: MainFeedProps) {
    return (
        <div className="w-full md:w-1/2 space-y-4">
            {feedType === "engagements" ? (
                <Suspense fallback={<LoadingGoals />}>
                    <MyGoals page={page} />
                </Suspense>
            ) : (
                <FeedGoalCard />
            )}
        </div>
    );
}
