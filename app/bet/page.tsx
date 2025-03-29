"use client";

import { useState, useTransition } from "react";
import { placeBet } from "@/app/bet/actions";

interface BetFormProps {
  userId: string;
  goalId: string;
}

const BetForm = ({ userId, goalId }: BetFormProps) => {
  const [amount, setAmount] = useState("");
  const [betType, setBetType] = useState<"FOR" | "AGAINST">("FOR");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    startTransition(async () => {
      try {
        await placeBet(userId, goalId, parseFloat(amount), betType);
        setAmount("");
        setBetType("FOR");
      } catch (err) {
        setError((err as Error).message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}

      <div>
        <label>Bet Amount</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div>
        <label>Bet Type</label>
        <select value={betType} onChange={(e) => setBetType(e.target.value as "FOR" | "AGAINST")}>
          <option value="FOR">Bet FOR</option>
          <option value="AGAINST">Bet AGAINST</option>
        </select>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Placing Bet..." : "Place Bet"}
      </button>
    </form>
  );
};

export default BetForm;

