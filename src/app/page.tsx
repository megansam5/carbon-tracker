"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import CarbonChart from "@/components/CarbonChart";
import SustainabilityTips from "@/components/SustainabilityTips";

interface Activity {
  activity: string;
  amount: number;
  emissions: number;
}

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("activities");
    if (stored) {
      try {
        setActivities(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing stored activities:", err);
      }
    }
  }, []);

  // save to localStorage when updated
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleAdd = (activity: Activity) => {
    setActivities((prev) => [...prev, activity]);
  };

  const handleRemove = (index: number) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  const total = activities.reduce((sum, a) => sum + a.emissions, 0);

  return (
    <main className="min-h-screen flex flex-col items-center bg-green-50 py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-700">
          🌍 Carbon Footprint Tracker
        </h1>

        <ActivityForm onAdd={handleAdd} />

        <div>
          <h2 className="text-xl font-semibold mb-2">Your Activities</h2>
          <ActivityList items={activities} onRemove={handleRemove} />
          <p className="mt-4 font-bold text-green-800 text-right">
            Total: {total.toFixed(2)} kg CO₂
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("activities");
              setActivities([]);
            }}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Clear all data
          </button>
        </div>

        <CarbonChart data={activities} />
        <SustainabilityTips data={activities} />
      </div>
    </main>
  );
}
