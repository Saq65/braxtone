import React from 'react';

type Props = {
  data: { id: number; value: string }[];
};

function MultiOption({ data }: Props) {
  return (
    <div className="w-[300px] border border-gray-300 py-4">
      <ul>
        {data.map(item => (
          <li key={item.id} className="py-2 px-4">
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultiOption;
