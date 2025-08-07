'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';


import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import { Button } from 'antd';
import { Navigation } from 'swiper/modules';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';


type PackageType = {
    _id: string;
    packageName: string;
    price: number;
    features: string[];
    type: string;
    companyLogo: string;
    minimumPrice: string;
    benefits: Record<string, { addon: string }>;
    addons: Record<string, { addon: string }>;
};

type PackagesProps = {
    onSelect: (pkg: PackageType) => void;
};
export type { PackageType };
const ThirdPartyPackage = ({ onSelect }: PackagesProps) => {
    const [thidPartyPackages, setthidPartyPackages] = useState<PackageType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('/api/packages');
                const data = await res.json();

                const filtered = data.filter((pkg: PackageType) => pkg.type === 'Third Party');
                setthidPartyPackages(filtered);
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
        <div>
            <div className=''>
                <div className="flex items-center justify-center w-full relative">
                    <div className="flex justify-between items-center mb-4 px-2">
                        <button className="absolute top-50 right-[96%] z-99 swiper-button-prev-custom px-4 py-2  cursor-pointer">
                            <SlArrowLeft color='#3c89b5' size={22} style={{ fontWeight: 'bold' }} />
                        </button>
                        <button className="absolute top-50 left-[95%] z-99 swiper-button-next-custom px-4 py-2  cursor-pointer">
                            <SlArrowRight color='#3c89b5' size={22} />
                        </button>
                    </div>
                    <Swiper
                        spaceBetween={1}
                        slidesPerView={2}
                        modules={[Navigation]}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 2,
                            },
                            1280: {
                                slidesPerView: 2,
                            },
                        }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        className="mySwiper h-[100%]"
                    >
                        {
                            thidPartyPackages.map((res, index) =>
                                <SwiperSlide key={res._id}>
                                    <div
                                        style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
                                        }}
                                        className="p-6 text-center w-[380px] h-[440px] rounded m-2 bg-[#fff] mb-4">
                                        <div className='flex items-start flex-col'>
                                            <div>
                                                <h2 style={{ fontWeight: '500', fontSize: '16px' }} className='text-futura'>{res.packageName}</h2>
                                            </div>
                                            <div className='mt-6 flex flex-row w-full items-center justify-between'>
                                                <div className='shadow py-2 px-2 w-[48%]'>
                                                    <Image
                                                        src={res.companyLogo}
                                                        alt="arabic"
                                                        width={78}
                                                        height={78}
                                                        className="mx-auto"
                                                    />
                                                </div>
                                                <div className='shadow p-1 w-[48%] py-2 px-2'>
                                                    <span className='font-futura font-medium'>BHD {res.minimumPrice} + VAT</span>
                                                    {/* <img src={res.exclude} alt="dd" /> */}
                                                </div>
                                            </div>

                                            <div style={{ borderBottom: '0.5px solid #dddcdc' }} className='w-[100%] mt-5'></div>
                                        </div>
                                        <div className='mt-5 flex flex-col gap-4 items-start ml-2 h-[50%]'>
                                            <div className='flex flex-col gap-5 items-start justify-start'>
                                                {Object.entries(res.benefits).map(([key, benefit]) => (
                                                    <div className='flex flex-row items-start gap-2'>
                                                        <span className='border rounded rounded-full border-[#ababab] mt-1'><IoIosArrowForward color='#0068a2' /></span>
                                                        <p className='text-justify text-gray-500 text-[13px] line-height:1.25' key={key}>
                                                            {benefit.addon}
                                                        </p>
                                                    </div>

                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 mb-4">
                                            <div className='mt-5 w-full'>
                                                <Button className='btn w-full bg-[#d0d0d0] hover:bg-[#0068a2]'
                                                    onClick={() => onSelect(res)}

                                                >Choose</Button>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    </Swiper>
                </div>

            </div>
        </div>
    )
}

export default ThirdPartyPackage;