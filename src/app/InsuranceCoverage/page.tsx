'use client';

import { useState } from 'react';
import { cardData2, CardData } from '@/data/cardData';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceHeader from '@/components/ServiceHeader';
import { InsuranceData } from '@/data/insurenceData';
import { useRouter } from 'next/navigation';
import Buttons from '@/components/ui/buttons';

const Page = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const router = useRouter();
  const { image, heading, paragraph } = InsuranceData[1];

  return (
    <main className="min-h-[91.5vh] bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)]  px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center overflow-x-hidden">
      <ServiceHeader image={image} heading={heading} paragraph={paragraph} />

      <div className="w-full flex justify-center items-center ">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 w-full max-w-2xl h-[250px] sm:h-[300px]">
          {cardData2.map((item: CardData) => (
            <ServiceCard
              key={item.id}
              item={item}
              isSelected={selectedCard === item.id}
              onSelect={setSelectedCard}
            />
          ))}
        </div>

      </div>

      <div className='mt-8'>
        <Buttons
          onFirstClick={() => router.push('/servicePage')}
          onSecondClick={() => router.push('/multipleFormPage')}
          secondDisabled={selectedCard !== cardData2[1].id}
        />
      </div>


    </main>
  );
};

export default Page;