"use client";

export default function ReportChart({ data }) {
  return (
    <div className="bg-white p-6 border border-borderColor-light rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Chart (Mocked)</h3>

      <div className="flex items-end gap-4 h-48">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className="w-6 bg-accent rounded-md"
              style={{ height: `${item.value}px` }}
            />
            <p className="text-xs text-text-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
