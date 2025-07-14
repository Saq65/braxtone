'use client';

import { useState } from 'react';
import { cardData, CardData } from '@/data/cardData';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceHeader from '@/components/ServiceHeader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { InsuranceData } from '@/data/insurenceData';
import { useRouter } from 'next/navigation';
import Buttons from '@/components/ui/buttons';

const ServiceCardPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const router = useRouter();
  const { image, heading, paragraph } = InsuranceData[0];
  const handleFirst = () => alert('First Button Clicked');
  const handleSecond = () => alert('Second Button Clicked');

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e6f4fd] to-white px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center">
      <ServiceHeader image={image} heading={heading} paragraph={paragraph} />

      <div className="grid sm:grid-cols-1 md:grid-cols-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 max-w-7xl w-full mb-12">
        {cardData.map((item: CardData) => (
          <ServiceCard
            key={item.id}
            item={item}
            isSelected={selectedCard === item.id}
            onSelect={(id) =>
              setSelectedCard((prev) => (prev === id ? null : id))
            }
          />
        ))}
      </div>

      <div>

        <Buttons
          onFirstClick={() => router.push('/')}
          onSecondClick={() => router.push('/InsuranceCoverage')}
          secondDisabled={!selectedCard}
        />
      </div>

     
    </main>
  );
};

export default ServiceCardPage;
