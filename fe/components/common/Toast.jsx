"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, show, onClose }) {
  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 bg-text-strong text-white px-4 py-3 rounded-lg shadow-lg z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {message}

        <button
          onClick={onClose}
          className="ml-3 text-accent underline text-sm"
        >
          Close
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
