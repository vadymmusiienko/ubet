import CreateGoalForm from "./components/CreateGoalForm";

export default function CreateGoalPage() {
    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg mt-10 w-2/3 max-w-lg border border-gray-100">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Create a Goal
                </h1>
                <div className="w-16 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
                <CreateGoalForm />
            </div>
        </div>
    );
}
