type CarCardProps = {
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onToggle: () => void;
};

export default function CarCard({ name, icon, selected, onToggle }: CarCardProps) {
  return (
    <div className="flex items-center justify-between border border-gray-300 p-7 rounded-lg shadow-sm w-[380px] hover:shadow-md cursor-pointer">
      <div className="flex items-center gap-3">
        <img src="/asesst/images/car-1.png" alt="" />
        <span>{name}</span>
      </div>

      {/* Toggle Switch */}
      <div className="ml-10">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={selected}
            onChange={onToggle}
          />
          <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-[#0068a2] transition-colors duration-300"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>
    </div>
  );
}
