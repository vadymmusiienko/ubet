// TODO: Fetch and display the user's friends
// Work on frontend design
// Add buttons to see all friends
// Add buttons to see particular friend's profile

import Link from "next/link";
import { getFriendsList } from "./actions";

export default async function YourFriends() {
  const { users } = await getFriendsList();

  return (
    <div className="bg-githubDark p-4 rounded-lg shadow-md text-gray-100">
      <h2 className="text-lg font-bold">Your Friends</h2>
      {users.length !== 0 ? (
        <ul className="flex flex-col gap-2 text-sm mt-2 mb-4">
          {users.map((friend, index) => (
            <li key={index}>
              <Link
                href={`profile/${friend.id}`}
                className="block p-2 rounded-md hover:bg-gray-700 transition"
              >
                <div className="max-w-[150px] truncate font-medium">
                  {friend.firstName} {friend.lastName}
                </div>
                <div className="max-w-[150px] truncate text-sm text-gray-400">
                  @{friend.username}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mb-4">No friends yet.</p>
      )}
      <Link
        href="/friends"
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-3xl text-center"
      >
        {users.length <= 4 ? "View All Friends" : "View Friends Page"}
      </Link>
    </div>
  );
}
