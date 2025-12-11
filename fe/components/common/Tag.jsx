export default function Tag({ children, color = "accent" }) {
  return (
    <span className={`px-3 py-1 rounded-full text-white bg-${color}`}>
      {children}
    </span>
  );
}
