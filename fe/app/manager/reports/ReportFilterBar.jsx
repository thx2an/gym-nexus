"use client";

export default function ReportFilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 bg-bg-subtle p-4 rounded-lg border border-borderColor-light mb-6">
      
      {/* Date Range */}
      <div>
        <label className="text-sm text-text-medium">From</label>
        <input
          type="date"
          className="p-2 border rounded-lg block"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm text-text-medium">To</label>
        <input
          type="date"
          className="p-2 border rounded-lg block"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        />
      </div>
    </div>
  );
}
