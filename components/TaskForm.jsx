import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd(trimmed, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={submit} className="mb-6">
      <label htmlFor="new-task" className="mb-2 block text-sm font-semibold">New task</label>
      <div className="flex gap-2">
        <input
          id="new-task"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What do you need to do?"
          maxLength={200}
          required
          className="min-w-0 flex-1 rounded-xl border border-slate-400 px-3 py-3 placeholder:text-slate-500 sm:px-4"
        />
        <button type="submit" className="rounded-xl bg-blue-700 px-5 font-semibold text-white hover:bg-blue-800">Add</button>
      </div>
      <label htmlFor="new-task-description" className="mt-3 mb-2 block text-sm font-semibold">
        Description <span className="font-normal text-slate-600">(optional)</span>
      </label>
      <textarea
        id="new-task-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={2}
        className="block w-full resize-y rounded-xl border border-slate-400 px-3 py-3 sm:px-4"
      />
    </form>
  );
}
