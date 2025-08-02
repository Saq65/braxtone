'use client';

import { Nunito } from "next/font/google";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import 'swiper/css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Noto_Naskh_Arabic } from 'next/font/google';

const nunito = Nunito({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const arabicFont = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '700'], 
  variable: '--font-arabic', 
});
export default function HomeLandscape() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-[#fefefe] overflow-hidden relative">
            <div className="bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] w-full xl:p-unset lg:p-unset min-h-screen  sm:p-unset scollbar-hide">

                <div className="flex justify-between items-center overflow-hidden">

                    <div className="absolute top-[-0px] bottom-180 left-0 h-full w-auto z-0 pointer-events-none select-none overflow-hidden">
                        <Image
                            src="/asesst/images/bg-right.png"
                            alt="Left Decoration"
                            width={400}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <div className="absolute top-[-60] right-[-90px] h-full w-auto z-0 pointer-events-none select-none overflow-hidden">
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
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 flex-1">

                        <motion.div
                            className="w-full md:w-2/3 flex flex-col justify-center text-center md:text-left xl:pr-12 2xl:pr-20 "
                            initial={{ opacity: 0, x: -90 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <p className={`${nunito.className} text-[22px] sm:text-[26px] md:text-[35px] xl:text-[48px] 2xl:text-[56px] font-bold leading-tight text-[#1a1a1a]`}>
                                <span className="text-[var(--primary)]">Compare, Choose, Save </span><br />
                                & Get Fast Affordable <br />
                                Car Insurance
                            </p>
                            <p className="text-[12px] sm:text-base md:text-lg xl:text-xl 2xl:text-[17px] text-[#646464] mt-5 max-w-[640px] 2xl:max-w-[800px] leading-relaxed mx-auto md:mx-0">
                                Get instant car insurance coverage from the Government of Canada (GOC) to insurers,
                                ensuring fast, reliable protection for vehicles with seamless processing.
                            </p>

                            <div className="w-full flex justify-center md:justify-start">
                                <div
                                    onClick={() => router.push('/servicePage')}
                                    className="w-auto mt-12 py-3 px-6 xl:py-4 xl:px-8 bg-[var(--secondary)] opacity-[88%] text-white rounded-md text-sm sm:text-base xl:text-lg font-semibold hover:bg-[#005584] transition cursor-pointer text-center"
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
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="relative w-full max-w-[800px] mx-auto  p-4 ">
                                <Image
                                    src="/asesst/images/Horo-Section-Image.png"
                                    alt="Boy and Girl"
                                    width={900}
                                    height={800}
                                    className="w-full h-auto object-contain"
                                    unoptimized
                                />
                            </div>

                        </motion.div>
                    </div>

                    <div className="mt-45 w-full flex flex-col xl:flex-row items-center justify-between gap-6">
                        <div className="w-full xl:w-[75%] sm:w-full bg-[#dbedf8] shadow px-4 py-4 overflow-hidden relative">
                            <div className="flex w-max gap-10 space-x-10 px-10">
                                {['ex4', 'ex3', 'ex2', 'ex1'].map((img, index) => (
                                    <div key={index} className="flex justify-center items-center h-10 p-2">
                                        <Image
                                            src={`/asesst/images/${img}.png`}
                                            alt={img}
                                            width={70}
                                            height={50}
                                            className="w-full h-11 object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden  sm:flex gap-6 items-center justify-center xl:justify-end">
                            <span className="bg-[#0c625a] p-2 rounded-full">
                                <FaWhatsapp color="white" className="" size={25} />
                            </span>
                            <span className="bg-[#fc7b26] p-2 rounded-full">
                                <FaPhone color="white" className="text-sm p-1" size={25} />
                            </span>
                            <div className="relative w-18 h-10">
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
        </div>
    )
}