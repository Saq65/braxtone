'use client';

import { Nunito } from "next/font/google";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { FaPhone, FaWhatsapp } from "react-icons/fa";

import 'swiper/css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-[#eaf4fb]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-10 min-h-screen flex flex-col justify-center">

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 flex-1">

          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left xl:pr-12 2xl:pr-20"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: "easeOut",delay: 0.6}}
            viewport={{ once: true, amount: 0.8 }}
          >
            <p className={`${nunito.className} text-[22px] sm:text-[26px] md:text-[30px] xl:text-[40px] 2xl:text-[48px] font-bold leading-tight text-[#1a1a1a]`}>
              Compare, Choose, Save <br />
              & Get Fast Affordable <br />
              Car Insurance
            </p>
            <p className="text-[14px] sm:text-base md:text-lg xl:text-xl 2xl:text-2xl text-gray-700 mt-5 max-w-[640px] 2xl:max-w-[800px] leading-relaxed mx-auto md:mx-0">
              Get instant car insurance coverage from the Government of Canada (GOC) to insurers,
              ensuring fast, reliable protection for vehicles with seamless processing.
            </p>

            <Link href="/cards">
              <div className="mt-6 inline-block py-3 px-6 xl:py-4 xl:px-8 bg-[#0067a1] text-white rounded-md text-sm sm:text-base xl:text-lg hover:bg-[#005584] transition">
                Explore Our Pricing
              </div>
            </Link>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, ease: "easeOut",delay: 0.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <img
              src="/asesst/images/boy-girl.png"
              alt="Boy and Girl"
              className="h-[250px] sm:h-[300px] md:h-[360px] xl:h-[450px] 2xl:h-[520px] w-auto object-contain"
            />
          </motion.div>

        </div>

        <div className="mt-10 w-full flex flex-col xl:flex-row items-center justify-between gap-6">

          <div className="w-full xl:w-[75%] bg-[#d8ecf6] rounded-md px-4 py-4">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1440: { slidesPerView: 6 },
              }}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              freeMode={true}
              modules={[Autoplay]}
              className="mySwiper w-full"
            >
              {[
                "firstbrax",
                "secondbrax",
                "thirdbrax",
                "fourbrax",
                "firstbrax",
                "secondbrax",
                "thirdbrax",
                "fourbrax",
              ].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center">
                    <img
                      src={`/asesst/images/${img}.png`}
                      alt={img}
                      className="object-contain h-7"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex gap-4 items-center justify-center xl:justify-end">
            <span className="bg-[#0c625a] p-2 rounded-full">
              <FaWhatsapp color="white" />
            </span>
            <span className="bg-[#fc7b26] p-2 rounded-full">
              <FaPhone color="white" className="text-sm" />
            </span>
            <span>
              <img
                src="/asesst/images/arabic.png"
                alt="arabic"
                className="h-7 w-auto object-contain"
              />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}