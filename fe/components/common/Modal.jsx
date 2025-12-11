export default function Modal({ open, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-primarySurface p-6 rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  );
}
