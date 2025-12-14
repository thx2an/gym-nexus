"use client";

import { Calendar } from "lucide-react";

export default function ReportFilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-6 p-4 mb-6 bg-[#1A1F26] rounded-xl border border-[#2A2F38] shadow-md">
      {/* FROM */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">
          From
        </label>

        <div className="relative">
          <input
            type="date"
            value={filters.from}
            onChange={(e) =>
              setFilters({ ...filters, from: e.target.value })
            }
            className="
              w-44
              rounded-lg px-3 py-2 pr-10
              bg-[#0F141B]
              border border-[#2A2F38]
              text-sm text-white
              focus:outline-none focus:border-[#3B82F6]
              appearance-none
            "
          />

          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
          />
        </div>
      </div>

      {/* TO */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1">
          To
        </label>

        <div className="relative">
          <input
            type="date"
            value={filters.to}
            onChange={(e) =>
              setFilters({ ...filters, to: e.target.value })
            }
            className="
              w-44
              rounded-lg px-3 py-2 pr-10
              bg-[#0F141B]
              border border-[#2A2F38]
              text-sm text-white
              focus:outline-none focus:border-[#3B82F6]
              appearance-none
            "
          />

          <Calendar
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
