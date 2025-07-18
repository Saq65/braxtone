"use client";

import { motion } from "framer-motion";

export default function CarOrDriver() {
  return (
    <motion.div
      className="flex gap-6 justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-md px-10 py-6 cursor-pointer hover:bg-blue-100 transition-all">
        <h3 className="text-xl font-semibold text-gray-700">Car</h3>
      </div>
      <div className="bg-white rounded-xl shadow-md px-10 py-6 cursor-pointer hover:bg-blue-100 transition-all">
        <h3 className="text-xl font-semibold text-gray-700">Driver</h3>
      </div>
    </motion.div>
  );
}
