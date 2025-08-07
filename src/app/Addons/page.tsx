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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const addonsFromUrl = query.get('addons');
    console.log("Query string:", query.toString());
    console.log("Parsed add-ons from URL:", addonsFromUrl);

    if (addonsFromUrl) {
      try {
        const parsedAddons = JSON.parse(addonsFromUrl);
        console.log("Parsed add-ons:", parsedAddons);

        const addonsArray = Object.values(parsedAddons);

        console.log("Converted addons array:", addonsArray);

        setAddonList(addonsArray);
      } catch (error) {
        console.error("Error parsing 'addons' from query string:", error);
        setAddonList([]);
      }
    } else {
      setAddonList([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] overflow-hidden scrollbar-hide">
      <div className="fixed w-full bg-[#d3f0ff] sm:bg-transparent xl:bg-transparent lg:bg-transparent">
        <MultiformHeader />
      </div>
      <div className="flex justify-center items-center flex-col">
        <div>
          <div className="flex justify-center items-center flex-col mt-37">
            <p className="font-semibold text-4xl">Tarik, add extra protection for peace of mind</p>
            <span>Get more security and convenience with optional add-ons.</span>
          </div>
          <h1>{selectedPackageName}</h1>
          <div className="flex justify-center items-center flex-row gap-20 mt-10">
            <div className="card mt-20 w-[90%] p-5 rounded-[7px]" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
              <div className="py-3 border-b border-[#dcdcdc]">
                <p className="px-5 font-semibold">Add-Ons Selection</p>
              </div>
              {/* <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-around font-semibold">
              <span className="px-5 w-75">Add-Ons Selection</span>
              <span className="px-5 w-75">Price</span>
              <span className="px-5 w-50">Select</span>
            </div> */}

              {/* Check if addonList has data */}
              {addonList.length === 0 ? (
                <div className="py-4 text-center">No add-ons available for this package.</div>
              ) : (
                addonList.map((addon: any, idx: number) => (
                  <div key={idx} className="py-4 border-b border-[#f1f1f1] flex items-center justify-around">
                    <span className="px-5 w-75">{addon.addon}</span>
                    <span className="px-5 w-75">{addon.discount ? `BHD ${addon.discount}` : 'Included'}</span>
                    <span className="px-5 w-50">
                      <Checkbox />
                    </span>
                  </div>
                ))
              )}
            </div>
            <div className='card  p-5 rounded-[7px] w-[22%] mt-20' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
              <div>
                <p className="px-5 font-semibold">Insurance Summary</p>
              </div>
              <div>
                <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                  <span className="px-5 w-75">Premium</span>
                  <span className="px-5 w-75"></span>
                </div>
                <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                  <span className="px-5 w-75">Add-Ons</span>
                  <span className="px-5 w-75">BHD 0</span>
                </div>
                <div className="py-4 border-b border-[#dcdcdc] flex items-center justify-between">
                  <span className="px-5 w-75">VAT (10%)</span>
                  <span className="px-5 w-75">BHD 11</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-6">
          <Buttons onFirstClick={() => router.push('/multipleFormPage')} onSecondClick={() => router.push('/')} />
        </div>
      </div>
    </div>
  );
};

export default Addons;
