import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, Bell, UserCircle, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isLoggedIn = !!user;

    return (
        <div className="w-full px-4 py-2">
            <nav className="sticky top-0 left-0 w-full mx-auto flex items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg">
                {/* Left side - App name or logo could go here */}
                {isLoggedIn && (
                    <Link
                        href="/"
                        className="text-white font-bold hover:text-blue-400 transition"
                    >
                        Ubet
                    </Link>
                )}
                <div className="flex items-center space-x-4">
                    {/* Center icons - only visible when logged in */}
                    {isLoggedIn && (
                        <div className="flex space-x-8">
                            {/* TODO: this is temporary */}
                            <Link
                                href="/friends"
                                className="text-white hover:text-blue-400 transition"
                            >
                                FRIENDS
                            </Link>
                            <Link
                                href="/bet"
                                className="text-white hover:text-blue-400 transition"
                            >
                                <Users className="w-6 h-6" />
                            </Link>
                            <Link
                                href="/create-goal"
                                className="text-white hover:text-blue-400 transition"
                            >
                                <PlusCircle className="w-6 h-6" />
                            </Link>
                            <Link
                                href="/notifications"
                                className="text-white hover:text-blue-400 transition"
                            >
                                <Bell className="w-6 h-6" />
                            </Link>
                            <Link
                                href="/profile"
                                className="text-white hover:text-blue-400 transition"
                            >
                                <UserCircle className="w-6 h-6" />
                            </Link>
                        </div>
                    )}

                    {/* Right side Auth buttons */}
                    <div className="flex space-x-4 justify-items-end">
                        {!isLoggedIn && (
                            <>
                                <LoginLink className="text-white hover:text-blue-400 transition">
                                    Log in
                                </LoginLink>
                                <RegisterLink className="text-white hover:text-blue-400 transition">
                                    Register
                                </RegisterLink>
                            </>
                        )}
                        {isLoggedIn && (
                            <LogoutLink className="text-white hover:text-blue-400 transition">
                                Log out
                            </LogoutLink>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
