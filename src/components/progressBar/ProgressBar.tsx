'use client';
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from 'react';

type CarRunMilesProps = {
    max: number;
    unitLabel: string;
    min?: number;
    defaultValue?: number;
    onSelect: (value: number) => void;
};

export default function ProgressBar({
    max,
    unitLabel,
    min = 0,
    defaultValue = 0,
    onSelect,
}: CarRunMilesProps) {
    const [value, setValue] = useState(defaultValue);
    const [position, setPosition] = useState(0);

    const updateSlider = (newValue: number) => {
        const numVal = Number(newValue);
        setValue(numVal);
        onSelect(numVal);
        const percent = (numVal - min) / (max - min);
        setPosition(percent * 100);
    };

    useEffect(() => {
        updateSlider(defaultValue);
    }, [defaultValue]);

    return (
        <div className="ml-0 sm:ml-3 md:ml-3 xl:ml-3">
            <div className="relative w-[330px] lg:w-[380px] ml-3 mt-20">
                <div
                    className="absolute top-[-40px] bg-gray-200 px-6 py-2 rounded-2xl text-bold text-gray-800"
                    style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        transition: 'left 0.1s ease-out',
                        whiteSpace: 'nowrap',
                    }}
                >
                     {value.toLocaleString()} {unitLabel}
                </div>

                <div className="relative">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => updateSlider(Number(e.target.value))}
                        className="w-full h-2 rounded-full appearance-none"
                        style={{
                            background: `linear-gradient(to right, #005684 ${position}%, #E5E7EB ${position}%)`,
                        }}
                    />

                    {/* Icon inside thumb */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: 'calc(50% + 3px)', // lowered thumb
                            left: `${position}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                            <IoIosArrowForward className="text-[#005684]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom thumb styling */}
            <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    cursor: pointer;
                    border: none;
                    margin-top: 18px; /* pushes thumb down */
                }

                input[type='range']::-moz-range-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: transparent;
                    border: none;
                }
            `}</style>
        </div>
    );
}
