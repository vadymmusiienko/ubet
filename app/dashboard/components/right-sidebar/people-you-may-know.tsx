// TODO: Fetch and display friends of friends if there are and if the user has no friends display random users
// Work on frontend design
// Add button to search for friends (takes you to the search page?)
// Add button to request to be friends with each displayed user

import { getSuggestedFriends } from "./actions";
import { FriendRequestButton } from "./friend-request-button";

export default async function PeopleYouMayKnow() {
  // Simulate fetching data
  const { suggestedFriends } = await getSuggestedFriends();

  return (
    <div className="bg-githubDark p-4 rounded-lg shadow-md text-gray-100">
      <h2 className="text-lg font-bold">People you may know</h2>
      <ul className="flex flex-col gap-4 text-sm mt-2">
        {suggestedFriends.map((friend, index) => (
          <li className="flex items-center justify-between" key={index}>
            <div>
              <div className="max-w-[150px] truncate font-medium">
                {friend.firstName} {friend.lastName}
              </div>
              <div className="max-w-[150px] truncate text-sm text-gray-400">
                @{friend.username}
              </div>
            </div>
            <FriendRequestButton receiverId={friend.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
