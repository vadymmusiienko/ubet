//TODO: Aneesh - Make this component dynamic by passing in props and using them to display the goal details
interface GoalCardProps {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }  

export default function MyGoalCard({
    title,
    startDate,
    endDate,
    description,
  }: GoalCardProps) {
    return (
        <div className="w-1/2 mx-4 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-500">
                    {startDate} - {endDate}
                </p>
                <p className="mt-2">
                    {description}
                </p>
                <button className="text-blue-500 text-sm mt-2">
                    See more details →
                </button>
            </div>
        </div>
    );
}
