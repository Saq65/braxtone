'use client'
import React, { useState } from 'react'
import { Montserrat } from 'next/font/google'
import { IoMdArrowDropup } from 'react-icons/io'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import Link from 'next/link'

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="header bg-[#1474aa] px-6 md:px-12 py-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/">
                        <h2 className="text-white font-extrabold text-2xl">BRAXTONE</h2>
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <IoClose size={28} color="white" /> : <HiMenuAlt3 size={28} color="white" />}
                    </button>
                </div>

                <div
                    className={`${montserrat.className} hidden md:flex gap-10 items-center text-white text-sm font-medium`}
                >
                    <Link href="/about">
                        <span className="cursor-pointer hover:underline">About Us</span>
                    </Link>
                    <span className="cursor-pointer hover:underline">Customer Login</span>
                    <span className="cursor-pointer hover:underline">Agent Login</span>
                    <span className="cursor-pointer hover:underline">Let's Connect</span>
                </div>

                <div
                    className={`${montserrat.className} hidden md:flex items-center text-white gap-1 text-sm cursor-pointer`}
                >
                    My Account
                    <IoMdArrowDropup />
                </div>
            </div>

            {isOpen && (
                <div
                    className={`${montserrat.className} md:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-[#ffffff] px-6 py-6 flex flex-col justify-start items-center gap-6 text-[#000] text-sm z-40`}
                >
                    <span className="hover:underline">About Us</span>
                    <span className="hover:underline">Customer Login</span>
                    <span className="hover:underline">Agent Login</span>
                    <span className="hover:underline">Let's Connect</span>
                    <div className="flex items-center gap-1">
                        My Account
                        <IoMdArrowDropup />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
