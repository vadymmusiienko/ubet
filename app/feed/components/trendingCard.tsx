// TODO: trending card here

export default function TrendingCard() {
    return (
        <div className="w-64 h-80 rounded-xl overflow-hidden shadow-lg bg-white text-center">
            <h1 className="font-bold text-xl text-center mb-5 mt-5">Trending Goals</h1>
            <ul className="text-left ml-12">  
                <li className="before:content-['•'] before:mr-1">Fitness Challenge</li>  
                <li className="before:content-['•'] before:mr-1">No Phone Challenge</li>
                <li className="before:content-['•'] before:mr-1">Romance Challenge</li>
            </ul>
        </div>
    );
}
