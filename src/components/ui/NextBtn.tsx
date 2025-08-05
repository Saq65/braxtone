import React from 'react';

interface NextButtonProps {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ disabled, onClick, label = "Next →" }) => {
  return (
    <div className="flex justify-center w-auto sm:w-[440px] md:w-[440px] lg:w-[440px] xl:w-[440px]">
      <button
        className="mt-4 px-10 font-semibold py-3 bg-[#0068a2] rounded text-white disabled:bg-[#d0d0d0] disabled:text-gray-600"
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default NextButton;
