import React from 'react'

type Props = {}

function DriverForm({ }: Props) {
    return (
        <div className='flex flex-col'>
            <button className="w-[390px] ml-4 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                + 1 Add car
            </button>

            <button className="w-[390px] ml-4 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer mt-6">
                + Add Driver
            </button>


        </div>
    )
}

export default DriverForm