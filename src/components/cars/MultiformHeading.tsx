'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MultiformHeaderProps {
    image?: string
    heading?: string
}

export default function MultiformHeading({  heading }: MultiformHeaderProps) {
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
        <div className="flex items-start gap-4 flex-col sm:flex-row md:flex-row lg:flex-row sm:items-center md:items-center lg:items-center">
            

            <div className="text-lg font-semibold w-5/6 sm:w-[500px]">
                {animationDone ? (
                    heading
                ) : (
                    <motion.div
                        className="flex flex-wrap"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.03, 
                                },
                            },
                        }}
                    >
                        {letters.map((char, idx) => (
                            <motion.span
                                key={idx}
                                className="inline-block"
                                variants={{
                                    hidden: { opacity: 0, x: -10 },
                                    visible: { opacity: 1, x: 0 },
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeOut',
                                }}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.div>


                )}
            </div>
        </div>
    )
}
