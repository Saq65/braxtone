import { FormikProps } from 'formik';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  formik: FormikProps<{ vinNumber: string; carValue: string }>;
}

const Input = ({ value, onChange, placeholder, formik }: InputProps) => {
  return (
    <div>
      <div className="max-w-[330px] sm:w-full flex items-center rounded
       border border-gray-300 focus-within:outline-none focus-within:ring-1
        focus-within:ring-[#002d97] sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
         hover:shadow-md transition-shadow duration-200 lg:w-full xl:w-full"
         >
        <input
          type="text"
          name="carValue" // Ensure name corresponds to the formik field
          placeholder={placeholder}
          value={value}
          onChange={onChange} // Handle change using Formik's handleChange
          className="w-sm px-2 py-3 outline-none border-none focus:outline-none sm:w-xl"
        />
      </div>
      {/* Display validation error if available */}
      {formik.errors.carValue && formik.touched.carValue && (
        <div className="text-red-500 text-sm">{formik.errors.carValue}</div>
      )}
    </div>
  );
};

export default Input;
