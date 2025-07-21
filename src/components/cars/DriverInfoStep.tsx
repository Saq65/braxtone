import { useState } from "react";

export default function DriverInfoStep({ onNext, onBack }: any) {
  const [driver, setDriver] = useState("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter Driver Name"
        className="w-full p-2 border rounded"
        value={driver}
        onChange={(e) => setDriver(e.target.value)}
      />
      <div className="flex justify-between gap-4">
        <button onClick={onBack} className="w-full bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={() => onNext({ driver })}
          className="w-full bg-green-600 text-white px-4 py-2 rounded"
          disabled={!driver.trim()}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
