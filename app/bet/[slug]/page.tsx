// app/bet/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getGoalByTitle } from "./actions";
import BetPage from "./bet-page";
//import { auth } from "@/lib/auth"; // Assuming you have an auth library
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function BetPageRoute({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const decodedTitle = decodeURIComponent(resolvedParams.slug);
    // Get authenticated user
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
    // Find the goal by title
    const goal = await getGoalByTitle(decodedTitle);
    if (!goal) {
        notFound();
    }
    return <BetPage goal={goal} userId={userId} />;
}
