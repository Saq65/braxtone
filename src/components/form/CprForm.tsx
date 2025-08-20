import React, { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { IoCheckmarkCircle } from 'react-icons/io5';

type Props = {
  onFileStatusChange: (type: string, status: boolean) => void;
};

const CprForm = ({ onFileStatusChange }: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    nationalId: false,
    driverLicense: false,
    ownershipCard: false,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: you can validate file type here if needed
    setUploadedFiles((prev) => ({ ...prev, [type]: true }));
    onFileStatusChange(type, true);
  };

  const renderUploadBox = (label: string, type: string) => (
    <div className="border border-gray-300 w-[100%] sm:w-[37%] md:w-[37%] lg:w-[37%] xl:w-[40%] flex items-center justify-between py-3 px-4 rounded-[5px] cursor-pointer">
      <span className="text-[#b8b8b8]">{label}</span>
      {uploadedFiles[type] ? (
        <IoCheckmarkCircle size={24} color="green" />
      ) : (
        <input
          type="file"
          className="hidden"
          accept="image/*,application/pdf"
          onChange={(e) => handleFileChange(e, type)}
          id={`file-${type}`}
        />
      )}
      {!uploadedFiles[type] && (
        <label htmlFor={`file-${type}`} className="cursor-pointer text-[#0070f3]">
          <BiUpload size={20} />
        </label>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 ml-0 sm:ml-17 md:ml-17 lg:ml-17 xl:ml-17">
      {renderUploadBox('National ID (CPR) - Photo', 'nationalId')}
      {renderUploadBox('Driver License - Photo', 'driverLicense')}
      {renderUploadBox('Ownership Card - Photo', 'ownershipCard')}
    </div>
  );
};

export default CprForm;
