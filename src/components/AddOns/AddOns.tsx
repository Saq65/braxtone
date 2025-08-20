import { Button, Checkbox, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { CiCreditCard1 } from "react-icons/ci";
import { IoCheckmark, IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { MdOutlineArrowForwardIos } from "react-icons/md";

type PaymentProps = {
    selectedPackageName?: string;
};

interface Addon {
    addon: string;
    addon_ar: string;
    icon: string;
    minimumPrice: number;
    percentage: number;
    group: string;
}


const AddOns = ({ selectedPackageName }: PaymentProps) => {
    console.log("Payment - Selected Package Name:", selectedPackageName);
    const [openModel, setOpenModel] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [addonList, setAddonList] = useState<Addon[]>([]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const addonsFromUrl = query.get('addons');
        console.log("Decoded Addons from URL:", addonsFromUrl);

        if (addonsFromUrl) {
            try {
                const decodedAddons = decodeURIComponent(addonsFromUrl);
                const parsedAddons = JSON.parse(decodedAddons);

                if (parsedAddons && typeof parsedAddons === 'object') {
                    const addonsArray: Addon[] = Object.values(parsedAddons);
                    console.log("Parsed add-ons:", addonsArray);
                    setAddonList(addonsArray);
                } else {
                    console.error("Parsed addons are not an object or invalid:", parsedAddons);
                    setAddonList([]);
                }
            } catch (e) {
                console.error("Error decoding addons:", e);
                setAddonList([]);
            }
        } else {
            setAddonList([]);
        }
    }, []);
    const showModal = () => {
        setOpenModel(true);
    };


    const handleCancel = () => {
        setOpenModel(false);
    };


    return (
        <div className="">

            <div className=' w-auto sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] ml-0 sm:ml-32 md:ml-32 lg:ml-32 xl:ml-32'>
                <div onClick={showModal} className='bg-[#1a42a2] text-[#fff] flex items-center gap-2 py-3 px-6 rounded-[5px] text-center justify-center w-[100%] cursor-pointer'>Add here <MdOutlineArrowForwardIos /></div>
            </div>

            <div className="sm:mt-10 xl:mt-10 lg:mt-10 mt-10 w-[95%] sm:w-[45%] md:w-[45%]  lg:w-[45%]  xl:w-[45%] mx-auto  sm:ml-19 md:ml-19  lg:ml-19 xl:ml-19">
                <div className="card shadow-md rounded-[5px] p-6 mt-3" style={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' }}>
                    <div>
                        <p className='font-medium text-xl'>Insurance Summary</p>
                    </div>
                    <div className='rounded-[5px] border-[#b7eb8f] bg-[#f6ffed] flex items-center gap-2 mt-5 py-4 px-5 border-1'>
                        <IoCheckmarkCircle color='#52c41a' size={20} />
                        Package Name
                    </div>
                    <div className='flex items-center justify-between mt-2 border-b-1 border-[#f2f2f2] py-3 px-2 text-[#646464]'>
                        <span>Premium</span>
                        <span>BHD 110</span>
                    </div>
                    <div className='flex items-center justify-between mt-2 border-b-1 border-[#f2f2f2] py-3 px-2 text-[#646464]'>
                        <span>ADD-ons</span>
                        <span>BHD 10</span>
                    </div>
                    <div className='flex items-center justify-between py-3 px-2 text-[#646464]'>
                        <span>VAT (10%)</span>
                        <span>BHD 12</span>
                    </div>
                    <div className='flex items-center justify-between mt-2 border-1 border-[#1252de] py-3 px-2 text-[#1252de] rounded-[5px] font-semibold'>
                        <span>Total Payable</span>
                        <span>BHD 132</span>
                    </div>
                </div>
            </div>


            {/* model of add-ons  */}
            <Modal
                open={openModel}
                confirmLoading={confirmLoading}
                footer={null}
                closable={false}
            >
                <div>
                    <div className='flex justify-end items-center'>
                        <IoClose onClick={() => setOpenModel(false)} size={20} className='cursor-pointer' />
                    </div>
                    <div className='border-b-1 border-[#d1d1d1] py-5 '>
                        <p className='text-xl font-semibold'>Add-Ons Selection</p>
                    </div>
                    <div>
                        <div className='border-b-1 border-[#d1d1d1] py-4 px-4'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-[15px]'>Car Replacement</span>
                                <span className='font-medium text-[15px]'>Price</span>
                                <span className='font-medium text-[15px]'>Select</span>
                            </div>
                        </div>
                        {
                            addonList.map((addon: Addon, idx: number) => (
                                <div key={idx} className="py-4 border-b border-[#f1f1f1] flex items-center justify-around">
                                    <span className="px-5 w-75">{addon.addon}</span>
                                    <span className="px-5 w-75">{addon.minimumPrice ? `BHD ${addon.minimumPrice}` : 'Included'}</span>
                                    <span className="px-5 w-50">
                                        {/* <Checkbox onChange={(e) => handleAddonChange(addon, e.target.checked)} /> */}
                                    </span>
                                </div>
                            ))
                        }
                        <div className='flex items-center justify-between border-b-1 border-[#d1d1d1] py-4 px-3'>
                            <span className=' '>8 Days Small Car Replacement</span>
                            <span className=' '>Included</span>
                            <span className=' '><Checkbox /> (Selected)</span>
                        </div>
                        <div className='flex items-center justify-between border-b-1 border-[#d1d1d1] py-4 px-3'>
                            <span className=' '>15 Days Small Car Replacement</span>
                            <span className=' '>+ BHD 10</span>
                            <span className=' '><Checkbox /></span>
                        </div>
                        <div className='flex items-center justify-between border-b-1 border-[#d1d1d1] py-4 px-3'>
                            <span className=' '>15 Days Small Car Replacement</span>
                            <span className=' '>+ BHD 10</span>
                            <span className=' '><Checkbox /></span>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
};

export default AddOns;
