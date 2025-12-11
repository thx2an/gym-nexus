export default function Badge({ label }) {
  return (
    <span className="px-2 py-1 text-xs rounded bg-bg-subtle text-text-medium border border-borderColor-light">
      {label}
    </span>
  );
}
