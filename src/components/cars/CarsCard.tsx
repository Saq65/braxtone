import { Switch } from 'antd';

export default function CarCard({
  name,
  selected,
  onToggle,
}: {
  name: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-lg shadow-sm w-auto hover:shadow-md cursor-pointer
        transition-colors duration-300 border sm:w-[380px] md:w-[380px] lg:w-[380px] xl:w-[380px]
        ${selected ? 'border-[#0068a2]' : 'border-gray-300'}`}
    >
      <div className="flex items-center gap-3">
        <img src="/asesst/images/car-1.png" alt="car" />
        <span>{name}</span>
      </div>

      <div className="ml-10">
        <Switch
          checked={selected}
          onChange={onToggle}
          className="bg-gray-300"
          style={{
            backgroundColor: selected ? '#0068a2' : '#d9d9d9',
          }}
        />
      </div>
    </div>
  );
}
