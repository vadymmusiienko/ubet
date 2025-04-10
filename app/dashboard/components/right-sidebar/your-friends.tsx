// TODO: Fetch and display the user's friends
// Work on frontend design
// Add buttons to see all friends
// Add buttons to see particular friend's profile

export default async function YourFriends() {
    // Simulate fetching data
    const people = [
        { name: "Angie Zhou", username: "@angiezh" },
        { name: "John Smith", username: "@johnsmith" },
        { name: "Jane Doe", username: "@janedoe" },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Your Friends</h2>
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
