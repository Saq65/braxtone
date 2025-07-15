export default function AddCarCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-75 border border-dashed p-6 rounded text-center text-gray-500 hover:bg-gray-50"
    >
      + Add car
    </button>
  );
}
