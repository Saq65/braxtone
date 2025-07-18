"use client";

import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";
import CarStepForm from "@/components/cars/CarStepForm";

export default function MultipleFormPage() {
  const [cars, setCars] = useState([
    { name: "Toyota", selected: false },
    { name: "Hyundai", selected: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const { image, heading } = MultiFormheader[0];

  const toggleCar = (index: number) => {
    const updated = [...cars];
    updated[index].selected = !updated[index].selected;
    setCars(updated);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden">
      <div className="header">
        <MultiformHeader />
      </div>

      <div className="w-full max-w-7xl mx-auto mt-5 px-4">
        <div className="flex flex-col xl:flex-row gap-6">
           <aside className="w-full xl:w-1/4 hidden md:block">
            <SidebarSteps />
          </aside>

          <main className="w-full xl:w-3/4 space-y-6">
            <div>
              <MultiformHeading image={image} heading={heading} />
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 mx-auto sm:mx-22 md:mx-22 lg:mx-22 :mx-22">
              {!showForm &&
                cars.map((car, idx) => (
                  <CarCard
                    key={idx}
                    name={car.name}
                    selected={car.selected}
                    onToggle={() => toggleCar(idx)}
                  />
                ))}

              {showForm && (
                <CarStepForm
                  onCancel={() => setShowForm(false)}
                  onComplete={(car) => {
                    setShowForm(false);
                  }}
                />
              )}

              {!showForm && <AddCarCard onClick={() => setShowForm(true)} />}
            </div>

            {!showForm && (
              <div className="flex justify-center w-3/5">
                <button
                  className="mt-4 px-8 py-3 bg-gray-300 rounded text-white disabled:opacity-50"
                  disabled={!cars.some((car) => car.selected)}
                >
                  Next →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
