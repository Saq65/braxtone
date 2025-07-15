type CarCardProps = {
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onToggle: () => void;
};

export default function CarCard({ name, icon, selected, onToggle }: CarCardProps) {
  return (
    <div className="flex items-center justify-between border border-gray-300 p-7 rounded-lg shadow-sm
      w-[400px]">
      <div className="flex items-center gap-3">
        {icon}
        <span>{name}</span>
      </div>
      <input type="checkbox" checked={selected} onChange={onToggle} className="toggle toggle-primary" />
                      <div className="ml-19 ">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-12 h-6 bg-gray-300 rounded-full peer-checked:bg-gray-500 transition-colors duration-300"></div>
                    <div
                      className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300
                    peer-checked:translate-x-6"
                    ></div>
                  </label>
                </div>

    </div>
  );
}
