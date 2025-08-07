import { Button, Checkbox, Input } from 'antd';
import React from 'react';
import { CiCreditCard1 } from "react-icons/ci";
import { IoCheckmark } from 'react-icons/io5';

type PaymentProps = {
    selectedPackageName?: string;
};

const Payment = ({ selectedPackageName }: PaymentProps) => {
    console.log("Payment - Selected Package Name:", selectedPackageName);

    return (
        <div className=" flex justify-center items-center ">
            <div>
                <div className="flex justify-center items-center flex-col mt-5">
                    <p className="font-semibold text-4xl">Choose the payment method</p>
                    <span className="mt-2">Pick how you'd like to pay for your insurance.</span>
                </div>

                <div className="flex justify-center items-center ">
                    <div className="flex justify-center items-center flex-row gap-20">
                        <div className="card mt-10 w-full p-5 rounded-[7px] bg-[#fff]" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                            <div className="py-3 border-b border-[#dcdcdc]">
                                <p className="px-5 font-semibold">Checkout</p>
                            </div>
                            <div className="py-4 border-b border-[#f1f1f1] flex items-center justify-around w-full">
                                <div className="w-[330px] py-3 border border-green-400 rounded-sm bg-[rgb(220,231,220)] flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center ml-2">
                                        <IoCheckmark color="white" size={12} />
                                    </div>
                                    <p>{selectedPackageName || 'No Package Selected'}</p>
                                </div>
                            </div>

                            <div className="mt-4 px-5">
                                <span>Card Type</span>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="p-4 w-[48%]"> {/* Adjusted width */}
                                        <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-1">
                                            <CiCreditCard1 size={30} className="text-gray-500" />
                                            <span className="text-[#b8b8b8]">Credit card</span>
                                            <Checkbox />
                                        </div>
                                    </div>
                                    <div className="p-4 w-[48%]"> {/* Adjusted width */}
                                        <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-1">
                                            <CiCreditCard1 size={30} className="text-gray-500" />
                                            <span className="text-[#b8b8b8]">Debit card</span>
                                            <Checkbox />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 px-5">
                                <span>Card Details</span>
                                <div className="flex items-center justify-around w-full flex-col">
                                    <div className="p-4 w-full">
                                        <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-1">
                                            <Input className="border-0 border-none" placeholder="Card holder name" />
                                        </div>

                                        <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-3">
                                            <Input className="border-0 border-none" placeholder="Card number" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="p-4 w-[48%]">
                                            <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-1">
                                                <Input className="border-0 border-none" placeholder="Expiry date (MM/YY)" />
                                            </div>
                                        </div>
                                        <div className="p-4 w-[48%]">
                                            <div className="flex items-center justify-between py-4 border p-2 border-[#f1f1f1] mt-1">
                                                <Input className="border-0 border-none" placeholder="CVV" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mx-2 py-2 p-2">
                                <Checkbox />
                                <span className="text-[#b8b8b8]">I agree to the terms and conditions of this payment</span>
                            </div>

                            <div>
                                <button className="w-full p-2 rounded-[7px] bg-[#d0d0d0] text-[#000] mt-2">Pay now - BHD 121</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Payment;
