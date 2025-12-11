export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 bg-bg-subtle rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-text-strong">
        {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 bg-bg-subtle rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
