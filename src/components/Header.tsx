'use client'
import React, { useState } from 'react'
import { Montserrat } from 'next/font/google'
import { IoMdArrowDropup } from 'react-icons/io'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image'


const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="header bg-[#1474aa] px-6 lg:px-12 py-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/">
                        <Image
                            src="/asesst/images/logo-1.svg"
                            alt="BRAXTONE"
                            width={120}
                            height={32}
                            className="object-cover h-5 w-auto"
                            priority
                        />
                    </Link>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose size={28} color="white" /> : <HiOutlineMenuAlt3 size={28} color="white" />}
                    </button>
                </div>

                <div
                    className={`${montserrat.className} hidden lg:flex gap-11 items-center text-white text-md font-medium`}
                >
                    <Link href="/about">
                        <span className="cursor-pointer hover:underline text-base/8 underline-offset-6">About Us</span>
                    </Link>
                    <span className="cursor-pointer hover:underline text-base/8 underline-offset-6">Customer Login</span>
                    <span className="cursor-pointer hover:underline text-base/8 underline-offset-6">Agent Login</span>
                    <span className="cursor-pointer hover:underline text-base/8 underline-offset-6">Let&apos;s Connect</span>
                </div>

                <div
                    className={`${montserrat.className} hidden lg:flex items-center text-white text-md font-medium gap-1 hover:underline cursor-pointer text-base/8 underline-offset-4`}
                >
                    My Account
                    <IoMdArrowDropup />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "calc(100vh - 80px)" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className={`${montserrat.className} lg:hidden fixed top-[80px] left-0 w-full bg-white px-6 py-6 overflow-hidden flex flex-col justify-start items-center gap-6 text-black text-sm z-40`}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative group cursor-pointer font-semibold text-base text-black"
                        >
                            About Us
                            <span className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-green-500 transition-all duration-300 ease-in-out group-hover:w-full" />
                        </motion.span>

                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hover:underline font-semibold"
                        >
                            Customer Login
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="hover:underline font-semibold"
                        >
                            Agent Login
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="hover:underline font-semibold"
                        >
                            Let&apos;s Connect
                        </motion.span>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-1 font-semibold hover:underline"
                        >
                            My Account
                            <IoMdArrowDropup />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



        </div>
    )
}

export default Header
