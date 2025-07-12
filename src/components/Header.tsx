'use client'
import React, { useState } from 'react'
import { Montserrat } from 'next/font/google'
import { IoMdArrowDropup } from 'react-icons/io'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";


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
                        <img src="/asesst/images/logo-1.svg" className='object-cover h-5' alt="BRAXTONE" />
                    </Link>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose size={28} color="white" /> : <HiMenuAlt3 size={28} color="white" />}
                    </button>
                </div>

                <div
                    className={`${montserrat.className} hidden lg:flex gap-11 items-center text-white text-md font-medium`}
                >
                    <Link href="/about">
                        <span className="cursor-pointer hover:underline">About Us</span>
                    </Link>
                    <span className="cursor-pointer hover:underline">Customer Login</span>
                    <span className="cursor-pointer hover:underline">Agent Login</span>
                    <span className="cursor-pointer hover:underline">Let's Connect</span>
                </div>

                <div
                    className={`${montserrat.className} hidden lg:flex items-center text-white gap-1 text-sm cursor-pointer`}
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
                            className="hover:underline hover:text-green-600 font-semibold"
                        >
                            About Us
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
                            Let's Connect
                        </motion.span>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center gap-1 font-semibold"
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
