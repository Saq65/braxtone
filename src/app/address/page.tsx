'use client';

import { useState } from 'react';
import { cardData2, CardData } from '@/data/cardData';
import ServiceCard from '@/components/ui/ServiceCard';
import ServiceHeader from '@/components/ServiceHeader';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { InsuranceData } from '@/data/insurenceData';
import { useRouter } from 'next/navigation';
import Buttons from '@/components/ui/buttons';
import Input from '@/components/ui/Input';

const page = () => {
    const router = useRouter();
    const { image, heading, paragraph } = InsuranceData[2];
    const [inputValue, setInputValue] = useState('');

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#e6f4fd] to-white px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center overflow-x-hidden">
            <ServiceHeader image={image} heading={heading} paragraph={paragraph} />


            <div className="input">
                <Input value={inputValue} onChange={setInputValue}/>
            </div>

            <div className='mt-8'>
                <Buttons
                    onFirstClick={() => router.push('/InsuranceCoverage')}
                    onSecondClick={() => router.push('/InsuranceCoverage')}
                    secondDisabled={!inputValue.trim()} />
            </div>


        </main>
    );
};

export default page;