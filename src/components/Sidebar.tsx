import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export type SidebarStep<T extends string = string> = { id: T; title: string };

type Props<T extends string = string> = {
  steps: ReadonlyArray<SidebarStep<T>>;   // ✅ allow readonly arrays
  activeId: T;
  completedIds?: ReadonlySet<T>;          // ✅ allow ReadonlySet/Set
  onStepClick?: (id: T) => void;          // ✅ typed id, not just string
};

export default function SidebarSteps<T extends string = string>({
  steps,
  activeId,
  completedIds = new Set<T>(),
  onStepClick,
}: Props<T>) {
  return (
    <div className="flex flex-col items-start justify-start">
      {steps.map((step, index) => {
        const isActive = step.id === activeId;
        const isCompleted = completedIds.has(step.id);

        const dotClass = isActive
          ? "bg-[#0068a2] border-[#0068a2]"
          : isCompleted
          ? "bg-[#27ae60] border-[#27ae60]"
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
            className="flex items-start m-0 text-left focus:outline-none w-[100%]"
            onClick={() => onStepClick?.(step.id)}
          >
            <div className="flex flex-col items-center ">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${dotClass}`}>
                <IoIosArrowForward color="#fff" />
              </div>
              {index !== steps.length - 1 && <div className="w-px h-6 bg-gray-400" />}
            </div>
            <div className={`ml-3 w-[100%] text-sm ${labelClass}`}>{step.title}</div>
          </button>
        );
      })}
    </div>
  );
}
