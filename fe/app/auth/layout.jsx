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
        bg-gradient-to-br
        from-[#0f0c29]
        via-[#1a1a2e]
        to-[#16213e]
        relative
        overflow-hidden
      "
    >
      {/* ===== Glow Effects ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
      </div>

      {/* ===== Auth Content ===== */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
