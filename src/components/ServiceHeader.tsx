'use client';

import Image from 'next/image';

const ServiceHeader = () => {
  return (
    <div className="text-center mb-14">
      <div className="flex justify-center mb-6">
        <Image
          src="/asesst/images/dania-smile.png"
          alt="Dania"
          width={100}
          height={100}
          className="rounded-full object-cover border-2 border-white shadow"
        />
      </div>
      <h1 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] mb-3">
        Hi, my name is Dania!
      </h1>
      <p className="text-base md:text-lg text-gray-600">
        Please Choose Your Service
      </p>
    </div>
  );
};

export default ServiceHeader;
