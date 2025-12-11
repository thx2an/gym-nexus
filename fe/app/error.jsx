"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-error-bg text-notify-errorText p-6">

      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>

      <p className="text-lg mb-6">{error?.message || "Unexpected error."}</p>

      <button
        onClick={() => reset()}
        className="px-5 py-2 bg-btnPrimary hover:bg-btnPrimary-hover rounded-lg text-btnPrimary-text"
      >
        Try Again
      </button>

    </div>
  );
}
