import React from 'react';

interface NextButtonProps {
  disabled: boolean;
  onClick: () => void;
  label?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ disabled, onClick, label = "Next →" }) => {
  return (
    <div className="flex justify-center w-[440px]">
      <button
        className="mt-4 px-10 font-semibold py-3 bg-[#d0d0d0] rounded text-gray-800 disabled:opacity-50"
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default NextButton;
