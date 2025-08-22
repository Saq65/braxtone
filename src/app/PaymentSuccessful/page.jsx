"use client";

import { useRouter } from "next/navigation";
import { FaCheck, FaChevronRight, FaChevronDown, FaDownload } from "react-icons/fa";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* V background (two layers to match screenshot edge + gradient) */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className="v-bg-outer mx-auto h-[44vh] max-h-[520px] w-[200vw] -translate-x-1/2 left-1/2 relative"></div>
        <div className="v-bg-inner mx-auto -mt-[38vh] h-[40vh] max-h-[480px] w-[200vw] -translate-x-1/2 left-1/2 relative"></div>
      </div>

      <style jsx>{`
        .v-bg-outer {
          position: relative;
          background: linear-gradient(180deg, #fff7ed 0%, #fff 90%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          filter: drop-shadow(0 2px 0 rgba(255, 237, 213, 0.8));
        }
        .v-bg-inner {
          position: relative;
          background: linear-gradient(180deg, #fff3e3 0%, #fff 95%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          opacity: 0.7;
        }
      `}</style>

      {/* Content */}
      <div className="relative z-[1] mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 sm:pt-16">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">Payment Successful</h1>
          <p className="mt-2 text-base text-neutral-600 sm:text-lg">Your payment has been successfully processed</p>
        </div>

        {/* Success medallion with orbits */}
        <div className="relative mt-8 h-36 w-36">
          {/* orbit dots */}
          <span className="absolute left-1/2 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-indigo-600" />
          <span className="absolute right-4 top-6 h-3 w-3 rounded-full bg-indigo-600/90" />
          <span className="absolute right-1/2 top-1/2 -mr-20 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600/80" />
          <span className="absolute bottom-8 right-6 h-3 w-3 rounded-full bg-indigo-600/80" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-indigo-600/80" />
          <span className="absolute bottom-10 left-8 h-2.5 w-2.5 rounded-full bg-indigo-600/80" />
          <span className="absolute left-1/2 top-1/2 -ml-20 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-600/80" />
          <span className="absolute left-6 top-6 h-3 w-3 rounded-full bg-indigo-600/90" />

          {/* rings */}
          <div className="absolute inset-0 m-auto flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-b from-slate-100 to-white shadow-sm">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-200">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-700 text-white shadow-md">
                <FaCheck className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="rounded-2xl border border-neutral-200/80 bg-white/80 p-0.5 shadow-sm backdrop-blur">
            <div className="rounded-2xl bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-neutral-900">Policy Summary:</p>
                <button className="inline-flex items-center rounded-full p-1 text-neutral-400 hover:text-neutral-700">
                  <FaChevronDown className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-medium">Medgulf Takaful Basic</span>
                </div>
              </div>

              <div className="mt-6 text-sm text-neutral-700">
                <p className="font-medium">Policy Information-</p>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  Insurance Type: Comprehensive / Total Prize: 132 BHD <br />
                  Policy Start Date: 31st August 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex w-full max-w-2xl flex-col items-stretch gap-4">
          <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-700 px-6 py-4 text-base font-medium text-white shadow hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <FaDownload className="h-5 w-5" />
            Download invoice
            <FaChevronRight className="h-5 w-5" />
          </button>

          <button
            onClick={() => router.push("/registration")}
            className="inline-flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl bg-neutral-100 px-6 py-4 text-base font-medium text-neutral-600 shadow-inner hover:bg-neutral-200/70"
          >
            <span>Account Registration</span>
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}