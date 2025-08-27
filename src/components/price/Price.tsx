import React, { useEffect } from 'react';

type Props = {
  price: number; 
  onPriceSet: (price: number) => void; 
};

const Price = ({ price, onPriceSet }: Props) => {

  useEffect(() => {
    if (price != null) {
      onPriceSet(price);
    }
  }, [price, onPriceSet]);

  return (
    <div>
      <div className='flex items-center justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start w-auto xl:ml-30 '>
        <div className='bg-[#ff8532] p-4 text-white w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[28%] text-center font-medium'>
          <p>Your Price Is</p>
          <p>{price.toFixed(3)} BHD + VAT</p>
        </div>
      </div>
    </div>
  );
};

export default Price;




