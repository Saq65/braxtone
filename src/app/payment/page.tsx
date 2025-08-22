"use client"

import React, { useState } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import { IoCardSharp, IoCheckmarkCircle } from 'react-icons/io5';
import { Checkbox } from 'antd';
import { IoMdCard } from 'react-icons/io';

type PaymentProps = {
    selectedPackage?: {
        packageName: string;
        minimumPrice: number;
        addonsTotal: number;
        vat: number;
        grandTotal: number;

    };
};

const Payment: React.FC<PaymentProps> = ({ selectedPackage }) => {
    const [showCreditDebit, setCreditDebit] = useState(false);


    const handleCheckboxChange = (e: any) => {
        setCreditDebit(e.target.checked);
    };
    return (
        <div className="">
            <div className="mt-10">
                <div className='flex justify-center items-center flex-col'>
                    <p className='font-medium text-[24px] sm:text-[38px] lg:text-[38px] xl:text-[38px]'>Choose the payment method</p>
                    <span className='text-[#646464]'>Pick how you'd like to pay for your insurance.</span>
                </div>
            </div>

            <div className='flex justify-center items-center w-[100%] mb-12 sm:mb-5 md:mb-5 lg:mb-5 xl:mb-5'>
                <div className='w-[96%] sm:w-[60%]  md:w-[60%]  lg:w-[60%]  xl:w-[60%]  mt-10 flex items-start gap-10 justify-center sm:flex-row md:flex-row lg:flex-row xl:flex-row flex-col'>
                    <div className='flex flex-col items-center w-[100%] sm:w-[50%] md:w-[60%] lg:w-[50%] xl:w-[50%]'>
                        <div className='flex justify-between w-[100%] shadow-md m-2 py-4 items-center px-3 rounded-[4px]'
                            style={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>

                            <div className='flex items-center gap-3'>
                                <span className='h-13 w-13 rounded-full bg-[#f5f5f5] flex justify-center items-center'><CiCreditCard1 color='#aaaaaa' size={28} /></span>
                                <span className='font-medium text-[16px]'>Credit/Debit Card</span>
                            </div>
                            <div>
                                <Checkbox checked={showCreditDebit}
                                    onChange={(e) => setCreditDebit(e.target.checked)}
                                    style={{ fontSize: 33 }} />
                            </div>
                        </div>

                        {showCreditDebit && (
                            <div className=' rounded-[4px] shadow-sm p-8 w-[100%] m-2'>
                                <div className='py-3 border-b-1 border-[#dcdcdc]'>
                                    <p className='font-medium text-[20px]'>Checkout</p>
                                </div>
                                <div>
                                    <div className='py-3 px-1'>
                                        <p className='text-[#565656]'>Card type</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <div className='border border-[#d0d0d0] w-[50%] py-3 flex justify-between px-4 rounded-[4px] items-center'>
                                            <span className='flex items-center gap-2'><IoMdCard size={22} color='#aaaaaa' /> Credit Card</span>
                                            <span>
                                                <Checkbox />
                                            </span>
                                        </div>
                                        <div className='border border-[#d0d0d0] w-[50%] py-3 flex justify-between  px-4 rounded-[4px] items-center'>
                                            <span className='flex items-center gap-2'><IoMdCard size={22} color='#aaaaaa' /> Debit Card</span>
                                            <span>
                                                <Checkbox />
                                            </span>
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <div className='py-3 px-1'>
                                        <p className='text-[#565656]'>Card details</p>
                                    </div>
                                    <div className='flex gap-5 items-center flex-col'>
                                        <div className='border border-[#d0d0d0] w-[100%]  flex justify-between rounded-[4px] items-center'>
                                            <input
                                                style={{ outline: 'none' }}
                                                className='py-3 w-[100%] border-none  focus:ring-1 focus:ring-[#1252de] px-2 ' type="text" placeholder='Card holder name' name="card-holder" />
                                        </div>
                                        <div className='border border-[#d0d0d0] w-[100%]  flex justify-between rounded-[4px] items-center flex items-center focus:ring-1 focus:ring-[#1252de]'>
                                            <input style={{ outline: 'none' }} className='py-3 w-[100%] border-none outline:none px-2' type="text" placeholder='Card number' name="card-number" />
                                            <span className='w-15'>
                                                <img src=".\asesst\images\visa-logo.png" alt="visa-card" />
                                            </span>
                                        </div>
                                        <div className='flex items-center w-[100%] gap-5'>
                                            <div className='border border-[#d0d0d0] w-[50%]  flex justify-between rounded-[4px] items-center'>
                                                <input
                                                    style={{ outline: 'none' }}
                                                    className='py-3 w-[100%] border-none focus:outline-none focus:ring-1 focus:ring-[#1252de] px-2 ' type="text" placeholder='Expiry date' name="expiry-date" />
                                            </div>
                                            <div className='border border-[#d0d0d0] w-[50%]  flex justify-between rounded-[4px] items-center'>
                                                <input
                                                    style={{ outline: 'none' }}
                                                    className='py-3 w-[100%] border-none focus:outline-none focus:ring-1 focus:ring-[#1252de] px-2 ' type="text" placeholder='CVC' name="cvc" />
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-5 justify-start w-[100%] ml-3'>
                                            <Checkbox />
                                            <span>I agree to the terms and conditions of this payment.</span>
                                        </div>
                                    </div>
                                    <div className='bg-[#d0d0d0] rounded-[4px] mt-5 py-3 px-4 text-center font-medium cursor-pointer'>
                                        <p>Pay now- BHD 132</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='flex justify-between w-[100%] shadow-md m-2 py-4 items-center px-3 rounded-[4px]'
                            style={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>

                            <div className='flex items-center gap-3'>
                                <span className='h-13 w-13 rounded-full bg-[#f5f5f5] flex justify-center items-center'>
                                    <img src=".\asesst\images\master.png" alt='master-card' />
                                </span>
                                <span className='font-medium text-[16px]'>Mastercard</span>
                            </div>
                            <div>
                                <Checkbox style={{ fontSize: '33px' }} />
                            </div>
                        </div>

                        <div className='flex justify-between w-[100%] shadow-md m-2 py-4 items-center px-3 rounded-[4px]'
                            style={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>

                            <div className='flex items-center gap-3'>
                                <span className='h-13 w-13 rounded-full bg-[#f5f5f5] flex justify-center items-center'>
                                    <img src=".\asesst\images\visa-logo.png" alt="visa-card" />
                                </span>
                                <span className='font-medium text-[16px]'>Visa</span>
                            </div>
                            <div>
                                <Checkbox style={{ fontSize: '33px' }} />
                            </div>
                        </div>

                        <div className='flex justify-between w-[100%] shadow-md m-2 py-4 items-center px-3 rounded-[4px]'
                            style={{ boxShadow: ' rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>

                            <div className='flex items-center gap-3'>
                                <span className='h-14 w-14 rounded-full bg-[#f5f5f5] flex justify-center items-center'>
                                    <img src=".\asesst\images\benifitPay.png" alt="" />
                                </span>
                                <span className='font-medium text-[16px]'>Benefit pay</span>
                            </div>
                            <div>
                                <Checkbox style={{ fontSize: '33px' }} />
                            </div>
                        </div>
                    </div>


                    <div className='w-[100%] sm:w-[28%] md:w-[28%] lg:w-[28%] xl:w-[28%]'>
                        <div className='shadow-md rounded-[12px] p-5 w-[100%]'>
                            <div>
                                <p className='font-medium text-[18px]'>Insurance Summary</p>
                            </div>
                            <div>
                                <div className='rounded-[5px] border-[#b7eb8f] bg-[#f6ffed] flex items-center gap-2 mt-5 py-4 px-5 border-1'>
                                    <IoCheckmarkCircle color='#52c41a' size={20} />
                                    {selectedPackage ? selectedPackage.packageName : "No package selected"}
                                </div>
                                <div className='flex items-center justify-between mt-2 border-b-1 border-[#f2f2f2] py-3 px-2 text-[#646464]'>
                                    <span>Premium</span>
                                    <span>BHD {selectedPackage?.minimumPrice?.toFixed(3) ?? "0.000"}</span>
                                </div>
                                <div className='flex items-center justify-between mt-2 border-b-1 border-[#f2f2f2] py-3 px-2 text-[#646464]'>
                                    <span>ADD-ons</span>
                                    <span>BHD {selectedPackage?.addonsTotal?.toFixed(3) ?? "0.000"}</span>
                                </div>
                                <div className='flex items-center justify-between py-3 px-2 text-[#646464]'>
                                    <span>VAT (10%)</span>
                                    <span>BHD {selectedPackage?.vat?.toFixed(3) ?? "0.000"}</span>
                                </div>
                                <div className='flex items-center justify-between mt-2 border-1 border-[#1252de] py-3 px-2 text-[#1252de] rounded-[5px] font-semibold'>
                                    <span>Total Payable</span>
                                    <span>BHD {selectedPackage?.grandTotal?.toFixed(3) ?? "0.000"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Payment;
