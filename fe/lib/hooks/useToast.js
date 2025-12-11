"use client";

import { useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 2500);
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "info" });
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
