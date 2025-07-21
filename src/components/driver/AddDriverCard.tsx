"use client";
import { FaPlus } from "react-icons/fa";

export default function AddDriverCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="border border-dashed border-blue-400 rounded-md p-4 w-full sm:w-[250px] text-center cursor-pointer hover:bg-blue-50 transition"
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <FaPlus className="text-blue-500 text-xl" />
        <p className="text-blue-700 font-medium">Add Driver</p>
      </div>
    </div>
  );
}
