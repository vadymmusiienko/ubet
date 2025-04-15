import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import crypto from "crypto";

export default async function ProfileCard() {
    // Get user's info from session
    const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();

    // Fetch user data from database ------------------------------------
    let user;
    let friendsCount = 0;
    let totalBetsAmount = 0;

    try {
        user = await prisma.user.findUnique({
            where: { id: sessionUser.id },
            include: {
                bets: true,
                friends: true,
            },
        });

        // Count the number of friends
        friendsCount = user?.friends?.length || 0;

        // Calculate total bets amount (winnings/losses)
        if (user?.bets && user.bets.length > 0) {
            user.bets.forEach((bet) => {
                // Add FOR bets, subtract AGAINST bets
                if (bet.betType === "FOR") {
                    totalBetsAmount += bet.amount;
                } else if (bet.betType === "AGAINST") {
                    totalBetsAmount -= bet.amount;
                }
            });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return (
            <div className="w-full sm:w-72 rounded-xl overflow-hidden shadow-lg bg-white text-center p-5">
                <p className="text-gray-700">Unable to load profile data</p>
            </div>
        );
    }
    // ------------------------------------------------------------------

    // Use profile picture if available, otherwise use Gravatar
    let profileImage = user?.picture;

    if (!profileImage) {
        // Generate Gravatar URL as fallback
        const email = user?.email?.trim().toLowerCase() || "";
        const emailHash = crypto.createHash("md5").update(email).digest("hex");
        profileImage = `https://www.gravatar.com/avatar/${emailHash}?s=200&d=identicon`;
    }

    // Format user data with fallbacks
    const fullName =
        [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
    const username = user?.username || "";

    return (
        <div className="w-full sm:w-72 rounded-xl overflow-hidden shadow-lg bg-white text-center transition-all hover:shadow-xl">
            <div className="px-4 py-5">
                <h1 className="font-bold text-2xl mb-3 text-gray-800">
                    {fullName}
                </h1>

                <div className="relative mb-4">
                    <Image
                        className="rounded-full mx-auto shadow-md"
                        width={80}
                        height={80}
                        src={profileImage}
                        alt={`${fullName}'s profile picture`}
                        priority
                    />
                </div>

                <div className="mb-4">
                    <p className="text-gray-600 text-sm">@{username}</p>
                </div>

                <div className="flex justify-between mb-6 px-2">
                    <div className="text-center">
                        <h2 className="font-semibold text-gray-800 text-sm">
                            Total Bets
                        </h2>
                        <p
                            className={`text-lg ${
                                totalBetsAmount >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            ${totalBetsAmount.toFixed(2)}
                        </p>
                    </div>

                    <div className="text-center">
                        <h2 className="font-semibold text-gray-800 text-sm">
                            Friends
                        </h2>
                        <p className="text-lg text-blue-600">{friendsCount}</p>
                    </div>
                </div>

                <Link href={`/profile/${user?.id}`} className="block">
                    <button
                        className="bg-purple-700 text-white py-2 px-8 rounded-full w-full
                                  transition-all hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 
                                  focus:outline-none"
                        aria-label="Visit profile"
                    >
                        View Profile
                    </button>
                </Link>
            </div>
        </div>
    );
}
