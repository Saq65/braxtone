import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {
  onBankSelect: (selectedBank: string) => void;
};

const BankList = ({ onBankSelect }: Props) => {
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

  return (
    <div className="w-[100%] sm:w-[50%] md:w-[50%] lg:w-[45%] xl:w-[38%] ml-1 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16">
      <Select
        placeholder="Select a bank"
        className="w-[100%]"
        onChange={onBankSelect}
        options={banks.map(bank => ({ label: bank, value: bank }))}
      />
    </div>
  );
};

export default BankList;
