export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-text-strong">{title}</h1>
      {subtitle && (
        <p className="text-text-medium mt-1">{subtitle}</p>
      )}
    </div>
  );
}
