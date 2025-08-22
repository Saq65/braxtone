'use client';

import { useState } from 'react';
import { cardData, CardData } from '@/data/cardData';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceHeader from '@/components/ServiceHeader';
import { InsuranceData } from '@/data/insurenceData';
import { useRouter } from 'next/navigation';

const ServiceCardPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const router = useRouter();
  const { image, heading, paragraph } = InsuranceData[0];

  const SECOND_INDEX = 1; // 0-based

  return (
    <main className="min-h-[91.5vh] bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)] px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center overflow-x-hidden">
      <ServiceHeader image={image} heading={heading} paragraph={paragraph} />

      <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 max-w-7xl w-full mb-12">
        {cardData.map((item: CardData, idx) => {
          const disabled = idx !== SECOND_INDEX;
          return (
            <ServiceCard
              key={item.id}
              item={item}
              isSelected={selectedCard === item.id}
              onSelect={(id) => {
                if (disabled) return;
                setSelectedCard(id);
                router.push('/InsuranceCoverage');
              }}
            />
          );
        })}
      </div>
    </main>
  );
};

export default ServiceCardPage;
