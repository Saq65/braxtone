'use client';

import { Nunito } from "next/font/google";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import 'swiper/css';
import Image from "next/image";
import { useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function Home() {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden overflow-x-hidden bg-[linear-gradient(to_bottom,_#91ccef_0%,_white_30%,_white_70%,_#91ccef_100%)] w-full min-h-[92vh] p-[30px] sm:p-unset">

      <div className="flex justify-between items-center">

        <div className="absolute top-0 left-0 h-full w-auto z-0 pointer-events-none select-none">
          <Image
            src="/asesst/images/bg-right.png"
            alt="Left Decoration"
            width={400}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-auto z-0 pointer-events-none select-none">
          <Image
            src="/asesst/images/bg-left.png"
            alt="Right Decoration"
            width={400}
            height={1000}
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-8 sm:py-10 py-0 flex flex-col justify-center mt-20">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 flex-1">

          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left xl:pr-12 2xl:pr-20"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <p className={`${nunito.className} text-[22px] sm:text-[26px] md:text-[30px] xl:text-[38px] 2xl:text-[45px] font-bold leading-tight text-[#1a1a1a]`}>
              Compare, Choose, Save <br />
              & Get Fast Affordable <br />
              Car Insurance
            </p>
            <p className="text-[10px] sm:text-base md:text-lg xl:text-xl 2xl:text-[17px] text-[#646464] mt-5 max-w-[640px] 2xl:max-w-[800px] leading-relaxed mx-auto md:mx-0">
              Get instant car insurance coverage from the Government of Canada (GOC) to insurers,
              ensuring fast, reliable protection for vehicles with seamless processing.
            </p>

            <div className="w-full flex justify-center md:justify-start">
              <div
                onClick={() => router.push('/servicePage')}
                className="w-[220px] mt-12 py-3 px-6 xl:py-4 xl:px-8 bg-[#0067a1] text-white rounded-md text-sm sm:text-base xl:text-lg hover:bg-[#005584] transition cursor-pointer text-center"
              >
                Explore Our Pricing
              </div>
            </div>

          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            <Image
              src="/asesst/images/boy-girl.png"
              alt="Boy and Girl"
              width={450}
              height={600}
              className="object-contain h-[250px] sm:h-[300px] md:h-[360px] xl:h-[450px] 2xl:h-[500px] w-auto"
            />
          </motion.div>
        </div>

        <div className="mt-20 w-full flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="w-full xl:w-[75%] sm:w-[100%] bg-[#dbedf8] rounded-md px-4 py-4">
            <Swiper
              slidesPerView={2}
              spaceBetween={72}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 4 },
                1440: { slidesPerView: 4 },
              }}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove={false}
              freeMode={true}
              modules={[Autoplay]}
              className="mySwiper w-full px-20"
            >
              {['ex1', 'ex2', 'ex3', 'ex4', 'ex1', 'ex2', 'ex3', 'ex4'].map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center h-10 p-2 items-center">
                    <Image
                      src={`/asesst/images/${img}.png`}
                      alt={img}
                      width={80}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden sm:flex gap-4 items-center justify-center xl:justify-end">
            <span className="bg-[#0c625a] p-2 rounded-full">
              <FaWhatsapp color="white" />
            </span>
            <span className="bg-[#fc7b26] p-2 rounded-full">
              <FaPhone color="white" className="text-sm" />
            </span>
            <div className="relative w-16 h-8">
              <Image
                src="/asesst/images/arabic.png"
                alt="arabic"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
