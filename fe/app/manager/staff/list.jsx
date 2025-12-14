"use client";

import Link from "next/link";

export default function StaffList({ staff = [] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-[#2A2F38]">
          <th className="p-3 text-left font-medium text-gray-400">
            Name
          </th>
          <th className="p-3 text-left font-medium text-gray-400">
            Role
          </th>
          <th className="p-3 text-left font-medium text-gray-400">
            Phone
          </th>
          <th className="p-3 text-left font-medium text-gray-400">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {staff.map((s, i) => (
          <tr
            key={s.id}
            className={`border-b border-[#2A2F38] transition ${
              i % 2 === 0 ? "bg-[#0F141B]" : "bg-transparent"
            } hover:bg-[#1F2937]`}
          >
            <td className="p-3 text-white">
              {s.name}
            </td>
            <td className="p-3 text-gray-300">
              {s.role}
            </td>
            <td className="p-3 text-gray-300">
              {s.phone}
            </td>
            <td className="p-3">
              <Link
                href={`/manager/staff/form?id=${s.id}`}
                className="text-blue-400 hover:underline font-medium"
              >
                Edit →
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
