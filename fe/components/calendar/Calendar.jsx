"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar({ selectedDate, onDateSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  // Move Month
  const prevMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(year, currentMonth.getMonth() + 1, 1));
  };

  // Generate days
  const firstDay = new Date(year, currentMonth.getMonth(), 1);
  const lastDay = new Date(year, currentMonth.getMonth() + 1, 0);
  const startDayIndex = firstDay.getDay(); // 0–6
  const daysInMonth = lastDay.getDate();

  const weeks = [];
  let dayCounter = 1;

  for (let week = 0; week < 6; week++) {
    const days = [];

    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      if ((week === 0 && dayIdx < startDayIndex) || dayCounter > daysInMonth) {
        days.push(null);
      } else {
        days.push(dayCounter);
        dayCounter++;
      }
    }

    weeks.push(days);
  }

  const formatDate = (day) => {
    return `${year}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isToday = (day) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === currentMonth.getMonth() &&
      today.getFullYear() === year
    );
  };

  return (
    <div className="w-full bg-primarySurface p-4 rounded-lg shadow border border-borderColor-light">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded hover:bg-bg-subtle">
          <ChevronLeft className="w-5 h-5 text-text-strong" />
        </button>

        <h2 className="text-xl font-semibold text-text-strong">
          {monthName} {year}
        </h2>

        <button onClick={nextMonth} className="p-2 rounded hover:bg-bg-subtle">
          <ChevronRight className="w-5 h-5 text-text-strong" />
        </button>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center text-text-medium text-sm mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, i) => {
          const dateStr = day ? formatDate(day) : null;

          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={i}
              disabled={!day}
              onClick={() => onDateSelect(dateStr)}
              className={`
                h-10 rounded flex items-center justify-center text-sm transition
                ${!day ? "bg-transparent" : ""}
                ${day ? "border border-borderColor-light bg-white hover:bg-bg-subtle" : ""}
                ${isToday(day) ? "font-bold border-accent text-accent" : ""}
                ${isSelected ? "bg-accent text-white font-semibold" : ""}
              `}
            >
              {day || ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
