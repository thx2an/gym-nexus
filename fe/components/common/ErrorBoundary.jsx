"use client";

import { useState } from "react";

export default function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-notify-errorText">Something went wrong.</h2>
        <p className="text-text-medium mt-2">{error.message}</p>
      </div>
    );
  }

  return children;
}
