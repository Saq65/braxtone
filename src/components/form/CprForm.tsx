import React, { useState } from 'react';
import { BiUpload, BiX } from 'react-icons/bi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
  onFileStatusChange: (type: string, status: boolean) => void; // Prop to handle file status change
};

type FormValues = {
  nationalId: File | null;
  driverLicense: File | null;
  ownershipCard: File | null;
};

const CprForm = ({ onFileStatusChange }: Props) => {
  const [showUpload, setShowUpload] = useState<{ [key: string]: boolean }>({
    nationalId: false,
    driverLicense: false,
    ownershipCard: false,
  });
  const [previewUrl, setPreviewUrl] = useState<{ [key: string]: string | null }>({
    nationalId: null,
    driverLicense: null,
    ownershipCard: null,
  });

  // Formik Setup
  const formik = useFormik<FormValues>({
    initialValues: {
      nationalId: null,
      driverLicense: null,
      ownershipCard: null,
    },
    validationSchema: Yup.object({
      nationalId: Yup.mixed()
        .test('fileFormat', 'Invalid file format. Only JPG, PNG, JPEG, or PDF files are allowed.', (value) => {
          if (value) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            return allowedTypes.includes(value.type);
          }
          return true;
        })
        .nullable(),
      driverLicense: Yup.mixed()
        .test('fileFormat', 'Invalid file format. Only JPG, PNG, JPEG, or PDF files are allowed.', (value) => {
          if (value) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            return allowedTypes.includes(value.type);
          }
          return true;
        })
        .nullable(),
      ownershipCard: Yup.mixed()
        .test('fileFormat', 'Invalid file format. Only JPG, PNG, JPEG, or PDF files are allowed.', (value) => {
          if (value) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            return allowedTypes.includes(value.type);
          }
          return true;
        })
        .nullable(),
    }),
    onSubmit: (values) => {
      console.log('Form submitted with files:', values);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (formik.setFieldValue) {
        formik.setFieldValue(type, selectedFile);
      }

      if (type === 'nationalId') {
        setPreviewUrl((prev) => ({ ...prev, nationalId: URL.createObjectURL(selectedFile) }));
        onFileStatusChange('nationalId', true); // Notify parent that file is uploaded
      } else if (type === 'driverLicense') {
        setPreviewUrl((prev) => ({ ...prev, driverLicense: URL.createObjectURL(selectedFile) }));
        onFileStatusChange('driverLicense', true); // Notify parent that file is uploaded
      } else if (type === 'ownershipCard') {
        setPreviewUrl((prev) => ({ ...prev, ownershipCard: URL.createObjectURL(selectedFile) }));
        onFileStatusChange('ownershipCard', true); // Notify parent that file is uploaded
      }
      setShowUpload((prev) => ({ ...prev, [type]: false }));
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleRemoveFile = (type: string) => {
    if (type === 'nationalId') {
      formik.setFieldValue('nationalId', null); // Reset Formik value
      setPreviewUrl((prev) => ({ ...prev, nationalId: null })); // Clear preview
      onFileStatusChange('nationalId', false); // Notify parent that file is removed
    } else if (type === 'driverLicense') {
      formik.setFieldValue('driverLicense', null); // Reset Formik value
      setPreviewUrl((prev) => ({ ...prev, driverLicense: null })); // Clear preview
      onFileStatusChange('driverLicense', false); // Notify parent that file is removed
    } else if (type === 'ownershipCard') {
      formik.setFieldValue('ownershipCard', null); // Reset Formik value
      setPreviewUrl((prev) => ({ ...prev, ownershipCard: null })); // Clear preview
      onFileStatusChange('ownershipCard', false); // Notify parent that file is removed
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-y-4 ml-0 sm:ml-17 md:ml-17 lg:ml-17 xl:ml-17">
          {/* National ID Section */}
          <div className="flex gap-4 items-center">
            <div className="border border-gray-300 w-[100%] sm:w-[37%] md:w-[37%] lg:w-[37%] xl:w-[37%] flex items-center justify-between py-3 px-4 rounded-[5px] cursor-pointer">
              <span className="text-[#b8b8b8]">National ID (CPR) - Photo</span>
              <span
                className="text-[#b8b8b8]"
                onClick={() =>
                  setShowUpload((prev) => ({ ...prev, nationalId: true }))
                }
              >
                <BiUpload size={20} />
              </span>
            </div>
            <div>
              {showUpload.nationalId && (
                <div className="ml-2">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, 'nationalId')}
                  />
                  <button
                    type="button"
                    className="text-[#0070f3] cursor-pointer"
                    onClick={() => {
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    Upload File
                  </button>
                </div>
              )}
              {formik.values.nationalId && (
                <div className="text-sm text-gray-700 ml-4">
                  {formik.values.nationalId.name}
                  <span
                    onClick={() => handleRemoveFile('nationalId')}
                    className="ml-2 cursor-pointer text-red-600"
                  >
                    <BiX size={20} />
                  </span>
                </div>
              )}
              {previewUrl.nationalId && (
                <img
                  src={previewUrl.nationalId}
                  alt="National ID Preview"
                  className="w-24 h-24 object-cover mt-2"
                />
              )}
              {formik.errors.nationalId && formik.touched.nationalId && (
                <div className="text-red-600 text-sm">{formik.errors.nationalId}</div>
              )}
            </div>

          </div>

          {/* Driver License Section */}
          <div className="flex gap-4 items-center">
            <div className="border border-gray-300 w-[100%] sm:w-[37%] md:w-[37%] lg:w-[37%] xl:w-[37%] flex items-center justify-between py-3 px-4 rounded-[5px] cursor-pointer">
              <span className="text-[#b8b8b8]">Driver License - Photo</span>
              <span
                className="text-[#b8b8b8]"
                onClick={() =>
                  setShowUpload((prev) => ({ ...prev, driverLicense: true }))
                }
              >
                <BiUpload size={20} />
              </span>
            </div>
            <div>
              {showUpload.driverLicense && (
                <div className="ml-2">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, 'driverLicense')}
                  />
                  <button
                    type="button"
                    className="text-[#0070f3] cursor-pointer"
                    onClick={() => {
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    Upload File
                  </button>
                </div>
              )}
              {formik.values.driverLicense && (
                <div className="text-sm text-gray-700 ml-4">
                  {formik.values.driverLicense.name}
                  <span
                    onClick={() => handleRemoveFile('driverLicense')}
                    className="ml-2 cursor-pointer text-red-600"
                  >
                    <BiX size={20} />
                  </span>
                </div>
              )}
              {previewUrl.driverLicense && (
                <img
                  src={previewUrl.driverLicense}
                  alt="Driver License Preview"
                  className="w-24 h-24 object-cover mt-2"
                />
              )}
              {formik.errors.driverLicense && formik.touched.driverLicense && (
                <div className="text-red-600 text-sm">{formik.errors.driverLicense}</div>
              )}
            </div>

          </div>

          {/* Ownership Card Section */}
          <div className="flex gap-4 items-center">
            <div className="border border-gray-300 w-[100%] sm:w-[37%] md:w-[37%] lg:w-[37%] xl:w-[37%] flex items-center justify-between py-3 px-4 rounded-[5px] cursor-pointer">
              <span className="text-[#b8b8b8]">Ownership Card - Photo</span>
              <span
                className="text-[#b8b8b8]"
                onClick={() =>
                  setShowUpload((prev) => ({ ...prev, ownershipCard: true }))
                }
              >
                <BiUpload size={20} />
              </span>
            </div>
            <div>
              {showUpload.ownershipCard && (
                <div className="ml-2">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, 'ownershipCard')}
                  />
                  <button
                    type="button"
                    className="text-[#0070f3] cursor-pointer"
                    onClick={() => {
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      fileInput?.click();
                    }}
                  >
                    Upload File
                  </button>
                </div>
              )}
              {formik.values.ownershipCard && (
                <div className="text-sm text-gray-700 ml-4">
                  {formik.values.ownershipCard.name}
                  <span
                    onClick={() => handleRemoveFile('ownershipCard')}
                    className="ml-2 cursor-pointer text-red-600"
                  >
                    <BiX size={20} />
                  </span>
                </div>
              )}
              {previewUrl.ownershipCard && (
                <img
                  src={previewUrl.ownershipCard}
                  alt="Ownership Card Preview"
                  className="w-24 h-24 object-cover mt-2"
                />
              )}
              {formik.errors.ownershipCard && formik.touched.ownershipCard && (
                <div className="text-red-600 text-sm">{formik.errors.ownershipCard}</div>
              )}
            </div>

          </div>
          {/* 
          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
            Submit
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default CprForm;
