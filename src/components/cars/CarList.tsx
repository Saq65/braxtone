'use client'

import { useState } from 'react'
import CarStepForm from './CarStepForm'

type Car = {
    year: string
    manufacturer: string
}

export default function CarList({onNext,setSelectedCars,}: {onNext: () => void
setSelectedCars: (cars: string[]) => void
}) {
    const [cars, setCars] = useState<Car[]>([{
        year: '2013',
        manufacturer: 'Ford Escape'
    }])
    const [adding, setAdding] = useState(false)

    const handleNext = () => {
        setSelectedCars(cars.map((c) => `${c.year} ${c.manufacturer}`))
        onNext()
    }

    const handleComplete = (newCar: Car) => {
        setCars([...cars, newCar])
        setAdding(false)
    }

    const handleCancel = () => {
        setAdding(false)
    }

    return (
        <>
            <div className="space-y-4">
                {cars.map((car, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border border-gray-200 rounded-lg px-4 py-3 bg-white shadow-sm"
                    >
                        <div className="flex items-center py-5 space-x-2">
                            <img src="./car.jpg" alt="" className="w-11 h-8 rounded-full object-cover" />
                            <span className="font-bold text-gray-600">{car.year} {car.manufacturer}</span>
                        </div>
                        <div className="ml-19">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-gray-500 transition-colors duration-300"></div>
                                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                            </label>
                        </div>
                    </div>
                ))}



                {adding && (
                    <CarStepForm
                        onComplete={handleComplete}
                        onCancel={handleCancel}
                    />
                )}
            </div>

            <div className="mt-10 text-left">
                <button
                    onClick={handleNext}
                    className="border shadow-lg border-gray-300 bg-gray-100 rounded-md w-[200px] py-4 mt-6 text-gray-400 hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </>
    )
}
