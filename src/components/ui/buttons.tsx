import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Props = {
  onFirstClick?: () => void;
  onSecondClick?: () => void;
  firstLabel?: string;
  secondLabel?: string;
  secondDisabled?: boolean;
};

const Buttons = ({
  onFirstClick,
  onSecondClick,
  firstLabel = 'Go Back',
  secondLabel = 'Next',
  secondDisabled = false,
}: Props) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 w-full max-w-2xl min-w-3xl">
      <button
        onClick={onFirstClick}
        className="flex items-center gap-2 px-5 py-3 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition cursor-pointer"
      >
        <FaArrowLeft />
        <span className="text-sm font-medium">{firstLabel}</span>
      </button>

      <button
        onClick={onSecondClick}
        disabled={secondDisabled}
        className={`flex items-center gap-2 px-6 py-3 rounded-md shadow-md cursor-pointer text-white text-sm font-medium transition ${secondDisabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-[#0067a3] hover:bg-[#005684] cursor-pointer'
          }`}
      >
        {secondLabel} <FaArrowRight />
      </button>
    </div>
  );
};

export default Buttons;
