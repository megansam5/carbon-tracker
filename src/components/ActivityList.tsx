import { activities } from "@/lib/footprintData";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityItem {
  activity: string;
  amount: number;
  emissions: number;
}

interface ActivityListProps {
  items: ActivityItem[];
  onRemove: (index: number) => void;
}

export default function ActivityList({ items, onRemove }: ActivityListProps) {
  if (items.length === 0) {
    return <p className="text-gray-500">No activities logged yet.</p>;
  }

  return (
    <ul className="space-y-2 mt-4">
      <AnimatePresence>
        {items.map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm"
          >
            <div>
              <span className="block">
                {activities[item.activity].label} × {item.amount}
              </span>
              <span className="text-green-700 font-semibold text-sm">
                {item.emissions.toFixed(2)} kg CO₂
              </span>
            </div>
            <button
              onClick={() => onRemove(idx)}
              className="text-red-600 hover:text-red-800 transition"
            >
              🗑️
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
