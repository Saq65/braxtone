'use client';

import { useState } from 'react';
import { cardData, CardData } from '@/data/cardData';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceHeader from '@/components/ServiceHeader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ServiceCardPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e6f4fd] to-white px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center">
      <ServiceHeader />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl w-full mb-16">
        {cardData.map((item: CardData) => (
          <ServiceCard
            key={item.id}
            item={item}
            isSelected={selectedCard === item.id}
            onSelect={setSelectedCard}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-2xl">
        <button className="flex items-center gap-2 px-5 py-3 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
          <FaArrowLeft />
          <span className="text-sm font-medium">Go Back</span>
        </button>
        <button
          disabled={!selectedCard}
          className={`flex items-center gap-2 px-6 py-3 rounded-md shadow-md text-white text-sm font-medium transition ${
            selectedCard
              ? 'bg-[#0067a3] hover:bg-[#005684]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </main>
  );
};

export default ServiceCardPage;
