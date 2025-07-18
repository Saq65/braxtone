"use client";
import { useState } from "react";

export default function DriverStepForm({
  onCancel,
  onComplete,
}: {
  onCancel: () => void;
  onComplete: (driver: { name: string }) => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onComplete({ name });
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[300px] border p-4 rounded-md shadow-md bg-white space-y-3"
    >
      <h3 className="text-lg font-semibold">Add Driver Info</h3>
      <input
        type="text"
        placeholder="Driver Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
