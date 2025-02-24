import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { updateUser } from "@/actions/dbActions";
import Image from "next/image";

export default async function Dashboard() {
    // Create a user
    await updateUser();

    // Example usage of getKindeServerSession
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    return (
        <>
            <div>This is Dashboard</div>
            <div>Id {user.id}</div>
            <div>Username: {user.username}</div>
            <div>First Name: {user.given_name}</div>
            <div>Last Name: {user.family_name}</div>
            {/* Make sure the picture is not null */}
            {user.picture && (
                <Image
                    src={user.picture}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
            )}
        </>
    );
}
