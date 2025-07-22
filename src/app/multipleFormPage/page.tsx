'use client';

import Image from 'next/image';
import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";
import CarStepForm from "@/components/cars/CarStepForm";
import DriverStepForm from '@/components/drivers/DriverStepForm';
import { finance } from '@/data/multiOptionsData';
import MultiOption from '@/components/ui/MultiOption';

export default function MultipleFormPage() {
  const [cars, setCars] = useState([
    { name: "Toyota", selected: false },
    { name: "Hyundai", selected: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [addedCars, setAddedCars] = useState<{ [key: string]: string }[]>([]);
  const [carConfirmed, setCarConfirmed] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [addedDrivers, setAddedDrivers] = useState<{ [key: string]: string }[]>([]);
  const [driverConfirmed, setDriverConfirmed] = useState(false);
  const { image, heading } = MultiFormheader[0];

  const toggleCar = (index: number) => {
    const updated = [...cars];
    updated[index].selected = !updated[index].selected;
    setCars(updated);
  };

  const handleCarFormComplete = (car: { [key: string]: string }) => {
    setAddedCars((prev) => [...prev, car]);
    setShowForm(false);
    setTimeout(() => {
      setCarConfirmed(true);
      setShowDriverForm(true);
    }, 500);
  };

  const handleDriverFormComplete = (driver: { [key: string]: string }) => {
    setAddedDrivers((prev) => [...prev, driver]);
    setShowDriverForm(false);
    setTimeout(() => {
      setDriverConfirmed(true);
    }, 500);
  };

  let activeHeader = MultiFormheader[0];
  if (carConfirmed && !driverConfirmed) {
    activeHeader = MultiFormheader[1];
  } else if (driverConfirmed) {
    activeHeader = MultiFormheader[2];
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 mt-3">
        <div className="flex flex-col xl:flex-row gap-6">
          <aside className="w-full xl:w-1/4 hidden md:block mt-35">
            <SidebarSteps />
          </aside>

          <main className="w-full xl:w-3/4 space-y-6 h-[850px] overflow-y-scroll scroll-smooth scrollbar-hide">
            <div className='flex mt-35'>
              <div className='fixed top-38 left-1/3'>
                <Image
                  src={image || "/default-avatar.png"}
                  alt="heading image"
                  width={55}
                  height={55}
                  className="rounded-full object-cover h-auto border-2 border-white shadow"
                />
              </div>
              <div className={`ml-10 w-2/5 transition-transform duration-1000 ${carConfirmed && !driverConfirmed ? "-translate-y-32 opacity-60" : driverConfirmed ? "-translate-y-64 opacity-30" : "translate-y-0 opacity-100"}`}>
                <MultiformHeading heading={activeHeader.heading} />
              </div>
            </div>

            {addedCars.length > 0 && (
              <div className={`ml-10 transition-transform duration-1000 ${carConfirmed ? "-translate-y-32 " : "translate-y-0 "} space-y-2`}>
                {addedCars.map((entry, index) => (
                  <div key={index} className="transition-all duration-700 transform">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {Object.values(entry).filter(Boolean).join(" ")}
                    </h3>
                  </div>
                ))}
              </div>
            )}

            {showDriverForm && (
              <div className="ml-10 mt-2">
                <DriverStepForm
                  onCancel={() => setShowDriverForm(false)}
                  onComplete={handleDriverFormComplete}
                />
              </div>
            )}

            {addedDrivers.length > 0 && (
              <div className={`ml-10 transition-transform duration-1000 ${driverConfirmed ? "-translate-y-32" : "translate-y-0"} space-y-2`}>
                {addedDrivers.map((entry, index) => (
                  <div key={index} className="transition-all duration-700 transform">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {Object.values(entry).filter(Boolean).join(" ")}
                    </h3>
                  </div>
                ))}
              </div>
            )}

            {/* Conditionally render the car list */}
            {!showForm && addedCars.length === 0 && (
              <div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 ml-10">
                {cars.map((car, idx) => (
                  <CarCard
                    key={idx}
                    name={car.name}
                    selected={car.selected}
                    onToggle={() => toggleCar(idx)}
                  />
                ))}
                <AddCarCard
                  onClick={() => setShowForm(true)}
                  onComplete={handleCarFormComplete}
                />
              </div>
            )}

            {showForm && (
              <div className="mt-6">
                <CarStepForm
                  onCancel={() => setShowForm(false)}
                  onComplete={handleCarFormComplete}
                />
              </div>
            )}

            {!showForm && addedCars.length === 0 && driverConfirmed &&(
              <div className="flex justify-center w-[440px]">
                <button
                  className="mt-4 px-10 font-semibold py-3 bg-[#d0d0d0] rounded text-gray-800  disabled:opacity-50"
                  disabled={!cars.some((car) => car.selected)}
                >
                  Next →
                </button>
              </div>
            )}

            {/* Conditionally render FinanceType after driver form is confirmed */}
            {driverConfirmed && (
              <div className="ml-10 mt-6">
                <MultiOption data={finance} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
