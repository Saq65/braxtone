// SidebarSteps.tsx
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type Step = { id: string; title: string };
type Props = {
  steps: Step[];
  activeId: string;
  completedIds?: Set<string>;
  onStepClick?: (id: string) => void;
};

export default function SidebarSteps({
  steps,
  activeId,
  completedIds = new Set(),
  onStepClick,
}: Props) {
  return (
    <div className="flex flex-col items-start space-y-4 p-6">
      {steps.map((step, index) => {
        const isActive = step.id === activeId;
        const isCompleted = completedIds.has(step.id);
        const dotClass = isActive
          ? "bg-[#0068a2] border-[#0068a2]"
          : isCompleted
          ? "bg-[#27ae60] border-[#27ae60]" // completed = green
          : "bg-[#919191] border-[#919191]";

        const labelClass = isActive
          ? "text-black"
          : isCompleted
          ? "text-gray-800"
          : "text-gray-500";

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick?.(step.id)}
            className="flex items-start m-0 text-left focus:outline-none"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${dotClass}`}
              >
                <IoIosArrowForward color="#fff" />
              </div>
              {index !== steps.length - 1 && (
                <div className="w-px h-6 bg-gray-400" />
              )}
            </div>
            <div className={`ml-3 text-sm ${labelClass}`}>{step.title}</div>
          </button>
        );
      })}
    </div>
  );
}
