'use client';
import Image from 'next/image';
import AddCarCard from "@/components/cars/AddCar";
import SidebarSteps from "@/components/Sidebar";
import { useState, useRef, useEffect } from "react";
import MultiformHeader from "@/components/MultiformHeader";
import MultiformHeading from "@/components/cars/MultiformHeading";
import { MultiFormheader } from "@/data/multiformheading";
import CarStepForm from "@/components/cars/CarStepForm";
import * as Yup from 'yup';
import {
  finance, HowYoungData, packagesData,
  RegisteredData,
} from '@/data/multiOptionsData';
import MultiOption from '@/components/ui/MultiOption';
import NextButton from '@/components/ui/NextBtn';
import { BiPencil } from 'react-icons/bi';
import NextBtn from "@/components/ui/NextBtn";
import { motion } from 'framer-motion';
import Packages, { PackageType } from '@/components/packages/Packages';
import ThirdPartyPackage from '@/components/packages/ThirdPartyPackage';
import PersonalDetails from '@/components/form/PersonalDetails';
import CprForm from '@/components/form/CprForm';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Input from '@/components/ui/Input';
import OtpValidation, { OtpValidationHandle } from '@/components/auth/OtpValidation';
import BankList from '@/components/banklist/BankList';
import Price from '@/components/price/Price';
import AddOns from '@/components/AddOns/AddOns';
import Vinnumber from '@/components/VinNumber/vinnumber';
// import { useInView } from 'react-intersection-observer';

export default function MultipleFormPage() {

  const [showForm, setShowForm] = useState(false);
  const [addedCars, setAddedCars] = useState<{ [key: string]: string }[]>([]);
  const [carConfirmed, setCarConfirmed] = useState(false);
  const [financeConfirmed, setFinanceConfirmed] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showCarValue, setshowCarValue] = useState(false);
  const [vinNumberConfirm, setVinnumberconfirm] = useState(false);
  const [selectedFinanceOption, setSelectedFinanceOption] = useState<string | null>(null);
  const [showUseCar, setShowUseCar] = useState(false)
  const [selectAge, setSelectAge] = useState<string | null>(null);
  const [ageConfermed, setAgeConformed] = useState(false)
  const [selectRegistered, setselectRegistered] = useState<string | null>(null);
  const [confirmselectRegistered, setconfirmselectRegistered] = useState(false);
  const [showSelectRegistered, setShowSelectRegistered] = useState(false);
  const [addedVinNumber, setAddedVinNumber] = useState<string | null>(null);
  const [showHowYoung, setShowHowYoung] = useState(false);
  const [showRegisterd, setshowRegisterd] = useState(false);
  const [showInsurenceYesNo, setshowInsurenceYesNo] = useState(false);
  const [showContectInfo, setShowContectInfo] = useState(false);
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
  const [showPersonalSummary, setShowPersonalSummary] = useState(false);
  const [showFileStatus, setShowFileStatus] = useState(false);
  const [vinNumber, setVinNumber] = useState('');
  const [showVinData, setShowVinData] = useState(false);

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
  const { image } = MultiFormheader[0];

  const addedCarsRef = useRef<HTMLDivElement | null>(null);

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
      vinNumber: '',
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
  };

  const [personalData, setpersonalData] = useState({
    nationalId: '',
    numberPlate: '',
    selectedPackage: selectedPackage?.packageName
  });

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

  const handleOptionSelectRegistered = (value: string) => {
    setselectRegistered(value)
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
  }, [addedCars, financeConfirmed, showCarValue,
    showHowYoung, showRegisterd,
    showInsurenceYesNo, selectedPackage,
    OtpformData, personalData, showPriceSelected,
    showPersonalSummary, showFileStatus
  ]);

  const canGoNext = Boolean(vinNumber?.trim());
  let activeHeader = MultiFormheader[0];
  if (showPersonalDetails) {
    activeHeader = MultiFormheader[16];
  } else if (showInsurancePackage) {
    activeHeader = MultiFormheader[15];
  } else if (showContectInfo) {
    activeHeader = MultiFormheader[14];
  } else if (showContectInfo) {
    activeHeader = MultiFormheader[13];
  } else if (showBankList) {
    activeHeader = MultiFormheader[12];
  } else if (showCPR) {
    activeHeader = MultiFormheader[11];
  } else if (showSelectRegistered) {
    activeHeader = MultiFormheader[10];
  } else if (showCPR) {
    activeHeader = MultiFormheader[9];
  } else if (showFinance) {
    activeHeader = MultiFormheader[8];
  } else if (showHowYoung) {
    activeHeader = MultiFormheader[7];
  } else if (showUseCar) {
    activeHeader = MultiFormheader[6];
  } else if (showAddOns) {
    activeHeader = MultiFormheader[5];
  } else if (showAddOns) {
    activeHeader = MultiFormheader[4];
  } else if (showCarValue) {
    activeHeader = MultiFormheader[3];
  } else if (showFinance) {
    activeHeader = MultiFormheader[2];
  } else if (showFinance) {
    activeHeader = MultiFormheader[1];
  }

  // Which section is being edited
  type EditTarget =
    | 'car'
    | 'finance'
    | 'carValue'
    | 'miles'
    | 'bhd'
    | 'registered'
    | 'bank'
    | 'packages'
    | 'personal'
    | 'price'
    | 'cpr'
    | 'vin';

  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<EditTarget | null>(null);

  const openEditConfirm = (target: EditTarget) => {
    setPendingTarget(target);
    setConfirmOpen(true);
  };

  const cancelEdit = () => {
    setPendingTarget(null);
    setConfirmOpen(false);
  };

  // Hide all step UIs; we’ll enable just one after confirm
  const resetAllSteps = () => {
    setShowForm(false);
    setShowFinance(false);
    setshowCarValue(false);
    setshowRegisterd(false);
    setShowBankList(false);
    setshowPackages(false);
    setshowPackageType(false);
    setshowThirdParty(false);
    setPersonalDetails(false);
    setShowCPR(false);
    setShowOtpValidation(false);
    setShowPrice(false);
    setshowAddOns(false);
    setShowVinNumber(false);
  };

  const enterEdit = (target: EditTarget) => {
    resetAllSteps();
    setEditTarget(target);
    switch (target) {
      case 'car': setShowForm(true); break;
      case 'finance': setShowFinance(true); break;
      case 'carValue': setshowCarValue(true); break;
      case 'registered': setshowRegisterd(true); break;
      case 'bank': setShowBankList(true); break;
      case 'packages': setshowPackages(true); break;
      case 'personal': setPersonalDetails(true); break;
      case 'price': setShowPrice(true); break;
      case 'cpr': setShowCPR(true); break;
      case 'vin': setShowVinNumber(true); break;
    }
  };

  const confirmEdit = () => {
    if (pendingTarget) enterEdit(pendingTarget);
    setPendingTarget(null);
    setConfirmOpen(false);
  };

  const exitEdit = () => {
    setEditTarget(null);
    resetAllSteps();
  };

  useEffect(() => {
    setTimeout(() => {
      setPriceBHD(12.345);
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] overflow-hidden scrollbar-hide">
      <div className='fixed w-full bg-transparent sm:bg-transparent xl:bg-transparent lg:bg-transparent'>
        <MultiformHeader />
      </div>
      <div className=''>
        <div className="w-full max-w-7xl mx-auto px-3 md:px-10 sm:px-10 lg:px-10 xl:px-10 ">
          {/* here all data showing after added */}
          <div className='flex justify-center flex-col  sm:items-center md:items-center lg:items-center xl:items-center items-start cursor-pointer
            mt-30 sm:mt-10 md:mt-10 lg:mt-28 xl:mt-14 lg:mb-2  sm:mb-0 xl:mb-0 mb-0 gap-10 ml-6 xl:ml-22 xl:justify-end' >
            {addedCars.length > 0 && (
              <motion.div
                ref={addedCarsRef}
                className="ml-10 space-y-2 h-[100px]  flex justify-center items-start flex-col"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
              >
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[0]?.heading} />
                {addedCars.slice(0, 1).map((entry, index) => (
                  <div key={index} className="transition-all duration-700 transform">
                    <motion.div
                      initial={{ opacity: 0, y: '100%' }}
                      animate={{ opacity: 1, y: '0%' }}
                      exit={{ opacity: 0, y: '100%' }}
                      transition={{
                        duration: 0.9,
                        ease: 'easeOut',
                      }}
                    >
                      <div className='flex items-center gap-2'>
                        <h3 className="text-lg font-medium text-gray-900">
                          {Object.values(entry).filter(Boolean).join(" ")}
                        </h3>
                        <BiPencil onClick={() => openEditConfirm('car')} className='mt-1' />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            )}

            {selectedFinanceOption && financeConfirmed && (
              <motion.div
                ref={addedCarsRef}
                className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
              >
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[2]?.heading} />
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '0%' }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <h3 className="text-lg font-medium text-gray-700">
                      {selectedFinanceOption}
                    </h3>
                    <BiPencil onClick={() => openEditConfirm('finance')} className='mt-1' />
                  </div>
                </motion.div>
              </motion.div>
            )}


            {selectedBank && !showBankList && (
              <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
                ref={addedCarsRef} className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col">
                <MultiformHeading color="#8b8b8b" heading="Selected Bank is" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {selectedBank}
                  </h3>
                  <BiPencil onClick={() => openEditConfirm('bank')} className='mt-1' />
                </div>
              </motion.div>
            )}


            {showCarValueSummary && !showCarValue && (
              <motion.div
                ref={addedCarsRef}
                className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col"
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
              >
                <MultiformHeading color="#8b8b8b" heading="Car Value" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {formattedCarValue || addedCarValue}
                  </h3>
                  <BiPencil onClick={() => openEditConfirm('carValue')} className="mt-1 cursor-pointer" />
                </div>
              </motion.div>
            )}

            {ageConfermed && selectAge && (
              <motion.div initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }}
                ref={addedCarsRef} className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col">
                <MultiformHeading color="#8b8b8b" heading={MultiFormheader[7]?.heading} />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-700">{selectAge}</h3>
                  <BiPencil className="mt-1" />
                </div>
              </motion.div>
            )}

            {OtpformData && (
              <motion.div initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }} ref={addedCarsRef} className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col">
                <MultiformHeading color="#8b8b8b" heading="Selected Package" />
                <div className="flex items-center gap-2">
                  <div className='flex gap-2 items-center font-medium'>
                    <p><>Country:</> {OtpformData.country}</p>
                    <p><>Phone:</> {OtpformData.phone}</p>
                    <p><>Name:</> {OtpformData.name}</p>
                    <p><>Email:</> {OtpformData.email}</p>
                  </div>

                  <div>
                    <BiPencil />
                  </div>
                </div>
              </motion.div>
            )}

            {/* added price */}
            <div ref={addedCarsRef}>
              {showPriceSelected && priceBHD !== null && (
                <motion.div
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '60%' }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: 'easeOut',
                  }} ref={addedCarsRef} className="ml-10 space-y-2 h-[100px] flex justify-center items-start flex-col">
                  <MultiformHeading color="#8b8b8b" heading="Selected Price" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-700">
                      {priceBHD.toFixed(3)} BHD
                    </h3>
                    <BiPencil className="mt-1" />
                  </div>
                </motion.div>
              )}
            </div>

            {selectedPackage && (
              <motion.div initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '60%' }}
                exit={{ opacity: 0, y: '100%' }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: 'easeOut',
                }} ref={addedCarsRef} className="ml-10 space-y-2">
                <MultiformHeading color="#8b8b8b" heading="Selected Package" />
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {selectedPackage.packageName}
                  </h3>
                  <div>
                    <BiPencil onClick={() => openEditConfirm('packages')} />
                  </div>
                </div>
              </motion.div>
            )}

            <div >
              {showPersonalSummary && (
                <motion.div ref={addedCarsRef} initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '60%' }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: 'easeOut',
                  }} className="ml-10 space-y-2">
                  <MultiformHeading color="#8b8b8b" heading="Personal Details" />
                  <div className="flex items-center gap-4 font-medium text-lg font-medium text-gray-700">
                    <p>National ID: {personalData.nationalId}</p>
                    <p>Plate Number: {personalData.numberPlate}</p>
                    <div>
                      <BiPencil onClick={() => openEditConfirm('personal')} />
                    </div>
                  </div>
                </motion.div>
              )}

            </div>

            {/* national id */}
            <div>
              {showFileStatus && (
                <motion.div
                  ref={addedCarsRef}
                  initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '60%' }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: 'easeOut',
                  }}
                  className="ml-10 space-y-2"
                >
                  <MultiformHeading color="#8b8b8b" heading="All Documents" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 font-medium text-lg text-gray-700">
                      <p>National ID: {fileUploaded.nationalId ? 'Uploaded' : 'Not Uploaded'}</p>
                      <p>Driver License: {fileUploaded.driverLicense ? 'Uploaded' : 'Not Uploaded'}</p>
                      <p>Ownership Card: {fileUploaded.ownershipCard ? 'Uploaded' : 'Not Uploaded'}</p>
                      {/* <div>
                        <BiPencil onClick={() => openEditConfirm('files')} className="cursor-pointer" />
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>


            {/* vin number */}
            <div>
              {showVinData && (
                <motion.div ref={addedCarsRef} initial={{ opacity: 0, y: '100%' }}
                  animate={{ opacity: 1, y: '60%' }}
                  exit={{ opacity: 0, y: '100%' }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: 'easeOut',
                  }} className="ml-10 h-[100px] space-y-2">
                  <MultiformHeading color="#8b8b8b" heading="Vin number is:" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-700">
                      {vinNumber || 'Not Entered'}
                    </h3>
                    <BiPencil onClick={() => openEditConfirm('vin')} className="mt-1" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* this is main part */}
          <div id='main-part'
            className="flex flex-col md:flex-row lg:flex-row xl:flex-row  w-full h-[91vh] 
           sm:h-[81vh] md:h-[81vh] lg:h-[81vh] xl:h-[81vh] 2xl:h-[81vh] overflow-auto scrollbar-hide "
          >
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

                    <AddCarCard
                      onClick={() => setShowForm(true)}
                      onComplete={handleCarFormComplete}
                    />

                  </div>
                )}

                {showForm && (
                  <motion.div
                    className="mt-6 "
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
                        setShowOtpValidation(true)
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
                        setconfirmselectRegistered(true)
                        setshowRegisterd(false)
                        setshowInsurenceYesNo(true)
                        setShowSelectRegistered(false)
                      }}
                      label="Next →"
                    />
                  </div>
                )}
              </>

              <>
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
                        setShowPersonalSummary(true);
                        setPersonalDetails(false);
                        setshowPackageType(false);
                        setshowThirdParty(false);
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
                    disabled={fileUploaded === null || !fileUploaded.nationalId || !fileUploaded.driverLicense || !fileUploaded.ownershipCard}
                    onClick={() => {
                      setPersonalDetails(false);
                      setshowPackageType(false);
                      setshowThirdParty(false);
                      setshowPackages(false);
                      setShowCPR(false);
                      setShowVinNumber(true);
                      setShowFileStatus(true);
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
                      disabled={!canGoNext}
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
                    <Vinnumber
                      vinnumber={vinNumber}
                      onChange={setVinNumber} />

                    <NextBtn
                      disabled={!vinNumber.trim()}
                      onClick={() => {
                        setShowVinNumber(false)
                        setshowAddOns(true)
                        setshowAddOns(true);
                        setShowVinData(true);
                        setAddedVinNumber(vinNumber)
                      }}
                    />
                  </>
                )
              }

            </main>
          </div>
        </div>
      </div>
      {/* popup for confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
            <h3 className="text-lg font-semibold">Edit this section?</h3>
            <p className="text-gray-600 mt-1">
              You’re about to jump back to this step to make changes.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#0067a1] text-white hover:bg-[#005780]"
                onClick={confirmEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}