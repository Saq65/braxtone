import React from 'react';

type Props = {
  data: { id: number; value: string }[];
};

function MultiOption({ data }: Props) {
  return (
    <div className="">
      <ul>
        {data.map(item => (
          <div key={item.id} className="w-[350px] border border-gray-300 py-4 gap-3 mt-3 rounded-md text-center font-semibold">
            {item.value}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MultiOption;
