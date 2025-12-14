export const metadata = {
  title: "Authentication – GymNexus",
};

export default function AuthLayout({ children }) {
  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        relative
        overflow-hidden
        text-[#f0f0f0]
      "
      style={{ backgroundColor: "#000014" }}
    >
      {/* Subtle glow – giống Home */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#f0f0f0" }}
        />
        <div
          className="absolute bottom-20 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: "#f0f0f0" }}
        />
      </div>

      {/* Page content */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
