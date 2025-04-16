import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const { getUser } = getKindeServerSession();
    const isLoggedIn = await getUser();

    if (isLoggedIn) {
        redirect("/dashboard");
    }

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="flex w-full flex-1 flex-col items-center text-gray-100">
                    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                        <h1 className="text-6xl font-bold italic mb-6">UBet</h1>
                        <h2 className="text-4xl font-bold mb-6">
                            The goal-setting app that
                            <br />
                            holds you accountable.
                        </h2>
                        <p className="text-xl mb-8">
                            You know the version of you that you want to be.
                            <br />
                            We&apos;ll help get you there.
                        </p>
                        <div className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-12 rounded-full text-xl transition duration-300">
                            <RegisterLink>Sign Up</RegisterLink>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
