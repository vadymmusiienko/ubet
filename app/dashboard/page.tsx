import { FaUserCircle } from "react-icons/fa";
import MyGoalCard from "./components/myGoalCard";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default async function CreateGoal() {
    const goals = await db.goal.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
        },
    });

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            {/* Main Content */}
            <div className="flex w-full max-w-5xl mt-6">
                {/* Profile Card */}
                <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
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

                {/* Goals Section */}
                <div className="w-1/2 mx-4 space-y-4">
                    {goals.map((goal) => (
                        <MyGoalCard
                            key={goal.id}
                            title={goal.title}
                            startDate={goal.startDate.toDateString()}
                            endDate={goal.endDate.toDateString()}
                            description={goal.description}
                        />
                    ))}
                </div>

                {/* Sidebar */}
                <div className="w-1/4 space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">
                            People you may know
                        </h2>
                        <ul className="text-sm mt-2">
                            <li>Angie Zhou (@angiezh)</li>
                            <li>John Smith (@johnsmith)</li>
                            <li>Jane Doe (@janedoe)</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold">Trending Goals</h2>
                        <ul className="text-sm mt-2">
                            <li>Fitness challenge</li>
                            <li>No phone challenge</li>
                            <li>Romance challenge</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
