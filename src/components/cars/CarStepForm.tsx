'use client'
import { useState } from 'react'

type Car = {
  year: string
  manufacturer: string
  company: string
  model: string
}

export default function CarStepForm({
  onComplete,
  onCancel,
}: {
  onComplete: (car: Car) => void
  onCancel: () => void
}) {
  const [step, setStep] = useState(1)
  const [year, setYear] = useState('')
  const [company, setCompany] = useState('')
  const [model, setModel] = useState('')
  const [manufacturer, setManufacturer] = useState('')

  const years = Array.from({ length: 20 }, (_, i) => `${2026 - i}`)
  const companies = ["Acura", "BMW", "Audi", "Toyota"]
  const models = ["copper", "sample1", "sample2"]
  const manufacturers = ['5/40xi 4WD', '4/20i RWD', '3/10xi AWD']


  const totalSteps = 4

  return (
    <div className=''>
      <button className="w-[390px] ml-4 border border-dashed border-gray-400 p-8 rounded-lg text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
        + Add car
      </button>

      <div className="relative mx-end max-w-5/5  pt-6 pb-2 border border-[#d2d0d0] p-4 h-[270px] rounded-md mt-14 ml-4">
        <button
          onClick={() => {
            onCancel()
          }} className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ×
        </button>

        {step === 1 && (
          <>
            <h2 className="text-sm font-medium mb-3 text-gray-800">Select the production year</h2>
            <div className="relative mb-4">
              <select
                className="w-full border h-13 border-gray-300 px-4 py-2.5 rounded-lg text-[14px] text-gray-800 appearance-none focus:outline-none  "
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">▼</div>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!year}
              onBack={onCancel}
              onNext={() => setStep(2)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-sm font-medium mb-3 text-gray-800">Select the car manufacturing company</h2>
            <div className="relative mb-4">
              <select
                className="w-full h-13 border border-gray-300 px-4 py-2.5 rounded-lg text-[14px] text-gray-800 appearance-none focus:outline-none "
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">Select</option>
                {companies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">▼</div>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!company}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          </>
        )}


        {step === 3 && (
          <>
            <h2 className="text-sm font-medium mb-3 text-gray-800">Select the car model</h2>
            <div className="relative mb-4">
              <select
                className="w-full h-13 border border-gray-300 px-4 py-2.5 rounded-lg text-[14px] text-gray-800 appearance-none focus:outline-none "
                value={company}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="">Select</option>
                {models.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">▼</div>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <StepNavigation
              canContinue={!!model}
              onBack={() => setStep(2)}
              onNext={() => setStep(4)}
            />
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-sm font-medium mb-3 text-gray-800">Select the car body style</h2>
            <div className="relative mb-4">
              <select
                className=" h-13 w-full border border-gray-300 px-4 py-4 rounded text-[14px] text-gray-800 appearance-none focus:outline-none "
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
              >
                <option value="">Select</option>
                {manufacturers.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-sm">▼</div>
            </div>

            <ProgressBar step={step} totalSteps={totalSteps} />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep(3)}
                className=" rounded-md w-[180px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
              >
                Back
              </button>
              <button
                onClick={() => onComplete({ year, company, manufacturer, model })}
                disabled={!manufacturer}
                className=" rounded-md w-[180px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
              >
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="h-[6px] w-full  bg-gray-200 rounded my-4">
      <div
        className="h-full bg-[#0068a2] rounded transition-all duration-300"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>
  )
}

function StepNavigation({
  onBack,
  onNext,
  canContinue,
}: {
  onBack: () => void
  onNext: () => void
  canContinue: boolean
}) {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={onBack}
        className=" rounded-md w-[180px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canContinue}
        className=" rounded-md w-[180px] py-4 mt-3 text-sm text-gray-600 hover:bg-gray-100 border border-gray-100"
      >
        Next
      </button>
    </div>
  )
}
