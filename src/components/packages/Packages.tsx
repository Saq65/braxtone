'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import { Button } from 'antd';
import { Navigation } from 'swiper/modules';

type PackageType = {
  packageName: string;
  price: number;
  features: string[];
  type: string;
  companyLogo: string;
  benefits: Record<string, { addon: string }>;
};

type PackagesProps = {
  onSelect: (pkg: PackageType) => void;
};

export type { PackageType };

const Packages = ({ onSelect }: PackagesProps) => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages');
        const data = await res.json();

        const filtered = data.filter(
          (pkg: PackageType) => pkg.type === 'Comprehensive'
        );
        setPackages(filtered);
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center w-full">
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        modules={[Navigation]}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 2 },
        }}
        className="mySwiper h-full cursor-pointer"
      >
        {packages.map((res, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
              }}
              className="p-6 text-center w-[380px] h-[440px] rounded m-2 bg-white mb-4"
            >
              <div className="flex flex-col items-start">
                <h2 className="text-futura font-medium text-[16px]">
                  {res.packageName} - Basic
                </h2>

                <div className="mt-6 flex flex-row w-full items-center justify-between">
                  <div className="shadow py-2 px-2 w-[48%]">
                    <Image
                      src={res.companyLogo}
                      alt="Company Logo"
                      width={78}
                      height={78}
                      className="mx-auto"
                    />
                  </div>
                  <div className="shadow py-2 px-2 w-[48%]">
                    <span className="font-futura font-medium">
                      BHD {res.price} + VAT
                    </span>
                  </div>
                </div>

                <div className="w-full mt-5 border-b border-[#dddcdc]" />

                <div className="mt-5 flex flex-col gap-4 items-start ml-2 h-[52%] overflow-y-auto">
                  {Object.entries(res.benefits).map(([key, benefit]) => (
                    <div key={key} className="flex flex-row items-start gap-2">
                      <span className="border rounded-full border-[#ababab] mt-1">
                        <IoIosArrowForward color="#0068a2" />
                      </span>
                      <p className="text-justify text-gray-500 text-[13px] leading-tight">
                        {benefit.addon}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4 mb-4 w-full mt-5">
                  <Button
                    className="btn w-full bg-[#d0d0d0] hover:bg-[#0068a2] text-black hover:text-white"
                    onClick={() => onSelect(res)} 
                  >
                    Choose
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Packages;
