"use client";

import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";
import CarStepForm from "@/components/cars/CarStepForm";

export default function CarsPage() {
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

      <div className="w-4/6 mx-auto mt-5">
        <div className="flex gap-12">
          <aside className="w-1/4">
            <SidebarSteps />
          </aside>

          {/* <main className="w-3/4 space-y-4">
            <div>
              <MultiformHeading image={image} heading={heading} />
            </div>
            <div className="flex flex-col items-end gap-4 w-2/4">
              {!showForm &&
                cars.map((car, idx) => (
                  <CarCard
                    key={idx}
                    name={car.name}
                    icon={<div className="w-6 h-6 bg-black" />}
                    selected={car.selected}
                    onToggle={() => toggleCar(idx)}
                  />
                ))}

              {showForm ? (
                <CarStepForm
                  onCancel={() => setShowForm(false)}
                  onBack={() => setShowForm(false)} />
              ) : (
                <AddCarCard onClick={() => setShowForm(true)} />
              )}
            </div>


            <div className="flex justify-center w-[500px]">
              <button
                className="mt-4 px-6 py-2 bg-gray-300 rounded text-white disabled:opacity-50 mx-auto"
                disabled={!cars.some((car) => car.selected)}
              >
                Next →
              </button>
            </div>
          </main> */}

          <main className="w-3/4 space-y-4">
            <div>
              <MultiformHeading image={image} heading={heading} />
            </div>

            <div className="flex flex-col items-end gap-4 w-2/4">
              {!showForm &&
                cars.map((car, idx) => (
                  <CarCard
                    key={idx}
                    name={car.name}
                    icon={<div className="w-6 h-6 bg-black" />}
                    selected={car.selected}
                    onToggle={() => toggleCar(idx)}
                  />
                ))}

              {showForm && (
                <CarStepForm
                  onCancel={() => setShowForm(false)}
                  onBack={() => setShowForm(false)}
                  onComplete={(car) => {
                    setCars([...cars, car]);
                    setShowForm(false);
                  }}
                />
              )}

              {!showForm && <AddCarCard onClick={() => setShowForm(true)} />}
            </div>

            {!showForm && (
              <div className="flex justify-center w-[500px]">
                <button
                  className="mt-4 px-6 py-2 bg-gray-300 rounded text-white disabled:opacity-50 mx-auto"
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
