import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {
    onBankSelect: (selectedBank: string) => void;
}


const BankList = (props: Props) => {
    const [banks, setBanks] = useState<string[]>([]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await axios.get('/api/banks');
                const data = res.data;
                const bankList = Object.keys(data.banks || {});
                setBanks(bankList);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };

        fetchBanks();
    }, []);

    const handleBankChange = (value: string) => {
        props.onBankSelect(value);
    };

    return (
        <div className='w-[100%] sm:w-[50%] md:w-[50%] lg:w-[45%] xl:w-[38%] ml-1 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16 '>
            {/* <h2 className="text-lg font-semibold">Bank List</h2> */}
            <Select placeholder="Select a bank" className='w-[100%]' onChange={handleBankChange}>
                {banks.map((bank, index) => (
                    <Option  value={bank}>
                        {bank}
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default BankList;
