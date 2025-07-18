import { useState } from "react";

export default function AddCarStep({ onNext }: { onNext: (data: any) => void }) {
  const [carName, setCarName] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter Car Name"
        className="w-full p-2 border rounded"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
      />
      <button
        onClick={() => onNext({ carName })}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        disabled={!carName.trim()}
      >
        Next
      </button>
    </div>
  );
}
