'use client';
import Image from 'next/image';
import AddCarCard from "@/components/cars/AddCar";
import CarCard from "@/components/cars/CarsCard";
import SidebarSteps from "@/components/Sidebar";
import { useState, useRef, useEffect } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";
import CarStepForm from "@/components/cars/CarStepForm";
import DriverStepForm from '@/components/drivers/DriverStepForm';
import { finance } from '@/data/multiOptionsData';
import MultiOption from '@/components/ui/MultiOption';
import Vinnumber from '@/components/vinNumber/vinnumber';
import NextButton from '@/components/ui/NextBtn';

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
  const [financeConfirmed, setFinanceConfirmed] = useState(false); 
  const [showVinNumber, setShowVinNumber] = useState(false); 
  const [selectedFinanceOption, setSelectedFinanceOption] = useState<string | null>(null);
  const [vinnumber, setVinnumber] = useState<string>(''); // Store VIN number

  const { image, heading } = MultiFormheader[0];

  // Refs for each section that will scroll
  const addedCarsRef = useRef<HTMLDivElement | null>(null);  // Reference to added cars section
  const addedDriversRef = useRef<HTMLDivElement | null>(null); // Reference to added drivers section
  const financeRef = useRef<HTMLDivElement | null>(null); // Reference to finance options section
  const vinNumberRef = useRef<HTMLDivElement | null>(null); // Reference to VIN number section

  const toggleCar = (index: number) => {
    const updated = [...cars];
    updated[index].selected = !updated[index].selected;
    setCars(updated);
  };

  const handleCarFormComplete = (car: { [key: string]: string }) => {
    setAddedCars([car, ...addedCars]);  // Prepend the new car (latest one)
    setShowForm(false);
    setTimeout(() => {
      setCarConfirmed(true);
      setShowDriverForm(true); // Show driver form after car form is completed
    }, 500);
  };

  const handleDriverFormComplete = (driver: { [key: string]: string }) => {
    setAddedDrivers([driver, ...addedDrivers]);  // Prepend the new driver (latest one)
    setShowDriverForm(false);
    setTimeout(() => {
      setDriverConfirmed(true); // Mark driver as confirmed
    }, 500);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedFinanceOption(value); // Store selected finance option
    setFinanceConfirmed(true); // Confirm the finance type selection
    setShowVinNumber(true); // Show VIN number form immediately after selecting an option
  };

  const handleVinNumberChange = (value: string) => {
    setVinnumber(value);
  };

  // Scroll only the specific sections based on form completion
  useEffect(() => {
    if (addedCars.length > 0 && addedCarsRef.current) {
      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (addedDrivers.length > 0 && addedDriversRef.current) {
      addedDriversRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (financeConfirmed && financeRef.current) {
      financeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    else if (showVinNumber && vinNumberRef.current) {
      vinNumberRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addedCars, addedDrivers, financeConfirmed, showVinNumber]);

  // Set active header based on form completion
  let activeHeader = MultiFormheader[0];
  if (carConfirmed && !driverConfirmed) {
    activeHeader = MultiFormheader[1];
  } else if (driverConfirmed) {
    activeHeader = MultiFormheader[2];
  }

  return (
    <div className="min-h-[200vh] bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden">
      <div>
        <MultiformHeader />
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 mt-3">
        <div className="flex flex-col xl:flex-row gap-6">
          <aside className="w-full xl:w-1/4 hidden md:block mt-35">
            <SidebarSteps />
          </aside>

          <main className="w-full xl:w-3/4 space-y-6 ">

            {/* Section to show the most recent added data */}
            <div className='overflow-y-auto max-h-[400px]' style={{ marginBottom: '20px' }}>
              {/* Show only the latest car */}
              {addedCars.length > 0 && (
                <div ref={addedCarsRef} className="ml-10 space-y-2">
                  {addedCars.slice(0, 1).map((entry, index) => ( // Show only the latest added car
                    <div key={index} className="transition-all duration-700 transform">
                      <h3 className="text-lg font-semibold text-gray-900">
                       {Object.values(entry).filter(Boolean).join(" ")}
                      </h3>
                    </div>
                  ))}
                </div>
              )}

              {/* Show only the latest driver */}
              {addedDrivers.length > 0 && (
                <div ref={addedDriversRef} className="ml-10 space-y-2">
                  {addedDrivers.slice(0, 1).map((entry, index) => ( // Show only the latest added driver
                    <div key={index} className="transition-all duration-700 transform">
                      <h3 className="text-lg font-semibold text-gray-700">
                   {Object.values(entry).filter(Boolean).join(" ")}
                      </h3>
                    </div>
                  ))}
                </div>
              )}

              {/* Show selected finance option */}
              {selectedFinanceOption && (
                <div ref={financeRef} className="ml-10 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                 {selectedFinanceOption}
                  </h3>
                </div>
              )}

              {/* Show VIN number */}
              {vinnumber && (
                <div ref={vinNumberRef} className="ml-10 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                   {vinnumber}
                  </h3>
                </div>
              )}
            </div>

            {/* Header Section */}
            <div className='flex mt-28 gap-00'>
              <div className=''>
                <Image
                  src={image || "/default-avatar.png"}
                  alt="heading image"
                  width={55}
                  height={55}
                  className="rounded-full object-cover h-auto border-2 border-white shadow"
                />
              </div>
              <div className={`ml-4 w-2/5`}>
                <MultiformHeading heading={activeHeader.heading} />
              </div>
            </div>

            {/* Car Form */}
            {!showForm && addedCars.length === 0 && !carConfirmed && (
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
                <NextButton
                  disabled={!cars.some((car) => car.selected)}
                  onClick={() => {
                    // Handle "Next" button click for Car step
                  }}
                />
              </div>
            )}

            {/* Car Form */}
            {showForm && (
              <div className="mt-6">
                <CarStepForm
                  onCancel={() => setShowForm(false)}
                  onComplete={handleCarFormComplete}
                />
              </div>
            )}

            {/* Driver Form */}
            {showDriverForm && !driverConfirmed && (
              <div className="ml-10 mt-2">
                <DriverStepForm
                  onCancel={() => setShowDriverForm(false)}
                  onComplete={handleDriverFormComplete}
                />
              </div>
            )}

            {/* Finance Options */}
            {driverConfirmed && !financeConfirmed && (
              <div className="ml-10">
                <MultiOption data={finance} onSelect={handleOptionSelect} />
                <NextButton
                  disabled={!financeConfirmed}
                  onClick={() => {
                    // Handle "Next" button click for Finance Type step
                  }}
                />
              </div>
            )}

            {/* VIN Number */}
            {financeConfirmed && showVinNumber && (
              <div className="ml-10 mt-6">
                <Vinnumber
                  data={[]}
                  onSelect={handleVinNumberChange} // Set VIN number
                  onNextClick={() => { /* Handle next step after VIN number */ }}
                />
                <NextButton
                  disabled={false}
                  onClick={() => {
                    // Handle "Next" button click for VIN Number step
                  }}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
