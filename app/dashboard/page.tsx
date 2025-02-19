import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Dashboard() {
    // Some example as to how to use Kinde

    const { isAuthenticated, getUser } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    const user = await getUser();

    if (!isLoggedIn) {
        console.log("Not logged in");
    }

    console.log(user);

    return (
        <>
            <div>This is Dashboard</div>
            <div>Id {user.id}</div>
            <div>Username: {user.username}</div>
            <div>First Name: {user.given_name}</div>
            <div>Last Name: {user.family_name}</div>
            <Image
                src={user.picture}
                width={50}
                height={50}
                alt="Picture of the author"
            />
        </>
    );
}
