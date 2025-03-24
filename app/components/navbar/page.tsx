// components/Navbar.tsx

import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Home, Users, Bell } from "lucide-react";

export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const isLoggedIn = await getUser();

    return (
        <nav className="sticky top-0 left-0 w-full flex items-center justify-between p-6 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg m-4">
            {/* Left side icons */}

            <div className="flex space-x-8">
                <a href="/home" className="text-white hover:text-blue-400 transition">
                    <Home className="w-6 h-6" />
                </a>

                <a href="/friends" className="text-white hover:text-blue-400 transition">
                    <Users className="w-6 h-6" />
                </a>

                <a href="/notifications" className="text-white hover:text-blue-400 transition">
                    <Bell className="w-6 h-6" />
                </a>

            </div>

            {/* Right side Auth buttons */}
            <div className="flex space-x-4">
                {!isLoggedIn && (
                    <>
                        <LoginLink className="text-white hover:text-blue-400">Log in</LoginLink>
                        <RegisterLink className="text-white hover:text-blue-400">Register</RegisterLink>
                    </>
                )}
                {isLoggedIn && (
                    <LogoutLink className="text-white hover:text-blue-400">Log out</LogoutLink>
                )}
            </div>
        </nav>
    );
}


