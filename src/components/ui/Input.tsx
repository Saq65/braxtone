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
      <div className="max-w-[330px]  sm:w-full flex items-center rounded
       border border-gray-300 focus-within:outline-none focus-within:ring-1
        focus-within:ring-[#002d97] ml-2 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-17 shadow-[0px_4px_6px_0px_rgba(0,103,161,0.16)]
         hover:shadow-md transition-shadow duration-200 lg:w-full xl:w-full"
         >
        <input
          type="text"
          name="carValue" 
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
          className="w-sm px-5 py-3 outline-none border-none focus:outline-none sm:w-xl"
        />
      </div>
      {formik.errors.carValue && formik.touched.carValue && (
        <div className="text-red-500 text-sm">{formik.errors.carValue}</div>
      )}
    </div>
  );
};

export default Input;
