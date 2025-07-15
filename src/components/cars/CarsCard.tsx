type CarCardProps = {
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onToggle: () => void;
};

export default function CarCard({ name, icon, selected, onToggle }: CarCardProps) {
  return (
    <div className="flex items-center justify-between border p-4 rounded shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <span>{name}</span>
      </div>
      <input type="checkbox" checked={selected} onChange={onToggle} className="toggle toggle-primary" />
    </div>
  );
}
