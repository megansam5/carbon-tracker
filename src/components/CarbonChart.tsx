"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { activities } from "@/lib/footprintData";

interface Activity {
  activity: string;
  emissions: number;
  amount: number;
}

const slice_colours = [
  "#2b83ba",
  "#abdda4",
  "#fdae61",
  "#d7191c",
  "#984ea3",
  "#66c2a5",
  "#fc8d62",
  "#8da0cb",
  "#e78ac3",
  "#a6d854",
];

export default function CarbonChart({ data }: { data: Activity[] }) {
  const aggregated: Record<string, { emissions: number; category: string }> =
    {};
  data.forEach((item) => {
    if (!aggregated[item.activity]) {
      aggregated[item.activity] = {
        emissions: item.emissions,
        category: activities[item.activity].category,
      };
    } else {
      aggregated[item.activity].emissions += item.emissions;
    }
  });

  const chartData = Object.entries(aggregated).map(([key, value], index) => ({
    name: activities[key].label,
    emissions: Number(value.emissions.toFixed(2)),
    category: value.category,
    color: slice_colours[index % slice_colours.length],
  }));

  const renderLabel = (entry: any) => {
    const percent = entry.percent * 100;
    if (percent < 3) return null;
    return `${entry.name} (${percent.toFixed(0)}%)`;
  };

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { name, category, emissions } = payload[0].payload as any;
      return (
        <div className="bg-white p-2 rounded shadow-md border border-gray-200">
          <p className="font-semibold">{`${name}`}</p>
          <p>{`Category: ${category}`}</p>
          <p>{`${emissions.toFixed(2)} kg CO₂`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-1 text-green-700 text-center">
          Emissions by Activity
        </h2>
        <div style={{ width: "800px", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="emissions"
                nameKey="name"
                outerRadius={120}
                label={renderLabel}
                labelLine={{ stroke: "#ccc", strokeWidth: 1 }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
