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
import * as Yup from 'yup';
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
import { motion } from 'framer-motion';
import CommunicationForm from '@/components/form/CommunicationForm';
// import PackageType from '@/components/packages/Packages';
import Packages, { PackageType } from '@/components/packages/Packages';
import ThirdPartyPackage from '@/components/packages/ThirdPartyPackage';
import PersonalDetails from '@/components/form/PersonalDetails';
import CprForm from '@/components/form/CprForm';
import { useRouter } from 'next/navigation';
import { FormikValues, useFormik } from 'formik';
import Input from '@/components/ui/Input';
import OtpValidation, { OtpValidationHandle } from '@/components/auth/OtpValidation';
import BankList from '@/components/banklist/BankList';
import Price from '@/components/price/Price';
import AddOns from '@/components/AddOns/AddOns';
import Vinnumber from '@/components/VinNumber/vinnumber';

export default function MultipleFormPage() {
  const [cars, setCars] = useState([
    { name: "Toyota", selected: false },
    { name: "Hyundai", selected: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [addedCars, setAddedCars] = useState<{ [key: string]: string }[]>([]);
  const [carConfirmed, setCarConfirmed] = useState(false);
  const [financeConfirmed, setFinanceConfirmed] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showCarValue, setshowCarValue] = useState(false);
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
  const [addedVinNumber, setAddedVinNumber] = useState<string | null>(null);
  const [addedCarMiles, setAddedCarMiles] = useState<number | null>(null);
  const [addedBhdValue, setAddedBhdValue] = useState<number | null>(null);

  const [carMiles, setCarMiles] = useState<number | null>(null);
  const [showCarRunMiles, setShowCarRunMiles] = useState(false);
  const [isCarMilesSelected, setIsCarMilesSelected] = useState(false);

  const [showBHD, setShowBHD] = useState(false);
  const [showYesNo, setShowYesNo] = useState(false);
  const [isBHDSelected, setIsBHDSelected] = useState(false);
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
  const [showCPR, setShowCPR] = useState(false);
  const [showAddOns, setshowAddOns] = useState(false);
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [showBankList, setShowBankList] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showCarValueSummary, setShowCarValueSummary] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [addedCarValue, setAddedCarValue] = useState<string | null>(null);
  const [OtpformData, setOtpFormData] = useState<any>(null);
  const [showVinNumber, setShowVinNumber] = useState(false);
  const [showPriceSelected, setShowPriceSelected] = useState(false);
  const [priceBHD, setPriceBHD] = useState<number | null>(null);
  const otpRef = useRef<OtpValidationHandle>(null);

  const handleFormSubmit = (data: { country: string, phone: string, name: string, email: string, otp: string }) => {
    setOtpFormData(data);
  };

  const handleOtpData = (data: {
    country: string;
    phone: string;
    name: string;
    email: string;
    otp: string;
  }) => {
    setOtpFormData(data);
  };

  const formattedCarValue =
    addedCarValue
      ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(addedCarValue))
      : "";
  const router = useRouter();

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
    setShowFinance(true);
    setShowForm(false);
    setTimeout(() => {
      setCarConfirmed(true);

    }, 500);
  };

  const formik = useFormik({
    initialValues: {
      carValue: '',
    },
    validationSchema: Yup.object({

      carValue: Yup.string()
        .required('Car value is required')
        .matches(/^\d+$/, 'Car value must be a valid number'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted:', values);
    },
  });

  const toNumber = (val: unknown) => {
    if (val == null) return null;
    const s = String(val).replace(/[^\d.]/g, "");
    if (s === "" || s === ".") return null;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
  };

  const handleVinNumberComplete = () => {
    const value = formik.values.carValue?.trim();
    if (!value) return;
    const raw = formik.values.carValue;
    const n = toNumber(raw);
    if (n == null) return;

    setAddedCarValue(String(n));
    setShowCarValueSummary(true);
    setShowHowYoung(true)
    setVinnumberconfirm(false);
    setshowCarValue(false);
    const vin = formik.values.carValue?.trim();
    if (!vin) return;
    setAddedVinNumber(vin);

    console.log("Vin Number completed: ", vin);


    console.log("Transitioning to Car Run Miles...");
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
    selectedPackage: selectedPackage?.packageName
  });

  const handleCommunicationChange = (field: string, value: string) => {
    setCommunicationData(prev => ({ ...prev, [field]: value }));
  };

  const handlePersonalDataChange = (field: string, value: string) => {
    setpersonalData(prev => ({ ...prev, [field]: value }));
  };

  const handleFinanceOnNext = () => {
    setFinanceConfirmed(true);
    setshowCarValue(true)
    if (selectedFinanceOption === 'Mortgage') {
      setShowBankList(true);
      setShowFinance(false);
      setshowCarValue(false);
      setshowCarValue(false);
    } else {
      setShowFinance(false);
    }
  };

  const handleOptionSelectInFinanace = (value: string) => {
    setSelectedFinanceOption(value);
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
      setshowThirdParty(false);
      setshowPackageType(true);
    } else if (value === "Third-Party") {

      setselectPackage(value);
      setshowThirdParty(true);
      setshowPackageType(false);
    } else {
      setshowPackageType(false);
      setshowThirdParty(false);
    }
  };

  const [fileUploaded, setFileUploaded] = useState({
    nationalId: false,
    driverLicense: false,
    ownershipCard: false,
  });


  const handleFileStatusChange = (type: string, status: boolean) => {
    setFileUploaded((prev) => ({ ...prev, [type]: status }));
  };

  const handleBankSelect = (selectedBank: string) => {
    setSelectedBank(selectedBank);
    setShowBankList(false);
    setshowCarValue(true)
  };

  const handleBankClick = () => {
    setshowCarValue(true);
  };

  useEffect(() => {
    if (addedVinNumber && addedCarsRef.current) {
      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addedVinNumber]);


  useEffect(() => {
    if (addedCars.length > 0 && addedCarsRef.current) {
      addedCarsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [addedCars, financeConfirmed, showCarValue, showCarRunMiles,
    showBHD, showYesNo, showHowYoung, trafficYesNo, showMartial, showRegisterd,
    showInsurenceYesNo, showClaim, confirmselectSound, comminicationFormData, selectedPackage,
    OtpformData, personalData, showPriceSelected
  ]);

  let activeHeader = MultiFormheader[0];
  if (showPersonalDetails) {
    activeHeader = MultiFormheader[16];
  } else if (showInsurancePackage) {
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
  } else if (showCarValue) {
    activeHeader = MultiFormheader[3];
  } else if (showFinance) {
    activeHeader = MultiFormheader[2];
  } else if (carConfirmed) {
    activeHeader = MultiFormheader[1];
  }

  useEffect(() => {
    setTimeout(() => {
      setPriceBHD(12.345);
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)]   overflow-hidden scrollbar-hide">
      <div className='fixed w-full bg-transparent sm:bg-transparent xl:bg-transparent lg:bg-transparent'>
        <MultiformHeader />
      </div>
      <div className=''>
        <div className="w-full max-w-7xl mx-auto px-3 md:px-10 sm:px-10 lg:px-10 xl:px-10 ">
          {/* here all data showing after added */}
          <div className='flex justify-center flex-col sm:items-center md:items-center lg:items-center xl:items-center items-start cursor-pointer
            mt-30 sm:mt-10 md:mt-10 lg:mt-20 xl:mt-20 lg:mb-25 sm:mb-25 xl:mb-20 mb-0 gap-10 ml-6'>
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


            {selectedBank && !showBankList && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading="Selected Bank is" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {selectedBank}
                  </h3>
                  <BiPencil className='mt-1' />
                </div>
              </div>
            )}


            {showCarValueSummary && !showCarValue && (
              <motion.div
                ref={addedCarsRef}
                className="ml-10 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <MultiformHeading color="#8b8b8b" heading="Car Value" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {formattedCarValue || addedCarValue}
                  </h3>
                  <BiPencil className="mt-1 cursor-pointer" />
                </div>
              </motion.div>
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

            {OtpformData && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading="Selected Package" />
                <div className="flex items-center gap-2">
                  <div className='flex gap-2 items-center'>
                    <p><>Country:</> {OtpformData.country}</p>
                    <p><>Phone:</> {OtpformData.phone}</p>
                    <p><>Name:</> {OtpformData.name}</p>
                    <p><>Email:</> {OtpformData.email}</p>
                  </div>

                  <div>
                    <BiPencil />
                  </div>
                </div>
              </div>
            )}
                   {/* added price */}
            <div ref={addedCarsRef}>
              {showPriceSelected && priceBHD !== null && (
                <div ref={addedCarsRef} className="ml-10 space-y-2">
                  <MultiformHeading color="#8b8b8b" heading="Selected Price" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {priceBHD.toFixed(3)} BHD
                    </h3>
                    <BiPencil className="mt-1" />
                  </div>
                </div>
              )}

            </div>

            {selectedPackage && (
              <div ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading="Selected Package" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {selectedPackage.packageName}
                  </h3>
                  <div>
                    <BiPencil />
                  </div>
                </div>
              </div>
            )}


            <div ref={addedCarsRef}>
              {personalData.nationalId && personalData.numberPlate && (
                <div className="ml-10 space-y-2">
                  <MultiformHeading color="#8b8b8b" heading="Personal Details" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      <>National ID:</> {personalData.nationalId}
                    </h3>
                    <div>
                      {/* <BiPencil onClick={() => setShowPersonalDetails(true)} /> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-700">
                      <>Plate Number:</> {personalData.numberPlate}
                    </h3>
                    <div>
                      {/* <BiPencil onClick={() => setShowPersonalDetails(true)} /> */}
                    </div>
                  </div>
                </div>
              )}
            </div>

     

            {/*    <div ref={addedCarsRef} className=''>
             <MultiformHeading color="#8b8b8b" heading="your document uploaded" /> */}
            {/* <div className=''>
                  {Object.values(fileUploaded).some((status) => status) && (
                    <div className='flex items-start justify-start flex-col'>
                      <h3 className="text-lg font-semibold text-gray-700">National ID: {fileUploaded.nationalId ? ' Uploaded' : 'Not Uploaded'}</h3>
                      <h3 className="text-lg font-semibold text-gray-700">Driver License: {fileUploaded.driverLicense ? ' Uploaded' : 'Not Uploaded'}</h3>
                      <h3 className="text-lg font-semibold text-gray-700">Ownership Card: {fileUploaded.ownershipCard ? ' Uploaded' : 'Not Uploaded'}</h3>
                    </div>
                  )}
            
                </div> 

            </div>*/}

          </div>

          {/* this is main part */}
          <div id='main-part' className="flex flex-col md:flex-row lg:flex-row xl:flex-row  w-full h-[91vh] sm:h-[81vh] md:h-[81vh] lg:h-[81vh] xl:h-[81vh] 2xl:h-[81vh] overflow-auto scrollbar-hide ">
            <aside className="w-full xl:w-1/4 lg:w-1/4 md:w-2/5 hidden md:block mt-14">
              <SidebarSteps />
            </aside>

            <main className="w-full xl:w-3/4 space-y-6 overflow-x-hidden">
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
                <div className='ml-0 sm:ml-4 md:ml-4 lg:ml-4 xl:ml-4 w-[100%]  sm:w-[42%] xl:w-[42%] md:w-[42%] lg:w-[42%]'>
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
                    {/* <NextButton
                        disabled={!cars.some((car) => car.selected)}
                        onClick={() => { }}
                      /> */}
                  </div>
                )}

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


              {/* this is vin number */}
              <>
                {showCarValue && (
                  <motion.div>
                    <Input
                      value={formik.values.carValue}
                      onChange={formik.handleChange}
                      name="carValue"
                      placeholder="Enter your car value"
                      formik={formik}

                    />

                    <NextButton
                      disabled={!formik.values.carValue}
                      onClick={handleVinNumberComplete}
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
                      onSelect={(value, isUser) => {
                        handleCarMilesChange(value);
                        if (isUser) {
                          setIsCarMilesSelected(true);
                        }
                      }}

                    />
                    <NextBtn
                      // disabled={carMiles === null}
                      disabled={carMiles === null || !isCarMilesSelected}
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
                      // onSelect={handleBHDComponent}
                      onSelect={(value, isUser) => {
                        handleBHDComponent(value);
                        if (isUser) {
                          setIsBHDSelected(true);
                        }
                      }}
                    />
                    <NextBtn
                      disabled={carMiles === null || !isBHDSelected}
                      onClick={handleBHDComplete}
                      label="Next →"
                    />
                  </motion.div>
                )}

              </>

              <div>
                {/* Show finance options and Next button */}
                {showFinance && (
                  <div className="ml-0 sm:ml-10">
                    <MultiOption data={finance} onSelect={handleOptionSelectInFinanace} />
                    <NextBtn
                      disabled={!selectedFinanceOption}
                      onClick={handleFinanceOnNext}
                      label="Next →"
                    />
                  </div>
                )}

                {showBankList && (
                  <>
                    <BankList onBankSelect={handleBankSelect} />
                    <NextBtn
                      disabled={!selectedBank}
                      onClick={handleBankClick}
                      label="Next →"
                    />

                  </>
                )}
              </div>
              <>


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
                        setTrafficYesNo(false)
                        setShowOtpValidation(true)
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
                    <div className='ml-5 mt-5 sm:mt-14 sm:ml-18 md:mt-14 md:ml-18 lg:mt-14 lg:ml-18 xl:mt-14 xl:ml-18'>
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
                {showPackages && (
                  <div className="ml-0 sm:ml-10 xl:ml-10 lg:ml-10 md:ml-10">
                    <MultiOption
                      data={packagesData}
                      onSelect={handleOptionSelectPackage}
                    />

                    {showPackageType && (
                      <Packages onSelect={(pkg: PackageType) => {
                        setSelectedPackage(pkg);
                        setshowPackages(false);
                        setPersonalDetails(true);
                      }} />
                    )}

                    {showThirdParty && <ThirdPartyPackage onSelect={(pkg: PackageType) => {
                      setSelectedPackage(pkg);
                      setshowPackages(false);
                      setPersonalDetails(true);
                    }} />}


                  </div>
                )}

                {/* Show Personal Details Step */}
                {showPersonalDetails && (
                  <>
                    <PersonalDetails
                      nationalId={personalData.nationalId}
                      numberPlate={personalData.numberPlate}
                      onChange={handlePersonalDataChange}
                      selectedPackageName={selectedPackage?.packageName}
                    />

                    <NextBtn
                      disabled={!personalData.nationalId?.trim() || !personalData.numberPlate?.trim()}

                      onClick={() => {
                        setPersonalDetails(false);
                        setshowPackageType(false);
                        setshowThirdParty(false);
                        setshowCommunication(false);
                        setshowPackages(false);
                        setShowCPR(true)
                        setPersonalDetails(false)
                      }}
                      label="Next →"
                    />
                  </>
                )}

              </>

              {/* show cpr form */}
              {showCPR && (
                <>
                  <CprForm onFileStatusChange={handleFileStatusChange} />

                  <NextBtn
                    // disabled={fileUploaded === null || !fileUploaded.nationalId || !fileUploaded.driverLicense || !fileUploaded.ownershipCard}
                    disabled={fileUploaded === null}
                    onClick={() => {
                      setPersonalDetails(false);
                      setshowPackageType(false);
                      setshowThirdParty(false);
                      setshowCommunication(false);
                      setshowPackages(false);
                      setShowCPR(false);
                      setShowVinNumber(true)
                    }}
                    label="Next →"
                  />
                </>
              )}

              {/* OTP Validation */}
              {showOtpValidation && (

                <>
                  <OtpValidation ref={otpRef} onSubmitData={handleOtpData} />
                  <NextBtn
                    disabled={!showOtpValidation}
                    onClick={() => {
                      otpRef.current?.submit()
                      setShowOtpValidation(false);
                      handleFormSubmit
                      setShowPrice(true);
                    }}
                    label="Next →"
                  />
                </>
              )}

              {/* here is the price show */}
              {
                showPrice && (
                  <>
                    <Price
                      price={12.345}
                      onPriceSet={(price) => setPriceBHD(price)}
                    />
                    <NextBtn
                      disabled={!priceBHD}
                      onClick={() => {
                        setShowPrice(false);
                        setshowPackageType(true);
                        setshowPackages(true)
                        setShowPriceSelected(true);

                      }}
                      label="Next →"
                    />
                  </>
                )}

              {/* add ons */}
              {
                showAddOns && (
                  <>
                    <AddOns />
                    <NextBtn
                      disabled=""
                      onClick={() => {
                        setshowAddOns(false)
                        router.push('/payment')
                      }}
                    />
                  </>
                )
              }

              {
                showVinNumber && (
                  <>
                    <Vinnumber />

                    <NextBtn
                      onClick={() => {
                        setShowVinNumber(false)
                        setshowAddOns(true)
                      }}
                    />
                  </>
                )
              }

            </main>
          </div>
        </div>
      </div>

    </div>
  );
}