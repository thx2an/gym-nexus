"use client";

import Link from "next/link";

export default function StaffList({ staff = [] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-secondary text-text-strong">
          <th className="p-3 border border-borderColor-light text-left">Name</th>
          <th className="p-3 border border-borderColor-light text-left">Role</th>
          <th className="p-3 border border-borderColor-light text-left">Phone</th>
          <th className="p-3 border border-borderColor-light text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {staff.map((s, i) => (
          <tr
            key={s.id}
            className={i % 2 === 0 ? "bg-white" : "bg-bg-subtle"}
          >
            <td className="p-3 border border-borderColor-light">{s.name}</td>
            <td className="p-3 border border-borderColor-light">{s.role}</td>
            <td className="p-3 border border-borderColor-light">{s.phone}</td>
            <td className="p-3 border border-borderColor-light">
              <Link
                href={`/manager/staff/form?id=${s.id}`}
                className="text-accent font-semibold"
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
