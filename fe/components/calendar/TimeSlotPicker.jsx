"use client";

export default function TimeSlotPicker({
  slots = [],
  selected,
  onSelect,
  disabledSlots = [],
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
      {slots.map((slot, i) => {
        const isDisabled = disabledSlots.includes(slot);
        const isSelected = selected === slot;

        return (
          <button
            key={i}
            onClick={() => !isDisabled && onSelect(slot)}
            disabled={isDisabled}
            className={`
              p-3 rounded-lg border text-center transition
              ${
                isSelected
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-text-strong border-borderColor-light hover:bg-bg-subtle"
              }
              ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
