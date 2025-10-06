export interface ActivityData {
  label: string;
  factor: number;
}

export const activities = {
  // 🚗 Transport
  car: {
    label: "Car trip (per km)",
    factor: 0.12,
    category: "Transport",
  },
  bus: {
    label: "Bus ride (per km)",
    factor: 0.06,
    category: "Transport",
  },
  train: {
    label: "Train journey (per km)",
    factor: 0.04,
    category: "Transport",
  },
  flight: {
    label: "Flight (per hour)",
    factor: 90,
    category: "Transport",
  },

  // 🍲 Food
  beef_meal: {
    label: "Beef meal (per meal)",
    factor: 5,
    category: "Food",
  },
  chicken_meal: {
    label: "Chicken meal (per meal)",
    factor: 1.7,
    category: "Food",
  },
  vegetarian_meal: {
    label: "Vegetarian meal (per meal)",
    factor: 0.8,
    category: "Food",
  },
  dairy: {
    label: "Dairy serving (per 250ml milk or equivalent)",
    factor: 0.4,
    category: "Food",
  },

  // 🏠 Home Energy
  electricity: {
    label: "Electricity use (per kWh)",
    factor: 0.25,
    category: "Home Energy",
  },
  gas_heating: {
    label: "Gas heating (per hour)",
    factor: 2.5,
    category: "Home Energy",
  },
  shower: {
    label: "Hot shower (per 10 mins)",
    factor: 1.2,
    category: "Home Energy",
  },
};
