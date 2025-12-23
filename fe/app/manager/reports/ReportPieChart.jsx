"use client";

export default function ReportPieChart({ data = [], totalLabel = "Total", valueSuffix = "" }) {
  const cleaned = data
    .map((item) => ({
      label: item.label,
      value: Number(item.value || 0),
    }))
    .filter((item) => item.value > 0);

  const total = cleaned.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    "#6C8AE4",
    "#22C55E",
    "#F97316",
    "#E11D48",
    "#A855F7",
    "#0EA5E9",
    "#FACC15",
  ];

  if (total === 0) {
    return (
      <div className="rounded-2xl p-6 bg-[#0F141B] border border-[#2A2F38] text-gray-400">
        No registrations in this period.
      </div>
    );
  }

  const radius = 80;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="rounded-2xl p-6 bg-[#0F141B] border border-[#2A2F38] grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="#1F2937"
            strokeWidth={strokeWidth}
          />
          {cleaned.map((item, index) => {
            const fraction = item.value / total;
            const dash = fraction * circumference;
            const offset = circumference * (1 - cumulative);
            cumulative += fraction;

            return (
              <circle
                key={item.label}
                cx="100"
                cy="100"
                r={radius}
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
      </div>

      <div className="lg:col-span-2 flex flex-col justify-center">
        <div className="text-xs uppercase tracking-wide text-gray-400">{totalLabel}</div>
        <div className="text-2xl font-bold text-white">
          {total.toLocaleString()} {valueSuffix}
        </div>

        <div className="mt-4 space-y-2">
          {cleaned.map((item, index) => {
            const percent = Math.round((item.value / total) * 100);
            return (
              <div key={item.label} className="flex items-center justify-between text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                <span className="text-gray-400">{item.value} ({percent}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
