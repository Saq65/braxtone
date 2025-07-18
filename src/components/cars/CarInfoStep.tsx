import { useState } from "react";

export default function CarInfoStep({ onNext, onBack }: any) {
  const [model, setModel] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter Car Model"
        className="w-full p-2 border rounded"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <div className="flex justify-between gap-4">
        <button onClick={onBack} className="w-full bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={() => onNext({ model })}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!model.trim()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
