// TODO: goal card component here

export default function GoalCard() {
    return (
        <>
            <div className="min-w-[600px] rounded-xl overflow-hidden shadow-lg bg-white text-left">
                <h1 className="font-bold text-2xl mb-2 mt-5 ml-5">My Goal</h1>
                <p className="text-gray-700 ml-5 mb-8"> Jan 20th, 2025 - Feb 3rd, 2025</p>
                <h2 className="text-xl ml-5 mb-5">Have a screentime of less than 5 hours a day</h2>
                <div className="text-center mb-4 text-gray-700">
                    <button>See more details &rarr;</button>
                </div>
            </div>
            
        </>
    );
}
