"use client";

import Link from "next/link";

export default function Sidebar({ menu }) {
  return (
    <aside className="w-64 bg-primarySurface border-r border-borderColor-light h-full p-4">
      <h2 className="text-xl font-semibold text-text-strong mb-4">Menu</h2>

      <ul className="space-y-2">
        {menu?.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              className="block p-2 rounded-lg hover:bg-bg-subtle text-text-strong"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
