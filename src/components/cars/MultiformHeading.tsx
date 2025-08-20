'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MultiformHeaderProps {
    image?: string
    heading?: string
    color?: string
}

export default function MultiformHeading({  heading ,color}: MultiformHeaderProps) {
    const [animationDone, setAnimationDone] = useState(false)
    const letters = heading?.split('') || []

    const totalAnimationTime = letters.length * 40 + 900

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationDone(true)
        }, totalAnimationTime)

        return () => clearTimeout(timer)
    }, [totalAnimationTime])

    return (
        <div className="flex items-start gap-4 flex-col sm:flex-row md:flex-row lg:flex-row sm:items-center md:items-center lg:items-center ">
            

            <div className="text-lg font-medium w-[100%] sm:w-[500px] lg:w-[620px]"
             style={{ color: color || 'inherit' }} 
            >
                {animationDone ? (
                    heading
                ) : (
                    <div
               
                    >
                        {letters.map((char, idx) => (
                            <span
                                key={idx}
                                className="inline-block"
                             
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </div>


                )}
            </div>
        </div>
    )
}
