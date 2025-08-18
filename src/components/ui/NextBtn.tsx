import React from 'react';

interface NextButtonProps {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ disabled, onClick, label = "Next →" }) => {
  return (
    <div className="flex justify-center items-end w-[100%] sm:w-[440px] md:w-[440px] lg:w-[440px] xl:w-[440px]">
      <button
        className="w-[100%] sm:w-auto md:w-auto lg:w-auto xl:w-auto mt-4 px-10 font-[600] py-3 bg-[#0068a2]
         rounded text-white disabled:bg-[#d0d0d0] disabled:text-gray-600 mt-[46%] sm:mt-0 md:mt-0 lg:mt-6
                  cursor-pointer xl:mt-8"
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default NextButton;
