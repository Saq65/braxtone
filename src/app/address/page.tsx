'use client';

import { useState } from 'react';
import ServiceHeader from '@/components/ServiceHeader';
import { InsuranceData } from '@/data/insurenceData';
import { useRouter } from 'next/navigation';
import Buttons from '@/components/ui/buttons';
import Input from '@/components/ui/Input';

const Page = () => {
    const router = useRouter();
    const { image, heading, paragraph } = InsuranceData[2];
    const [inputValue, setInputValue] = useState('');

    return (
        <main className="min-h-[91.5vh] bg-[linear-gradient(to_bottom,_#FFF2E2_0%,_white_30%,_white_70%,_#FFF2E2_100%)]px-4 py-8 sm:px-8 lg:px-16 flex flex-col items-center overflow-x-hidden">
            <ServiceHeader image={image} heading={heading} paragraph={paragraph} />


            <div className="input w-full lg:w-[660px] xl:w-[660px]">
                <Input value={inputValue} onChange={setInputValue} />
            </div>

            <div className='mt-8'>
                <Buttons
                    onFirstClick={() => router.push('/InsuranceCoverage')}
                    onSecondClick={() => router.push('/multipleFormPage')}
                    secondDisabled={!inputValue.trim()} />
            </div>


        </main>
    );
};

export default Page;