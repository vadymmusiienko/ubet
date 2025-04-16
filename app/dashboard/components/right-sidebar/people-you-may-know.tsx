// TODO: Fetch and display friends of friends if there are and if the user has no friends display random users
// Work on frontend design
// Add button to search for friends (takes you to the search page?)
// Add button to request to be friends with each displayed user

export default async function PeopleYouMayKnow() {
    // Simulate fetching data
    const people = [
        { name: "Angie Zhou", username: "@angiezh" },
        { name: "John Smith", username: "@johnsmith" },
        { name: "Jane Doe", username: "@janedoe" },
    ];

    return (
        <div className="bg-githubDark p-4 rounded-lg shadow-md text-gray-100">
            <h2 className="text-lg font-bold">People you may know</h2>
            <ul className="text-sm mt-2">
                {people.map((person, index) => (
                    <li key={index}>
                        {person.name} {person.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
