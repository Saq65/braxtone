'use client';

import { Checkbox, Modal, Spin } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { MdOutlineArrowForwardIos } from 'react-icons/md';

type PaymentProps = {
  selectedPackageName?: string;
};

type RawAddon = {
  icon: string;
  minimumPrice: number;
  percentage: number;
  addon: string;
  addon_ar?: string;
  group?: string;
};

type RawPackage = {
  _id: string;
  isRecommendedPackage?: boolean;
  companyName: string;
  companyLogo?: string;
  packageName: string;
  type?: string;            
  minimumPrice?: number;  
  addons?: Record<string, RawAddon>; 
};

type Addon = RawAddon & {
  id: string;          
  computedPrice: number;
  included: boolean;   
};

export default function AddOns({ selectedPackageName }: PaymentProps) {
  const [openModel, setOpenModel] = useState(false);
  const [packages, setPackages] = useState<RawPackage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch('/api/packages', { cache: 'no-store' });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Failed to fetch packages');
        if (mounted) setPackages(Array.isArray(data) ? data : data?.packages ?? []);
      } catch (e: any) {
        setErr(e?.message ?? 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const selectedPkg: RawPackage | undefined = useMemo(() => {
    if (!packages || !packages.length) return undefined;
    if (!selectedPackageName) return packages[0];
    const byId = packages.find(p => p._id === selectedPackageName);
    if (byId) return byId;
    const byName = packages.find(
      p => p.packageName?.toLowerCase() === selectedPackageName.toLowerCase()
    );
    return byName ?? packages[0];
  }, [packages, selectedPackageName]);

  const basePremium = selectedPkg?.minimumPrice ?? 0;

  const addonList: Addon[] = useMemo(() => {
    const map = selectedPkg?.addons ?? {};
    return Object.entries(map).map(([id, a]) => {
      const price = a.minimumPrice > 0
        ? a.minimumPrice
        : (a.percentage > 0 ? Number((basePremium * a.percentage).toFixed(3)) : 0);
      return {
        ...a,
        id,
        computedPrice: price,
        included: price === 0,
      };
    });
  }, [selectedPkg, basePremium]);

  useEffect(() => {
    if (!addonList.length) return;
    const init: Record<string, boolean> = {};
    addonList.forEach(a => { if (a.included) init[a.id] = true; });
    setSelectedIds(init);
  }, [addonList]);

  // Totals
  const addonsTotal = useMemo(() => {
    return addonList.reduce((sum, a) => {
      if (!selectedIds[a.id]) return sum;
      return sum + a.computedPrice; 
    }, 0);
  }, [addonList, selectedIds]);

  const VAT_RATE = 0.10;
  const premium = basePremium;
  const vat = Number(((premium + addonsTotal) * VAT_RATE).toFixed(3));
  const grandTotal = Number((premium + addonsTotal + vat).toFixed(3));

  const toggleAddon = (id: string, checked: boolean) => {
    setSelectedIds(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <div>
      <div className='w-auto sm:w-[30%] md:w-[30%] lg:w-[30%] xl:w-[30%] ml-0 sm:ml-32 md:ml-32 lg:ml-32 xl:ml-32'>
        <button
          onClick={() => setOpenModel(true)}
          className='bg-[#1a42a2] text-[#fff] flex items-center gap-2 py-3 px-6 rounded-[5px] justify-center w-full'
        >
          Add here <MdOutlineArrowForwardIos />
        </button>
      </div>

      <div className='sm:mt-10 xl:mt-10 lg:mt-10 mt-10 w-[95%] sm:w-[45%] md:w-[45%] lg:w-[45%] xl:w-[45%] mx-auto sm:ml-19 md:ml-19 lg:ml-19 xl:ml-19'>
        <div
          className='card shadow-md rounded-[5px] p-6 mt-3'
          style={{ boxShadow: 'rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px' }}
        >
          <div className='flex items-center gap-2'>
            <p className='font-medium text-xl'>Insurance Summary</p>
            {selectedPkg?.companyLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedPkg.companyLogo} alt={selectedPkg.companyName} className='h-6 ml-2' />
            )}
          </div>

          <div className='rounded-[5px] border-[#b7eb8f] bg-[#f6ffed] flex items-center gap-2 mt-5 py-4 px-5 border'>
            <IoCheckmarkCircle color='#52c41a' size={20} />
            {selectedPkg?._id ?? 'Package'}
          </div>

          <div className='flex items-center justify-between mt-2 border-b py-3 px-2 text-[#646464]'>
            <span>Premium</span>
            <span>BHD {premium.toFixed(3)}</span>
          </div>

          <div className='flex items-center justify-between mt-2 border-b py-3 px-2 text-[#646464]'>
            <span>ADD-ons</span>
            <span>BHD {addonsTotal.toFixed(3)}</span>
          </div>

          <div className='flex items-center justify-between py-3 px-2 text-[#646464]'>
            <span>VAT (10%)</span>
            <span>BHD {vat.toFixed(3)}</span>
          </div>

          <div className='flex items-center justify-between mt-2 border py-3 px-2 text-[#1252de] rounded-[5px] font-semibold'>
            <span>Total Payable</span>
            <span>BHD {grandTotal.toFixed(3)}</span>
          </div>
        </div>
      </div>

      {/* Modal: Add-on selector */}
      <Modal open={openModel} onCancel={() => setOpenModel(false)} footer={null} closable={false}>
        <div>
          <div className='flex justify-end items-center'>
            <IoClose onClick={() => setOpenModel(false)} size={20} className='cursor-pointer' />
          </div>

          <div className='border-b py-5'>
            <p className='text-xl font-semibold'>Add-Ons Selection</p>
            <p className='text-sm text-gray-500'>{selectedPkg?._id}</p>
          </div>

          {loading && (
            <div className='py-6 flex justify-center'>
              <Spin />
            </div>
          )}

          {err && <div className='py-4 text-red-600 text-sm'>{err}</div>}

          {!loading && !err && (
            <>
              <div className='border-b py-4 px-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-medium text-[15px]'>Add-on</span>
                  <span className='font-medium text-[15px]'>Price</span>
                  <span className='font-medium text-[15px]'>Select</span>
                </div>
              </div>

              {addonList.map((a) => (
                <div key={a.id} className='py-4 border-b flex items-center justify-between gap-3'>
                  <div className='px-5 flex items-center gap-2 w-[55%]'>
                    <span>{a.addon}</span>
                  </div>

                  <span className='px-5 w-[25%]'>
                    {a.included ? 'Included' : `BHD ${a.computedPrice.toFixed(3)}`}
                  </span>

                  <span className='px-5 w-[20%]'>
                    <Checkbox
                      checked={!!selectedIds[a.id]}
                      disabled={a.included}
                      onChange={(e) => toggleAddon(a.id, e.target.checked)}
                    />
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
