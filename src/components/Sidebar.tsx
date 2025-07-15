type Step = {
  label: string;
  completed: boolean;
  current: boolean;
};

const steps: Step[] = [
  { label: 'About You', completed: false, current: true },
  { label: 'Cars', completed: false, current: false },
  { label: 'Drivers', completed: false, current: false },
  { label: 'How you drive', completed: false, current: false },
  { label: 'Quote', completed: false, current: false },
];

export default function SidebarSteps() {
  return (
    <ul className="flex flex-col space-y-2">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-2 text-sm">
          <div
            className={`rounded-full w-4 h-4 ${
              step.current
                ? 'bg-blue-500'
                : step.completed
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
          {step.label}
        </li>
      ))}
    </ul>
  );
}
