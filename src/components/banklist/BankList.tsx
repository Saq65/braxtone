import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

type Props = {
  onBankSelect: (selectedBank: string) => void;
};

const BankList = ({ onBankSelect }: Props) => {
  const [banks, setBanks] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleDropdownVisibleChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="w-[100%] sm:w-[50%] md:w-[50%] lg:w-[45%] xl:w-[38%] ml-0 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16">
      <Select
        placeholder="Select a bank"
        className="w-[100%] focus:outline-none focus:ring-0 py-2"
        onChange={onBankSelect}
        options={banks.map(bank => ({ label: bank, value: bank }))}
        suffixIcon={isOpen ? <AiOutlineUp className="text-gray-500 text-xl" /> : <AiOutlineDown className="text-gray-500 text-xl" />}
        style={{ outline: 'none', height: '42px', borderRadius: '4px' }}
        onDropdownVisibleChange={handleDropdownVisibleChange}
        onOpenChange={setIsOpen}
        open={isOpen}
      />
    </div>
  );
};

export default BankList;
