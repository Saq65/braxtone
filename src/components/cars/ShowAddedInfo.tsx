"use client";

import React, { useState, useEffect } from "react";

interface ShowAddedInfoProps {
  title: string;
  entries: { [key: string]: string }[];
}

export default function ShowAddedInfo({ title, entries }: ShowAddedInfoProps) {
  const [displayedEntries, setDisplayedEntries] = useState(
    entries.map((entry) => ({ data: entry, animate: false }))
  );

  useEffect(() => {
    if (entries.length > 0) {
      const latest = entries[entries.length - 1];
      setDisplayedEntries((prev) => [...prev, { data: latest, animate: false }]);
      setTimeout(() => {
        setDisplayedEntries((prev) =>
          prev.map((entry, index) =>
            index === prev.length - 1 ? { ...entry, animate: true } : entry
          )
        );
      }, 500);
    }
  }, [entries]);

  return (
    <div className="space-y-4 mt-10 px-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="space-y-2">
        {displayedEntries.map((entry, idx) => (
          <div
            key={idx}
            className={`text-gray-800 font-medium transition-all duration-700 ${
              entry.animate ? "translate-y-[-12px] opacity-60" : "opacity-100"
            }`}
          >
            {Object.values(entry.data).filter(Boolean).join(" ")}
          </div>
        ))}
      </div>
    </div>
  );
}
