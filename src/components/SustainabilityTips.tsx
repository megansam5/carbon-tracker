"use client";

import { useMemo } from "react";
import { activities } from "@/lib/footprintData";

interface Activity {
  activity: string;
  amount: number;
  emissions: number;
}

export default function SustainabilityTips({ data }: { data: Activity[] }) {
  const total = data.reduce((sum, a) => sum + a.emissions, 0);

  const topActivity = useMemo(() => {
    if (data.length === 0) return null;

    // find the highest-emitting activity
    return data.reduce((prev, curr) =>
      prev.emissions > curr.emissions ? prev : curr
    );
  }, [data]);

  if (data.length === 0)
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md text-gray-600 text-sm">
        💡 Log some activities to see personalized sustainability tips!
      </div>
    );

  const suggestions: Record<string, string> = {
    car: "Try walking, cycling, or using public transport for short trips 🚲",
    bus: "Buses are already efficient — great choice! You could offset emissions by planting a tree 🌳",
    train:
      "Train travel is one of the most sustainable long-distance options 🚄 — keep it up!",
    flight:
      "Consider taking fewer short flights or offsetting your next flight’s emissions ✈️",
    beef_meal:
      "Beef has a high carbon footprint — swapping one beef meal for a veggie option saves up to 5 kg CO₂ 🍲",
    chicken_meal:
      "Chicken is moderate-impact — trying plant-based meals once or twice a week can make a real difference 🥦",
    vegetarian_meal:
      "Vegetarian meals are excellent for the planet 🌿 — maybe share your favorite recipe with a friend!",
    dairy:
      "Dairy adds up over time 🥛 — try plant-based milk alternatives like oat or almond milk for a lower footprint 🌱",
    electricity:
      "Switch to renewable energy providers or unplug idle electronics to cut electricity emissions ⚡",
    gas_heating:
      "Reducing heating by just 1°C can save significant CO₂ and energy costs 🔥 — try cozy layers or better insulation!",
    shower:
      "Hot water uses a lot of energy 🚿 — even reducing shower time by 2 minutes helps conserve energy and water 💧",
  };

  const mainTip =
    topActivity && suggestions[topActivity.activity]
      ? suggestions[topActivity.activity]
      : "You're making great choices! Keep tracking to stay aware of your impact 🌿";

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-green-700">
        🌱 Sustainability Tip
      </h2>
      <p className="text-gray-700 mb-2">{mainTip}</p>
      <p className="text-sm text-gray-500">
        Total emissions so far:{" "}
        <span className="font-semibold text-green-800">
          {total.toFixed(2)} kg CO₂
        </span>
      </p>
    </div>
  );
}
