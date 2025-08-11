'use client';

import { Nunito } from "next/font/google";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import 'swiper/css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Noto_Naskh_Arabic } from 'next/font/google';
import Link from "next/link";

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
        <div className=" bg-[#fefefe] overflow-hidden relative">
            <div className="bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] w-full xl:p-unset lg:p-unset min-h-[91.5vh] sm:p-unset scollbar-hide">

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

                <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-8 sm:py-10 py-0 flex flex-col justify-center mt-16">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10 flex-1">

                        <motion.div
                            className="w-full max-w-full md:max-w-[50%] flex flex-col justify-center text-center md:text-left px-4 md:px-0 xl:pr-12 2xl:pr-20"
                            initial={{ opacity: 0, x: -90 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <p className={`${nunito.className} text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] xl:text-[44px] 2xl:text-[53 px] font-bold leading-tight text-[#1a1a1a]`}>
                                <span className="text-[var(--primary)]">Compare, Choose, Save </span><br />
                                & Get Fast Affordable <br />
                                Car Insurance
                            </p>

                            <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] text-[#646464] mt-5 leading-relaxed mx-auto md:mx-0 max-w-[640px] 2xl:max-w-[800px]">
                                Get instant car insurance coverage from the Government of Canada (GOC) to insurers,
                                ensuring fast, reliable protection for vehicles with seamless processing.
                            </p>

                            <div className="w-full flex justify-center md:justify-start">
                                {/* <div
                                    onClick={() => router.push('/servicePage')}
                                    className="w-auto mt-10 py-3 px-6 lg:py-4 lg:px-8 bg-[var(--secondary)] opacity-90 text-white rounded-md text-sm sm:text-base lg:text-lg font-semibold hover:bg-[#005584] transition cursor-pointer text-center"
                                >
                                    Explore Our Pricing
                                </div> */}

                                <Link
                                    href="/servicePage"
                                    className="inline-flex items-center bg-[#003DA5] text-white font-medium px-6 py-2 relative overflow-hidden mt-10 py-3 px-6 lg:py-4 lg:px-8 text-white rounded-[6px] text-sm sm:text-base lg:text-lg font-semibold hover:bg-[#005584] transition cursor-pointer text-center"
                                >
                                    <span className="absolute left-0 top-0 bottom-0 w-6 bg-[#E5C8A0] clip-path-arrow"></span>

                                    <span className="ml-4">Explore Our Pricing</span>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            className="w-full md:w-1/2 flex justify-center items-center px-4 sm:px-6 md:px-0"
                            initial={{ opacity: 0, x: 90 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <div className="relative w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] mx-auto">
                                <Image
                                    src="/asesst/images/Horo-Section-Image.png"
                                    alt="Boy and Girl"
                                    width={900}
                                    height={600}
                                    className="w-full h-auto object-contain"
                                    unoptimized
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-36 w-full flex flex-col xl:flex-row md:flex-row lg:flex-row sm:flex-row items-center justify-between gap-6">
                        <div className="w-full xl:w-[75%] lg:w-[72%] md:w-[70%] sm:w-full bg-[#dbedf8] shadow px-4 py-4 overflow-hidden relative">
                            <div className="flex w-max gap-10 space-x-10 px-10 ">
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