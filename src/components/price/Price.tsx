import React from 'react'

type Props = {}

const Price = (props: Props) => {
    return (
        <div>
            <div className='flex items-center justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start w-auto xl:ml-30 '>
                <div className='bg-[#ff8532] p-4 text-white w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[28%] text-center font-medium'>
                    <p>Your Price Is</p>
                    <p>XXX BHD + VAT</p>
                </div>
            </div>

        </div>
    )
}

export default Price