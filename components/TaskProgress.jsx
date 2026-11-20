export default function TaskProgress({ total, completed }) {
  return (
    <section aria-labelledby="progress-heading" className="mb-5 rounded-3xl border border-blue-200 bg-white/85 p-4 shadow-sm sm:p-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-1">
        <h2 id="progress-heading" className="font-semibold">Your progress</h2>
        <p className="text-sm font-semibold text-blue-800">{completed} of {total} completed</p>
      </div>
      <progress
        aria-labelledby="progress-heading"
        aria-valuetext={completed + " of " + total + " tasks completed"}
        value={completed}
        max={total || 1}
        className="block h-2.5 w-full overflow-hidden rounded-full bg-blue-100 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-blue-700 [&::-webkit-progress-bar]:bg-blue-100 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-700"
      />
    </section>
  );
}
