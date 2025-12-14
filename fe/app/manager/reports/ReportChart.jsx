"use client";

export default function ReportChart({ data = [] }) {
  const max = Math.max(...data.map((d) => Number(d.value || 0)), 1);

  const PLOT_HEIGHT = 220;     // vùng vẽ bar (0 → max)
  const LABEL_HEIGHT = 40;     // vùng label (Jan, Feb,…)
  const Y_TICKS = 5;
  const step = Math.ceil(max / Y_TICKS);

  return (
    <div className="rounded-2xl p-6 bg-[#0F141B] border border-[#2A2F38]">
      <div className="flex">
        {/* ================= Y AXIS ================= */}
        <div
          className="flex flex-col justify-between pr-4 text-sm text-gray-400"
          style={{ height: PLOT_HEIGHT }}
        >
          {Array.from({ length: Y_TICKS + 1 }).map((_, i) => {
            const value = step * (Y_TICKS - i);
            return (
              <div key={i} className="leading-none">
                {value}
              </div>
            );
          })}
        </div>

        {/* ================= CHART ================= */}
        <div className="flex-1">
          {/* ===== PLOT AREA ===== */}
          <div
            className="relative"
            style={{ height: PLOT_HEIGHT }}
          >
            {/* GRID */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {Array.from({ length: Y_TICKS + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="border-t border-white/10"
                />
              ))}
            </div>

            {/* BARS */}
            <div className="relative flex justify-around items-end h-full">
              {data.map((item, i) => {
                const value = Number(item.value || 0);
                const barHeight = (value / max) * PLOT_HEIGHT;

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-end h-full"
                  >
                    {/* VALUE */}
                    <span className="mb-2 text-sm text-white">
                      {value}
                    </span>

                    {/* BAR */}
                    <div
                      className="bg-[#6C8AE4]"
                      style={{
                        height: barHeight,
                        width: 18,
                        borderRadius: 6, // 👈 bo góc vuông đẹp
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== LABEL AREA (DƯỚI 0) ===== */}
          <div
            className="flex justify-around items-center text-sm text-gray-300"
            style={{ height: LABEL_HEIGHT }}
          >
            {data.map((item, i) => (
              <span key={i}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
