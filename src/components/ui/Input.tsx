import React from 'react'
import { RiMapPin2Line } from 'react-icons/ri'

type Props = {}

const Input = (props: Props) => {
    return (
        <div className=''>
            <div
                tabIndex={0}
                className='max-w-[350px] sm:max-w-full flex items-center rounded border border-gray-300 focus:outline-none 
                focus:ring-0.8 focus:ring-sky-600 focus:border-sky-600 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
                 hover:shadow-md transition-shadow duration-200 '
            >
                <span className='px-3'>
                    <RiMapPin2Line size={20} color='#afafaf' />
                </span>
                <input
                    type="text"
                    placeholder="ENTER ADDRESS, CITY, STATE"
                    className="w-sm px-2 py-3  outine-none border-none focus:outline-none sm:w-xl"
                />
            </div>

        </div>
    )
}

export default Input