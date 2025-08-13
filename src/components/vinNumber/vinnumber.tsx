'use client'
import React from 'react';
import { FormikProps } from 'formik';

type Props = {
  data: { id: number; value: string }[];
  onSelect: (selectedValue: string) => void;
  onNextClick: () => void;
  formik: FormikProps<{ vinnumber: string }>;
};

export default function Vinnumber({ data, onSelect, onNextClick, formik }: Props) {
  return (
    <div className="ml-0 sm:ml-7 md:ml-7 lg:ml-7 xl:ml-7 mt-14 mb-7">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="vinnumber"
            id="vinnumber"
            className="border p-4 rounded border-gray-300 w-full max-w-[370px] min-w-0 shrink focus:outline-none focus:border-gray-600"
            placeholder="Enter VIN Number"
            value={formik.values.vinnumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={17}
          />
        </div>
        {formik.touched.vinnumber && formik.errors.vinnumber ? (
          <div className="text-red-500 mt-2">{formik.errors.vinnumber}</div>
        ) : null}
      </form>
    </div>
  );
}
