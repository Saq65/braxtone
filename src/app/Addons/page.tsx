'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'antd';
import Buttons from '@/components/ui/buttons';
import MultiformHeader from '@/components/MultiformHeader';

type AddonsProps = {
  selectedPackageName?: string;
  addons: any[];
};

const Addons = ({ selectedPackageName, addons }: AddonsProps) => {
  const router = useRouter();
  const [addonList, setAddonList] = useState<any[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<any[]>([]);
  const [totalAddonPrice, setTotalAddonPrice] = useState(0);
  const basePremium = 110; // Base premium price

  // Fetch and parse the add-ons from the URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const addonsFromUrl = query.get('addons');
    console.log("Decoded Addons from URL:", addonsFromUrl);

    if (addonsFromUrl) {
      try {
        const decodedAddons = decodeURIComponent(addonsFromUrl);
        const parsedAddons = JSON.parse(decodedAddons); // Parse the string into an object

        if (parsedAddons && typeof parsedAddons === 'object') {
          const addonsArray = Object.values(parsedAddons);
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

  const handleAddonChange = (addon, isChecked) => {
    let updatedAddons = [...selectedAddons];

    if (isChecked) {
      updatedAddons.push(addon); // Add selected add-on
    } else {
      updatedAddons = updatedAddons.filter(item => item.addon !== addon.addon); // Remove deselected add-on
    }

    setSelectedAddons(updatedAddons);

    // Calculate the total price of selected add-ons
    const totalPrice = updatedAddons.reduce((total, addon) => total + addon.minimumPrice, 0);
    setTotalAddonPrice(totalPrice);
  };

  // Calculate VAT (10%)
  const vatAmount = totalAddonPrice * 0.1;
  // Calculate the total payable amount
  const totalPayable = basePremium + totalAddonPrice + vatAmount;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] overflow-hidden scrollbar-hide">
      <div className="fixed w-full bg-[#d3f0ff] sm:bg-transparent xl:bg-transparent lg:bg-transparent">
        <MultiformHeader />
      </div>
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col mt-37">
          <p className="font-semibold text-4xl">Tarik, add extra protection for peace of mind</p>
          <span>Get more security and convenience with optional add-ons.</span>
        </div>
        <h1>{selectedPackageName}</h1>
        <div className="flex justify-center items-center flex-row gap-20">
          <div className='w-100% mt-10' >
            <div className="card  w-[92%] p-5 rounded-[7px] bg-[#fff]" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
              <div className="py-3 border-b border-[#dcdcdc]">
                <p className="px-5 font-semibold">Add-Ons Selection</p>
              </div>
              <div className="py-4 border-b border-[#f1f1f1] flex items-center justify-around">
                <span className="px-5 w-75 font-semibold">Car Replacement</span>
                <span className="px-5 w-75 font-semibold">Price</span>
                <span className="px-5 w-50 font-semibold">Select</span>
              </div>

              {addonList.length === 0 ? (
                <div className="py-4 text-center">No add-ons available for this package.</div>
              ) : (
                addonList.map((addon: any, idx: number) => (
                  <div key={idx} className="py-4 border-b border-[#f1f1f1] flex items-center justify-around">
                    <span className="px-5 w-75">{addon.addon}</span>
                    <span className="px-5 w-75">{addon.minimumPrice ? `BHD ${addon.minimumPrice}` : 'Included'}</span>
                    <span className="px-5 w-50">
                      <Checkbox onChange={(e) => handleAddonChange(addon, e.target.checked)} />
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6">
              <Buttons onFirstClick={() => router.push('/multipleFormPage')} onSecondClick={() => router.push('/')} />
            </div>
          </div>


          <div className='card p-5 rounded-[7px] w-[20%] mt-20' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <div className='py-3 border-b border-[#dcdcdc]'>
              <p className="px-5 font-semibold">Insurance Summary</p>
            </div>
            <div>
              <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                <span className="px-5 w-75">Premium</span>
                <span className="px-5 w-75">BHD 110</span>
              </div>
              <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                <span className="px-5 w-75">Add-Ons</span>
                <span className="px-5 w-75">BHD {totalAddonPrice.toFixed(2)}</span>
              </div>
              <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                <span className="px-5 w-75">VAT (10%)</span>
                <span className="px-5 w-75">BHD {vatAmount.toFixed(2)}</span>
              </div>
              <div className="py-4 border-b bg-[#0068a2] flex items-center justify-between font-medium text-[#fff] rounded-bl-[8px] rounded-br-[8px]">
                <span className="px-5 w-75 font-semibold">Total Payable</span>
                <span className="px-5 w-75 font-semibold">BHD {totalPayable.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Addons;
