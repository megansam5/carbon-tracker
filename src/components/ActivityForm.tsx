"use client";

import { useState } from "react";
import { activities } from "@/lib/footprintData";

interface Activity {
  activity: string;
  amount: number;
  emissions: number;
}

interface ActivityFormProps {
  onAdd: (activity: Activity) => void;
}

export default function ActivityForm({ onAdd }: ActivityFormProps) {
  const [activity, setActivity] = useState("car");
  const [amount, setAmount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const factor = activities[activity].factor;
    const emissions = amount * factor;
    onAdd({ activity, amount, emissions });
    setAmount(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-md w-full"
    >
      <label className="font-semibold text-sm">Activity</label>
      <select
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="p-2 border rounded-md"
      >
        {Object.entries(activities).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <label className="font-semibold text-sm">Amount</label>
      <input
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="p-2 border rounded-md"
      />

      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition"
      >
        Add Activity
      </button>
    </form>
  );
}
