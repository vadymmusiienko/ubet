import CreateGoalForm from "./components/CreateGoalForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function CreateGoalPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    //TODO: Ensure user is valid before rendering properties
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="bg-githubDark p-8 rounded-xl shadow-lg mt-10 w-full max-w-lg border border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">
                    Create a Goal
                </h1>
                <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
                <CreateGoalForm userId={user.id} />
            </div>
        </div>
    );
}
