"use client";

import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";
import MultiformHeader from "@/components/MultiformHeader";

export default function CarsPage() {
  const [cars, setCars] = useState([
    { name: "Toyota", selected: false },
    { name: "Hyundai", selected: false }
  ]);

  const toggleCar = (index: number) => {
    const updated = [...cars];
    updated[index].selected = !updated[index].selected;
    setCars(updated);
  };
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen  bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden ">
      <div className="header">
        <MultiformHeader />
      </div>

      <div className="flex gap-12 mt-6">
        <aside className="w-1/4">
          <SidebarSteps />
        </aside>

        <main className="w-3/4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300" />
            <p className="text-lg font-semibold">Alright. These are the cars that I found. Which would you like to insure?</p>
          </div>

          {cars.map((car, idx) => (
            <CarCard key={idx} name={car.name} icon={<div className="w-6 h-6 bg-black" />} selected={car.selected} onToggle={() => toggleCar(idx)} />
          ))}

          <AddCarCard onClick={() => setCars([...cars, { name: "New Car", selected: false }])} />

          <button
            className="mt-4 px-6 py-2 bg-gray-300 rounded text-white disabled:opacity-50"
            disabled={!cars.some(car => car.selected)}
          >
            Next →
          </button>
        </main>
      </div>
    </div>
  );
}
