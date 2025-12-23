"use client";

import { useEffect, useState } from "react";
import ReportFilterBar from "../ReportFilterBar";
import ReportPieChart from "../ReportPieChart";
import reportApi from "@/lib/api/reportApi";

const formatDateInput = (date) => date.toLocaleDateString("en-CA");

const formatDisplayDate = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
};

export default function RevenueReportPage() {
  const [filters, setFilters] = useState(() => {
    const now = new Date();
    return {
      from: formatDateInput(new Date(now.getFullYear(), now.getMonth(), 1)),
      to: formatDateInput(now),
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fromDate = new Date(filters.from);
    const toDate = new Date(filters.to);

    if (!filters.from || !filters.to) {
      setError("Please select both dates.");
      return;
    }
    if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
      setError("Invalid date range.");
      return;
    }
    if (fromDate > toDate) {
      setError("From date must be before To date.");
      return;
    }

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await reportApi.revenue({
          from: filters.from,
          to: filters.to,
        });

        if (res?.success) {
          setTotalRevenue(res.data?.total_revenue || 0);
          const packages = (res.data?.packages || []).map((item) => ({
            label: item.name,
            value: item.registrations,
          }));
          setPackageData(packages);
        } else {
          setError("Failed to load revenue report.");
        }
      } catch (err) {
        console.error("Failed to load revenue report", err);
        setError("Failed to load revenue report.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">Revenue Report</h1>
        <p className="text-sm text-gray-400">
          Revenue from {formatDisplayDate(filters.from)} to {formatDisplayDate(filters.to)}
        </p>
      </div>

      <ReportFilterBar filters={filters} setFilters={setFilters} />

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="rounded-2xl p-6 bg-[#0F141B] border border-[#2A2F38]">
        <div className="text-xs uppercase tracking-wide text-gray-400">Total Revenue (VND)</div>
        <div className="text-3xl font-bold text-white">
          {Number(totalRevenue).toLocaleString()}
        </div>
      </div>

      {loading ? (
        <div className="text-gray-400">Loading report...</div>
      ) : (
        <ReportPieChart
          data={packageData}
          totalLabel="Registered Packages"
          valueSuffix="registrations"
        />
      )}
    </div>
  );
}
