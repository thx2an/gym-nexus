"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ExitModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      {/* Background overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(0,10,8,0.25)] border border-borderColor-light w-full max-w-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-text-strong mb-3">
            Confirm Exit
          </h2>
          <p className="text-text-medium mb-6">
            Are you sure you want to exit to home page?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-text-medium text-text-medium 
                         hover:bg-black/5 transition"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-btnPrimary-hover transition"
            >
              Exit
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
