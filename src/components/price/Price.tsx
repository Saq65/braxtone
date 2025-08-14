import React from 'react'

type Props = {}

const Price = (props: Props) => {
    return (
        <div>
            <div className='flex items-center justify-center w-auto '>
                <div className='bg-[#ff8532] p-4 text-white w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%] text-center font-medium'>
                    <p>Your Price Is</p>
                    <p>XXX BHD + VAT</p>
                </div>
            </div>

        </div>
    )
}

export default Price