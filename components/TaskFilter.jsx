const filters = ["All", "Active", "Completed"];

export default function TaskFilter({ filter, onChange }) {
  return (
    <div role="group" aria-label="Filter tasks" className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 sm:w-fit">
      {filters.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={filter === option}
          onClick={() => onChange(option)}
          className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white/70 aria-pressed:bg-white aria-pressed:text-blue-800 aria-pressed:shadow-sm sm:px-4"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
