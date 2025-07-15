"use client";

import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";

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
  const { image, heading } = MultiFormheader[0];

  return (
    <div className="min-h-screen  bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden ">
      <div className="header">
        <MultiformHeader />
      </div>
      <div className="  mx-auto mt-5">

        <div className="flex gap-12">
          <aside className="lg:w-1/4 sm:block hidden">
            <SidebarSteps />
          </aside>


          <main className="mr-5 space-y-4">
            <div>
              <MultiformHeading image={image} heading={heading} />
            </div>
            <div className="flex flex-col gap-4  sm:ml-20 ">
              {cars.map((car, idx) => (
                <CarCard
                  key={idx}
                  name={car.name}
                  icon={<div className="w-6 h-6 bg-black" />}
                  selected={car.selected}
                  onToggle={() => toggleCar(idx)}
                />
              ))}

              <AddCarCard
                onClick={() => setCars([...cars, { name: "New Car", selected: false }])}
              />
            </div>

            <div className="flex justify-center w-[500px]">
              <button
                className="mt-4 px-6 py-2 bg-gray-300 rounded text-white disabled:opacity-50 mx-auto"
                disabled={!cars.some(car => car.selected)}
              >
                Next →
              </button>
            </div>

          </main>
        </div>
      </div>

    </div>
  );
}
