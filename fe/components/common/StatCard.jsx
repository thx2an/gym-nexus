export default function StatCard({ title, value, icon }) {
  return (
    <div className="p-5 bg-white rounded-lg border border-borderColor-light shadow">
      <div className="flex items-center gap-3">
        {icon && <div className="text-accent w-8 h-8">{icon}</div>}
        <div>
          <p className="text-text-medium text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-text-strong">{value}</h3>
        </div>
      </div>
    </div>
  );
}
