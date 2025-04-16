// TODO: make it dynamic (don't hardcode userId and goalId)
import BetForm from "./components/bet-form";

export default function BetPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Bet Page</h1>
            <p className="text-lg mb-4">Place your bets here!</p>
            <BetForm userId="123" goalId="456" />
        </div>
    );
}
