import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-text-medium flex items-center gap-1 mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ) : (
            <span className="text-text-strong">{item.label}</span>
          )}
          {i < items.length - 1 && <span> / </span>}
        </span>
      ))}
    </nav>
  );
}
