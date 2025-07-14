import React from 'react'
import { RiMapPin2Line } from 'react-icons/ri'

type Props = {}

const Input = (props: Props) => {
    return (
        <div>
            <div
                tabIndex={0}
                className='w-full max-w-auto flex items-center  border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
                <span className='p-1'>
                    <RiMapPin2Line size={20} color='#afafaf' />
                </span>
                <input
                    type="text"
                    placeholder="ENTER ADDRESS, CITY, STATE"
                    className="w-xl px-4 py-3  outine-none border-none focus:outline-none "
                />
            </div>

        </div>
    )
}

export default Input