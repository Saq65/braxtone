'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation, Pagination } from 'swiper/modules';
type Props = {}

const Packages = (props: Props) => {
    return (
        <div>
            <div className=''>
                <div className="flex justify-center w-4/5 ml-17">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={2}
                        // modules={[Navigation]}
                        className="mySwiper">
                        <SwiperSlide>
                            <div className="shadow shadow-md p-6 text-center w-[350px] rounded border">
                                <div className='flex  items-start flex-col'>
                                    <div>
                                        <h2>BKIC - Basic</h2>
                                    </div>
                                    <div>
                                        <div>
                                            img1
                                        </div>
                                        <div>img2</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide><div className="shadow shadow-md p-6 text-center w-[350px]">Slide 2</div></SwiperSlide>
                        <SwiperSlide><div className="border p-6 text-center">Slide 3</div></SwiperSlide>
                        <SwiperSlide><div className="border p-6 text-center">Slide 3</div></SwiperSlide>
                        <SwiperSlide><div className="border p-6 text-center">Slide 3</div></SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </div>
    )
}

export default Packages;