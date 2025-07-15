"use client";

import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";


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


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700">BRAXTONE</h1>
        <div>My Account ▼</div>
      </header>

      <div className="flex gap-12">
        <aside className="w-1/4">
          <SidebarSteps/>
        </aside>

        <main className="w-3/4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300" /> {/* Avatar Placeholder */}
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
