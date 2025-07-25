import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const steps = [
  { title: "About You" },
  { title: "Cars" },
  { title: "Drivers" },
  { title: "How you drive" },
  { title: "Quote" },
];

export default function SidebarSteps() {
  return (
    <div className="flex flex-col items-start space-y-4 p-6">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start m-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full mt- border-2 flex items-center justify-center ${
                index === 0
                  ? "bg-[#0068a2] border-[#0068a2]"
                  : "bg-[#919191] border-[#919191]"
              }`}
            >
              <IoIosArrowForward color="#fff" />
            </div>
            {index !== steps.length - 1 && (
              <div className="w-px h-6 bg-gray-400" />
            )}
          </div>
          <div className={`ml-3 text-sm ${index === 0 ? "text-black" : "text-gray-500"}`}>
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
}
