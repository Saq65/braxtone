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

    console.log("Decoded Addons from URL:", addonsFromUrl);

    if (addonsFromUrl) {
      try {
        // Decode and parse the JSON string from the URL
        const decodedAddons = decodeURIComponent(addonsFromUrl);
        const parsedAddons = JSON.parse(decodedAddons); // Parse the string into an object

        // Check if parsedAddons is an object (as expected), and convert it into an array
        if (parsedAddons && typeof parsedAddons === "object") {
          const addonsArray = Object.values(parsedAddons); // Convert object to array
          console.log("Parsed add-ons:", addonsArray);
          setAddonList(addonsArray); // Set the parsed add-ons array to the state
        } else {
          console.error("Parsed addons is not an object or is invalid:", parsedAddons);
          setAddonList([]); // Handle invalid case
        }
      } catch (e) {
        console.error("Error decoding addons:", e);
        setAddonList([]); // Handle error case
      }
    } else {
      setAddonList([]); // Handle case where no addons are passed in the URL
    }
  }, []); // This runs once when the component mounts

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
            <div className="card mt-20 w-[60%] p-5 rounded-[7px]" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
              <div className="py-3 border-b border-[#dcdcdc]">
                <p className="px-5 font-semibold">Add-Ons Selection</p>
              </div>

              {addonList.length === 0 ? (
                <div className="py-4 text-center">No add-ons available for this package.</div>
              ) : (
                addonList.map((addon: any, idx: number) => (
                  <div key={idx} className="py-4 border-b border-[#f1f1f1] flex items-center justify-around">
                    <span className="px-5 w-75">{addon.addon}</span> {/* Display only the addon name */}
                    <span className="px-5 w-75">{addon.minimumPrice ? `BHD ${addon.minimumPrice}` : 'Included'}</span>
                    <span className="px-5 w-50">
                      <Checkbox />
                    </span>
                  </div>
                ))
              )}
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
