import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
    const { getUser } = getKindeServerSession();
    const isLoggedIn = await getUser();

    return (
        <nav className="items-center justify-between p-4 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg m-4 flex">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>

            {/* SignIn/SignUp buttons (show up only for not logged in users) */}
            {!isLoggedIn && <LoginLink>Sign in</LoginLink>}

            {!isLoggedIn && <RegisterLink>Register</RegisterLink>}

            {/* Logout button (shows up only for logged in users) */}
            {isLoggedIn && <LogoutLink>Log out</LogoutLink>}
        </nav>
    );
}
