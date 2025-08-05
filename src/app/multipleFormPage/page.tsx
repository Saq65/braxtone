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
import {
  ClaimYesNoData, finance, HowYoungData, InsuranceYesNoData, MartialStatus, packagesData,
  RegisteredData, TraffficyesNoData, yesNoData
} from '@/data/multiOptionsData';
import MultiOption from '@/components/ui/MultiOption';
import NextButton from '@/components/ui/NextBtn';
import { BiPencil } from 'react-icons/bi';
import CarRunMiles from '@/components/progressBar/ProgressBar';
import NextBtn from "@/components/ui/NextBtn";
import BHDComponent from '@/components/progressBar/ProgressBar';
import AddDriverCard from '@/components/drivers/AddDriver';
import { motion } from 'framer-motion';
import CommunicationForm from '@/components/form/CommunicationForm';
// import PackageType from '@/components/packages/Packages';
import Packages, { PackageType } from '@/components/packages/Packages';
import ThirdPartyPackage from '@/components/packages/ThirdPartyPackage';
import PersonalDetails from '@/components/form/PersonalDetails';
import Vinnumber from '@/components/vinNumber/VinNumber';

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
  const [showFinance, setShowFinance] = useState(false);
  const [showVinNumber, setShowVinNumber] = useState(false);
  const [vinNumberConfirm, setVinnumberconfirm] = useState(false);
  const [selectedFinanceOption, setSelectedFinanceOption] = useState<string | null>(null);

  const [selectUseCar, setSelectUseCar] = useState<string | null>(null);
  const [useCarYesNoConfermed, setUseCarYesNoConfermed] = useState(false);
  const [showUseCar, setShowUseCar] = useState(false)

  const [selectAge, setSelectAge] = useState<string | null>(null);
  const [ageConfermed, setAgeConformed] = useState(false);


  const [selectTraffic, setselectTraffic] = useState<string | null>(null);
  const [confirmselectTraffic, setconfirmselectTraffic] = useState(false);


  const [selectMartial, setselectMartial] = useState<string | null>(null);
  const [confirmselectMartial, setconfirmselectMartial] = useState(false);
  const [showMartialStatus, setShowMartialStatus] = useState(false);

  const [selectRegistered, setselectRegistered] = useState<string | null>(null);
  const [confirmselectRegistered, setconfirmselectRegistered] = useState(false);
  const [showSelectRegistered, setShowSelectRegistered] = useState(false);


  const [selectInsuraceYesno, setselectInsuraceYesno] = useState<string | null>(null);
  const [confirmselectInsuranceYesno, setconfirmselectInsuranceYesno] = useState(false);
  const [showConfirmselectInsuranceYesno, setShowConfirmselectInsuranceYesno] = useState(false);

  const [selectClaim, setselectselectClaim] = useState<string | null>(null);
  const [confirmselectClaim, setconfirmselectClaim] = useState(false);
  const [showConfirmselectClaim, setShowConfirmselectClaim] = useState(false);

  const [confirmselectSound, setconfirmselectSound] = useState(false);


  const [vinnumber, setVinnumber] = useState<string>('');
  const [addedVinNumber, setAddedVinNumber] = useState<string | null>(null);
  const [addedCarMiles, setAddedCarMiles] = useState<number | null>(null);
  const [addedBhdValue, setAddedBhdValue] = useState<number | null>(null);

  const [carMiles, setCarMiles] = useState<number | null>(null);
  const [showCarRunMiles, setShowCarRunMiles] = useState(false);
  const [showBHD, setShowBHD] = useState(false);
  const [showYesNo, setShowYesNo] = useState(false);
  const [showHowYoung, setShowHowYoung] = useState(false);
  const [trafficYesNo, setTrafficYesNo] = useState(false);
  const [showMartial, setMartial] = useState(false);
  const [showRegisterd, setshowRegisterd] = useState(false);
  const [showInsurenceYesNo, setshowInsurenceYesNo] = useState(false);
  const [showClaim, setshowshowClaim] = useState(false);
  const [showSoundGood, setShowSoundGood] = useState(false);
  const [showSoundsGood, setshowSoundsGood] = useState(false);
  const [soundsGoodvalue, setsoundsGoodvalue] = useState('');
  const [showCommunication, setshowCommunication] = useState(false);
  const [showContectInfo, setShowContectInfo] = useState(false);
  const [comminicationFormData, setcomminicationFormData] = useState('');
  const [showPackages, setshowPackages] = useState(false);
  const [showInsurancePackage, setShowInsurancePackage] = useState(false);
  const [selectPackage, setselectPackage] = useState<string | null>(null);


  const [showPackageType, setshowPackageType] = useState(false);
  const [showThirdParty, setshowThirdParty] = useState(false);
  const [showPersonalDetails, setPersonalDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);

  const handleCarMilesChange = (val: number) => {
    setCarMiles(val);
  };

  const handleCarMilesComplete = () => {
    if (carMiles !== null) {
      setAddedCarMiles(carMiles);
      setShowCarRunMiles(false);
      setShowBHD(true);
    }
  };

  const handleBHDComplete = () => {
    if (bhdValue !== null) {
      setAddedBhdValue(bhdValue);
      setShowBHD(false);
      setShowYesNo(true);
      setShowUseCar(true);
    }
  };

  const [bhdValue, setBhdValue] = useState<number | null>(null);
  const handleBHDComponent = (val: number) => {
    setBhdValue(val);
  };

  const { image } = MultiFormheader[0];

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

    }, 500);
  };

  const handleDriverFormComplete = (driver: { [key: string]: string }) => {
    setAddedDrivers([driver, ...addedDrivers]);
    setShowDriverForm(false);
    setShowFinance(true)
    setTimeout(() => {
      setDriverConfirmed(true);
      setDriverConfirmed(true)
    }, 500);
  };


  const handleVinNumberChange = (value: string) => {
    setVinnumber(value);
  };

  const handleVinNumberComplete = () => {
    setAddedVinNumber(vinnumber);
    setShowVinNumber(false);
    setShowCarRunMiles(true);
    setVinnumberconfirm(true)
  };

  const [communicationData, setCommunicationData] = useState({
    country: '',
    phone: '',
    email: '',
  });

  const [personalData, setpersonalData] = useState({
    nationality: '',
    nationalId: '',
    numberPlate: '',
  });


  const handleCommunicationChange = (field: string, value: string) => {
    setCommunicationData(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalDataChange = (field: string, value: string) => {
    setpersonalData(prev => ({ ...prev, [field]: value }));
  };


  const handleFinanceOnNext = () => {
    setShowVinNumber(true);
    setFinanceConfirmed(true);
  };
  const handleOptionSelectInFinanace = (value: string) => {
    setSelectedFinanceOption(value);
  };


  const handleOptionSelectInCarUse = (value: string) => {
    setSelectUseCar(value);
  };


  const handleOptionSelectInHowMuchAge = (value: string) => {
    setSelectAge(value);
  };

  const handleOptionSelectTraffic = (value: string) => {
    setselectTraffic(value)
  }

  const handleOptionSelectMartial = (value: string) => {
    setselectMartial(value)
  }

  const handleOptionSelectRegistered = (value: string) => {
    setselectRegistered(value)
  }

  const handleOptionSelectInsuranceYesNo = (value: string) => {
    setselectInsuraceYesno(value)
    //setShowSelectTraffic(true);
  }

  const handleOptionSelectClaim = (value: string) => {
    setselectselectClaim(value)
  }


  const handleOptionSelectPackage = (value: string) => {
    if (value === "Comprehensive") {
      setselectPackage(value);
      setshowThirdParty(false)
      setshowPackageType(true)
    } else if (value = "Third-Party") {
      setselectPackage(value)
      setshowThirdParty(true)
      setshowPackageType(false)
    }
    else {
      setshowPackageType(false)
      setshowThirdParty(false)
    }
  }
  useEffect(() => {
    if (addedCars.length > 0 && addedCarsRef.current) {
      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addedCars, addedDrivers, financeConfirmed, showVinNumber, showCarRunMiles,
    showBHD, showYesNo, showHowYoung, trafficYesNo, showMartial, showRegisterd, showInsurenceYesNo,
    showClaim, confirmselectSound, comminicationFormData,selectedPackage
  ]);

  let activeHeader = MultiFormheader[0];
  if (showInsurancePackage) {
    activeHeader = MultiFormheader[15];
  } else if (showContectInfo) {
    activeHeader = MultiFormheader[14];
  } else if (showSoundsGood) {
    activeHeader = MultiFormheader[13];
  } else if (showConfirmselectClaim) {
    activeHeader = MultiFormheader[12];
  } else if (showConfirmselectInsuranceYesno) {
    activeHeader = MultiFormheader[11];
  } else if (showSelectRegistered) {
    activeHeader = MultiFormheader[10];
  } else if (showMartialStatus) {
    activeHeader = MultiFormheader[9];
  } else if (trafficYesNo) {
    activeHeader = MultiFormheader[8];
  } else if (showHowYoung) {
    activeHeader = MultiFormheader[7];
  } else if (showUseCar) {
    activeHeader = MultiFormheader[6];
  } else if (showBHD) {
    activeHeader = MultiFormheader[5];
  } else if (carMiles) {
    activeHeader = MultiFormheader[4];
  } else if (showVinNumber) {
    activeHeader = MultiFormheader[3];
  } else if (showFinance) {
    activeHeader = MultiFormheader[2];
  } else if (carConfirmed) {
    activeHeader = MultiFormheader[1];
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)]   overflow-hidden scrollbar-hide">
      <div className='fixed w-full bg-[#d3f0ff] sm:bg-transparent xl:bg-transparent lg:bg-transparent'>
        <MultiformHeader />
      </div>
      <div className=''>
        <div className="w-full max-w-7xl mx-auto px-3 md:px-10 sm:px-10 lg:px-10 xl:px-10 ">
          {/* here all data showing after added */}
          <div className='flex justify-center flex-col sm:items-center md:items-center lg:items-center xl:items-center items-start cursor-pointer
           mt-30 sm:mt-10 md:mt-10 lg:mt-20 xl:mt-20 lg:mb-25 sm:mb-25 xl:mb-25 mb-0 gap-10'>
            {addedCars.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[0]?.heading} />
                {addedCars.slice(0, 1).map((entry, index) => (
                  <div key={index} className="transition-all duration-700 transform">
                    <div className='flex items-center gap-2'>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {Object.values(entry).filter(Boolean).join(" ")}
                      </h3>
                      <BiPencil onClick={() => setShowForm(true)} className='mt-1' />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {addedDrivers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[1]?.heading} />
                {addedDrivers.slice(0, 1).map((entry, index) => (
                  <div key={index} className="transition-all duration-700 transform">
                    <div className='flex items-center gap-2'>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {Object.values(entry).filter(Boolean).join(" ")}
                      </h3>
                      <BiPencil className='mt-1' onClick={() => setShowDriverForm(true)} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {selectedFinanceOption && financeConfirmed && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[2]?.heading} />
                <div className='flex items-center gap-2'>
                  <h3 className="text-lg font-semibold text-gray-700">{selectedFinanceOption}</h3>
                  <BiPencil className='mt-1' />
                </div>
              </div>
            )}

            {addedVinNumber && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[3]?.heading} />
                <div className='flex items-center gap-2'>
                  <h3 className="text-lg font-semibold text-gray-700">{addedVinNumber}</h3>
                  <BiPencil className='mt-1' />
                </div>
              </div>
            )}

            {addedCarMiles !== null && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[4]?.heading} />
                <div className='flex items-center gap-2'>
                  <h3 className="text-lg font-semibold text-gray-700">{addedCarMiles.toLocaleString()} miles/year</h3>
                  <BiPencil className='mt-1' />
                </div>

              </div>
            )}

            {addedBhdValue !== null && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[5]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{addedBhdValue.toLocaleString()} BHD</h3>
                  <BiPencil className='mt-1' />
                </div>
              </div>
            )}


            {useCarYesNoConfermed && selectUseCar && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[6]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectUseCar}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {ageConfermed && selectAge && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[7]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectAge}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectTraffic && selectTraffic && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[8]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectTraffic}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectMartial && selectMartial && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[9]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectMartial}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectRegistered && selectRegistered && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[10]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectRegistered}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectInsuranceYesno && selectInsuraceYesno && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[11]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectInsuraceYesno}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectClaim && selectClaim && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[12]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{selectClaim}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {confirmselectSound && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[13]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">{soundsGoodvalue}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </div>
            )}

            {
              comminicationFormData && (
                <div ref={addedCarsRef} className="ml-10 space-y-2">
                  <MultiformHeading color="#8b8b8b" heading={MultiFormheader[14]?.heading} />
                  <div className="flex flex-col items-start gap-2">
                    <div className='flex items-center gap-2'>
                      <span className='text-gray-500 '>Country</span>
                      <h3 className="text-lg font-semibold text-gray-700">{communicationData.country}</h3> <BiPencil className="mt-1" />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-gray-500 '>Email</span>
                      <h3 className="text-lg font-semibold text-gray-700">{communicationData.email}</h3>  <BiPencil className="mt-1" />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-gray-500 '>Phone</span>
                      <h3 className="text-lg font-semibold text-gray-700">{communicationData.phone}</h3>  <BiPencil className="mt-1" />

                    </div>
                  </div>
                </div>
              )
            }

             {selectedPackage && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading="Selected Package" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {selectedPackage.packageName}
                  </h3>
                  <BiPencil className="mt-1 cursor-pointer" onClick={() => {
                    // Allow editing or reselecting the package
                    setshowPackages(true);
                    setPersonalDetails(false);
                  }} />
                </div>
              </div>
            )}


          </div>


          {/* this is main part */}
          <div className="flex flex-col xl:flex-row gap-5 w-full  scrollbar-hide " style={{ height: '80vh' }}>
            <aside className="w-full xl:w-1/4 hidden md:block mt-14">
              <SidebarSteps />
            </aside>

            <main className="w-full xl:w-3/4 space-y-6 ">
              {/* this is heading */}
              <div className='flex flex-col items-start sm:items-center xl:items-center sm:flex-row sm:flex md:flex lg:flex xl:flex mt-14 gap-5 sm:gap-0 lg:gap-0 xl:gap-0'>
                <div className=''>
                  <Image
                    src={image || "/default-avatar.png"}
                    alt="heading image"
                    width={55}
                    height={55}
                    className="rounded-full object-cover h-auto border-2 border-white shadow"
                  />
                </div>
                <div className='ml-4 w-[100%]  sm:w-[42%] xl:w-[42%] md:w-[42%] lg:w-[42%]'>
                  <MultiformHeading heading={activeHeader.heading} />
                </div>
              </div>

              {/* this is for car */}
              <>
                {!showForm && addedCars.length === 0 && !carConfirmed && (
                  <div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10 ml-0">
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

                {/* {showForm && (
                  <div className="mt-6">
                    <CarStepForm
                      onCancel={() => setShowForm(false)}
                      onComplete={handleCarFormComplete}
                    />
                  </div>
                )} */}


                {showForm && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <CarStepForm
                      onCancel={() => setShowForm(false)}
                      onComplete={handleCarFormComplete}
                    />
                  </motion.div>
                )}

              </>


              {/* this is for driver */}
              <>
                {showDriverForm && !driverConfirmed && (
                  <motion.div className="ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10 mt-2"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <DriverStepForm
                      onCancel={() => setShowDriverForm(false)}
                      onComplete={handleDriverFormComplete}
                    />
                  </motion.div>
                )}
                {!showDriverForm && carConfirmed && !driverConfirmed && (
                  <motion.div className="flex flex-col gap-4 w-full sm:w-3/4 md:w-2/3 lg:w-3/5 xl:w-1/2 ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <AddDriverCard
                      onClick={() => setShowDriverForm(true)}
                      onComplete={handleDriverFormComplete}
                    />
                  </motion.div>
                )}

                {driverConfirmed && !financeConfirmed && (
                  <motion.div className="ml-0 sm:ml-10 "
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <MultiOption data={finance} onSelect={handleOptionSelectInFinanace} />
                    <NextBtn
                      disabled={selectedFinanceOption === null}
                      onClick={handleFinanceOnNext}
                      label="Next →"
                    />
                  </motion.div>
                )}
              </>

              {/* this is vin number */}
              <>
                {financeConfirmed && showVinNumber && (
                  <motion.div className="ml-0 sm:ml-10 md:ml-10 lg:ml-10 xl:ml-10  mt-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Vinnumber
                      data={[]}
                      onSelect={handleVinNumberChange}
                      onNextClick={handleVinNumberComplete}
                    />
                    <NextButton
                      disabled={!vinnumber}

                      onClick={() => {

                        handleVinNumberComplete();

                        if (addedCarsRef.current) {
                          addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                    />
                  </motion.div>
                )}
              </>

              {/* this is car miles */}
              <>
                {showCarRunMiles && (
                  <motion.div className="ml-0 sm:ml-10 lg:ml-10 xl:ml-10 mt-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
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
                  </motion.div>
                )}
              </>

              {/* this is  bhd compo*/}
              <>
                {showBHD && (
                  <motion.div className="ml-0 sm:ml-10 xl:ml-10 md:ml-10 mt-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <BHDComponent
                      max={20000}
                      unitLabel="BHD"
                      defaultValue={5500}
                      onSelect={handleBHDComponent}
                    />
                    <NextBtn
                      disabled={carMiles === null}
                      onClick={handleBHDComplete}
                      label="Next →"
                    />
                  </motion.div>
                )}

              </>

              {/* this is all multi option */}
              <>
                {addedBhdValue !== null && showYesNo && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={yesNoData}
                      onSelect={handleOptionSelectInCarUse}
                    />
                    <NextBtn
                      disabled={selectUseCar === null}
                      onClick={() => {
                        setShowYesNo(false);
                        setShowHowYoung(true);
                        setUseCarYesNoConfermed(true);
                      }}
                      label="Next →"
                    />
                  </div>
                )}

                {showHowYoung && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={HowYoungData}
                      onSelect={handleOptionSelectInHowMuchAge}
                    />
                    <NextBtn
                      disabled={selectAge === null}
                      onClick={() => {
                        setAgeConformed(true);
                        setShowHowYoung(false);
                        setTrafficYesNo(true)
                      }}
                      label="Next →"
                    />
                  </div>
                )}


                {trafficYesNo && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={TraffficyesNoData}
                      onSelect={handleOptionSelectTraffic}
                    />
                    <NextBtn
                      disabled={selectTraffic === null}
                      onClick={() => {
                        setconfirmselectTraffic(true);
                        setMartial(true)
                        setTrafficYesNo(false)
                        setShowMartialStatus(true);
                      }}
                      label="Next →"
                    />
                  </div>
                )}


                {showMartial && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={MartialStatus}
                      onSelect={handleOptionSelectMartial}
                    />
                    <NextBtn
                      disabled={selectMartial === null}
                      onClick={() => {
                        setconfirmselectMartial(true)
                        setTrafficYesNo(false)
                        setshowRegisterd(true)
                        setMartial(false)
                        setShowSelectRegistered(true)
                        setShowMartialStatus(false);
                      }}
                      label="Next →"
                    />
                  </div>
                )}

                {showRegisterd && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={RegisteredData}
                      onSelect={handleOptionSelectRegistered}
                    />
                    <NextBtn
                      disabled={selectRegistered === null}
                      onClick={() => {
                        setTrafficYesNo(false)
                        setconfirmselectRegistered(true)
                        setShowYesNo(false)
                        setshowRegisterd(false)
                        setshowInsurenceYesNo(true)
                        setShowSelectRegistered(false)
                        setShowConfirmselectInsuranceYesno(true)
                      }}
                      label="Next →"
                    />
                  </div>
                )}


                {showInsurenceYesNo && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={InsuranceYesNoData}
                      onSelect={handleOptionSelectInsuranceYesNo}
                    />
                    <NextBtn
                      disabled={selectInsuraceYesno === null}
                      onClick={() => {
                        setTrafficYesNo(false)
                        setconfirmselectInsuranceYesno(true)
                        setshowshowClaim(true)
                        setshowInsurenceYesNo(false)
                        setShowConfirmselectClaim(true)
                      }}
                      label="Next →"
                    />
                  </div>
                )}


                {showClaim && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption
                      data={ClaimYesNoData}
                      onSelect={handleOptionSelectClaim}
                    />
                    <NextBtn
                      disabled={selectClaim === null}
                      onClick={() => {
                        setTrafficYesNo(false)
                        setconfirmselectInsuranceYesno(false)
                        setconfirmselectClaim(true)
                        setShowSoundGood(true)
                        setshowshowClaim(false)
                        setshowSoundsGood(true)
                      }}
                      label="Next →"
                    />
                  </div>
                )}
              </>

              {/* sounds good */}
              <>
                {
                  showSoundGood && (
                    <div className='mt-14 ml-18'>
                      <button
                        onClick={() => {
                          setsoundsGoodvalue("sounds good");
                          setconfirmselectSound(true)
                          setShowSoundGood(false)
                          setshowCommunication(true)
                          setShowContectInfo(true);
                        }
                        }

                        className='btn py-2.5 px-2.5 rounded text-[#fff] font-[10px] bg-[#0067a1]'
                      >
                        Sounds good
                      </button>
                    </div>
                  )
                }

              </>


              {/*communication form */}
              <>
                {/* Show Communication Form ONLY when not showing packages or personal details */}
                {showCommunication && !showPackages && !showPersonalDetails && (
                  <div>
                    <CommunicationForm
                      country={communicationData.country}
                      phone={communicationData.phone}
                      email={communicationData.email}
                      onChange={handleCommunicationChange}
                    />
                    <NextBtn
                      disabled={
                        !communicationData.country?.trim() ||
                        !communicationData.phone?.trim() ||
                        !communicationData.email?.trim()
                      }
                      onClick={() => {
                        const combined = `${communicationData.country} ${communicationData.phone} ${communicationData.email}`;
                        setcomminicationFormData(combined);
                        setshowPackages(true);
                        setshowCommunication(false);
                      }}
                      label="Next →"
                    />
                  </div>
                )}

                {/* Show Package Step ONLY when not showing personal details */}
                {showPackages && !showPersonalDetails && (
                  <div className="ml-0 sm:ml-10 xl:ml-10 lg:ml-10 md:ml-10">
                    <MultiOption
                      data={packagesData}
                      onSelect={handleOptionSelectPackage}
                    />

                    {showPackageType && (
                      <Packages
                        onSelect={(pkg) => {
                          setSelectedPackage(pkg);
                          setPersonalDetails(true);
                        }}
                      />
                    )}

                    {showThirdParty && <ThirdPartyPackage />}

                    <NextBtn
                      disabled={!selectedPackage}
                      onClick={() => {
                        setPersonalDetails(true);
                        setshowPackageType(false);
                        setshowThirdParty(false);
                        setshowCommunication(false);
                        setshowPackages(false);
                      }}
                      label="Next →"
                    />
                  </div>
                )}

                {/* Show Personal Details Step */}
                {showPersonalDetails && (
                  <PersonalDetails
                    nationality={personalData.nationality}
                    nationalId={personalData.nationalId}
                    numberPlate={personalData.numberPlate}
                    onChange={handlePersonalDataChange}

                  />
                )}
         
              </>
            </main>
          </div>
        </div>
      </div>

    </div>
  );
}