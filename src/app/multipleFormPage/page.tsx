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
import { BiPencil } from 'react-icons/bi';
import CarRunMiles from '@/components/progressBar/ProgressBar';
import NextBtn from "@/components/ui/NextBtn";
import BHDComponent from '@/components/progressBar/ProgressBar';



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
  const [vinnumber, setVinnumber] = useState<string>('');
  const [addedVinNumber, setAddedVinNumber] = useState<string | null>(null);

  const [carMiles, setCarMiles] = useState<number | null>(null);
  const [showCarRunMiles, setShowCarRunMiles] = useState(false);
  const [showBHD, setShowBHD] = useState(false);


  const handleCarMilesChange = (val: number) => {
    setCarMiles(val);
  };

  const handleCarMilesComplete = () => {
    if (carMiles !== null) {
      setShowCarRunMiles(false);
      setShowBHD(true);
    }
  };

  const [bhdValue, setBhdValue] = useState<number | null>(null);
  const handleBHDComponent = (val: number) => {
    setBhdValue(val);
  };

  const { image, heading } = MultiFormheader[0];

  const addedCarsRef = useRef<HTMLDivElement | null>(null);

  const toggleCar = (index: number) => {
    const updated = [...cars];
    updated[index].selected = !updated[index].selected;
    setCars(updated);
  };

  const handleCarFormComplete = (car: { [key: string]: string }) => {
    setAddedCars([car, ...addedCars]);
    setShowForm(false);
    setTimeout(() => {
      setCarConfirmed(true);
      setShowDriverForm(true);
    }, 500);
  };

  const handleDriverFormComplete = (driver: { [key: string]: string }) => {
    setAddedDrivers([driver, ...addedDrivers]);
    setShowDriverForm(false);
    setTimeout(() => {
      setDriverConfirmed(true);
    }, 500);
  };

  const handleOptionSelect = (value: string) => {
    setSelectedFinanceOption(value);
    setFinanceConfirmed(true);
    setShowVinNumber(true);
  };

  const handleVinNumberChange = (value: string) => {
    setVinnumber(value);
  };

  const handleVinNumberComplete = () => {
    setAddedVinNumber(vinnumber);
    setShowVinNumber(false);
    setShowCarRunMiles(true); // Show CarRunMiles next
  };


  useEffect(() => {
    if (addedCars.length > 0 && addedCarsRef.current) {
      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addedCars, addedDrivers, financeConfirmed, showVinNumber]);

  let activeHeader = MultiFormheader[0];
  if (carConfirmed && !driverConfirmed) {
    activeHeader = MultiFormheader[1];
  } else if (driverConfirmed) {
    activeHeader = MultiFormheader[2];
  }

  return (
    <div className="min-h-[330vh] bg-[linear-gradient(to_bottom,_#ceedfe_0%,_white_30%,_white_70%,_#ceedfe_100%)] overflow-x-hidden scrollbar-hide">
      <div className='fixed  w-full'>
        <MultiformHeader />
      </div>
      <div className="w-full max-w-7xl mx-auto px-10 mt-20 ">
        <div className=' flex justify-center flex-col items-center cursor-pointer' style={{ marginBottom: '20px', rowGap: '40px' }}>
          {addedCars.length > 0 && (
            <div ref={addedCarsRef} className="ml-10 space-y-2">
              <MultiformHeading color="#8b8b8b" heading="Alright. These are the cars that I found. Which would you like to insure?" />
              {addedCars.slice(0, 1).map((entry, index) => (
                <div key={index} className="transition-all duration-700 transform">
                  <div className='flex  items-center gap-2'>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {Object.values(entry).filter(Boolean).join(" ")}
                    </h3>
                    <BiPencil onClick={() => setShowForm(true)} className='mt-1' />
                  </div>

                </div>
              ))}
            </div>
          )}

          {addedDrivers.length > 0 && (
            <div ref={addedCarsRef} className="ml-10 space-y-2">
              <MultiformHeading color="#8b8b8b" heading="15 Seconds could save you 15% or more" />
              {addedDrivers.slice(0, 1).map((entry, index) => (
                <div key={index} className="transition-all duration-700 transform">
                  <div className='flex  items-center gap-2'>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {Object.values(entry).filter(Boolean).join(" ")}
                    </h3>
                    <BiPencil className='mt-1' onClick={() => setShowDriverForm(true)} />

                  </div>

                </div>
              ))}
            </div>
          )}

          {selectedFinanceOption && (
            <div ref={addedCarsRef} className="ml-10 space-y-2">
              <MultiformHeading color="#8b8b8b" heading="Selected Finance Option" />
              <div className='flex  items-center gap-2'>
                <h3 className="text-lg font-semibold text-gray-700">
                  {selectedFinanceOption}
                </h3>
                <BiPencil className='mt-1' />

              </div>

            </div>
          )}

          {addedVinNumber && (
            <div ref={addedCarsRef} className="ml-10 space-y-2">
              <MultiformHeading color="#8b8b8b" heading="Great. Is your Nissan 370Z financed or leased?" />
              <div className='flex  items-center gap-2'>
                <h3 className="text-lg font-semibold text-gray-700">
                  {addedVinNumber}
                </h3>
                <BiPencil className='mt-1' />

              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col xl:flex-row gap-5 w-full">
          <aside className="w-full xl:w-1/4 hidden md:block mt-14">
            <SidebarSteps />
          </aside>

          <main className="w-full xl:w-3/4 space-y-6 ">

            <div className='flex mt-12 gap-00'>
              <div className=''>
                <Image
                  src={image || "/default-avatar.png"}
                  alt="heading image"
                  width={55}
                  height={55}
                  className="rounded-full object-cover h-auto border-2 border-white shadow"
                />
              </div>
              <div className={`ml-4 w-[42%]`}>
                <MultiformHeading heading={activeHeader.heading} />
              </div>
            </div>

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
                  onClick={() => { }}
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

            {showDriverForm && !driverConfirmed && (
              <div className="ml-10 mt-2">
                <DriverStepForm
                  onCancel={() => setShowDriverForm(false)}
                  onComplete={handleDriverFormComplete}
                />
              </div>
            )}

            {driverConfirmed && !financeConfirmed && (
              <div className="ml-10">
                <MultiOption data={finance} onSelect={handleOptionSelect} />
                <NextButton
                  disabled={!financeConfirmed}
                  onClick={() => { }}
                />
              </div>
            )}

            {financeConfirmed && showVinNumber && (
              <div className="ml-10 mt-6">
                <Vinnumber
                  data={[]}
                  onSelect={handleVinNumberChange}
                  onNextClick={handleVinNumberComplete}
                />
                <NextButton
                  disabled={false}
                  onClick={() => {
                    handleVinNumberComplete();

                    if (addedCarsRef.current) {
                      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                />
              </div>
            )}


            {financeConfirmed && showVinNumber && (
              <div className="ml-10 mt-6">
                <Vinnumber
                  data={[]}
                  onSelect={handleVinNumberChange}
                  onNextClick={handleVinNumberComplete}
                />
                <NextButton
                  // disabled={false}
                  disabled={!vinnumber}

                  onClick={() => {
                    // Add VIN number when "Next" button is clicked

                    handleVinNumberComplete();

                    // Scroll to the latest data (optional)
                    if (addedCarsRef.current) {
                      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                />
              </div>
            )}



            {showCarRunMiles && (
              <div className="ml-10 mt-6">
                <CarRunMiles
                  max={20000}
                  unitLabel="miles/year"
                  defaultValue={5500}
                  onSelect={handleCarMilesChange} 
                />
                <NextBtn
                  disabled={carMiles === null}
                  onClick={handleCarMilesComplete}
                  label="Next →"
                />
              </div>
            )}

            {showBHD && (
              <div className="ml-10 mt-6">
                <BHDComponent
                  max={20000}
                  unitLabel="BHD"
                  defaultValue={5500}
                  onSelect={handleBHDComponent}
                />

              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
