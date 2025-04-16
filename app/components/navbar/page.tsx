import {
    RegisterLink,
    LoginLink,
    LogoutLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import { Users, Bell, UserCircle, PlusCircle, Menu } from "lucide-react";
  import Link from "next/link";
  
  export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isLoggedIn = !!user;
  
    return (
      <nav className="bg-githubDark text-gray-200 py-3 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and App name */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <Link href="/dashboard" className="font-bold text-xl flex items-center">
                  <span className="bg-blue-600 text-white rounded-lg p-1 mr-2">
                    <Users size={20} />
                  </span>
                  Ubet
                </Link>
              ) : (
                <Link href="/" className="font-bold text-xl flex items-center">
                  <span className="bg-blue-600 text-white rounded-lg p-1 mr-2">
                    <Users size={20} />
                  </span>
                  Ubet
                </Link>
              )}
            </div>
  
            {/* Center icons - only visible when logged in */}
            {isLoggedIn && (
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/friends" className="flex flex-col items-center hover:bg-gray-800 px-3 py-1 rounded transition-colors">
                  <Users size={20} />
                  <span className="text-xs mt-1">FRIENDS</span>
                </Link>
                <Link href="/notifications" className="flex flex-col items-center hover:bg-gray-800 px-3 py-1 rounded transition-colors">
                  <Bell size={20} />
                  <span className="text-xs mt-1">ALERTS</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center hover:bg-gray-800 px-3 py-1 rounded transition-colors">
                  <UserCircle size={20} />
                  <span className="text-xs mt-1">PROFILE</span>
                </Link>
                <Link href="/create" className="flex flex-col items-center hover:bg-gray-800 px-3 py-1 rounded transition-colors">
                  <PlusCircle size={20} />
                  <span className="text-xs mt-1">CREATE</span>
                </Link>
              </div>
            )}
  
            {/* Mobile menu button - only visible on small screens when logged in */}
            {isLoggedIn && (
              <div className="md:hidden">
                <button className="text-gray-200 hover:bg-gray-800 p-2 rounded-lg">
                  <Menu size={24} />
                </button>
              </div>
            )}
  
            {/* Right side Auth buttons */}
            <div className="flex items-center space-x-4">
              {!isLoggedIn && (
                <>
                  <LoginLink className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 font-medium hover:bg-gray-700 transition-colors">
                    Log in
                  </LoginLink>
                  <RegisterLink className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                    Register
                  </RegisterLink>
                </>
              )}
              {isLoggedIn && (
                <LogoutLink className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                  Log out
                </LogoutLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }