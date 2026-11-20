import { useId, useRef, useState } from "react";

export default function TaskItem({ task, onEdit, onToggle, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const editButton = useRef(null);
  const editInput = useRef(null);

  function finishEditing() {
    setEditing(false);
    requestAnimationFrame(() => editButton.current?.focus());
  }

  function save(event) {
    event.preventDefault();
    const title = draftTitle.trim();
    if (!title) return;

    onEdit(task.id, title, draftDescription.trim());
    finishEditing();
  }

  function startEditing() {
    setDraftTitle(task.title);
    setDraftDescription(task.description);
    setEditing(true);
    requestAnimationFrame(() => editInput.current?.focus());
  }

  return (
    <li className="rounded-xl border border-slate-200 px-3 py-2.5 sm:px-4">
      {editing ? (
        <form
          onSubmit={save}
          onKeyDown={(event) => {
            if (event.key === "Escape") finishEditing();
          }}
          className="space-y-3"
        >
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={editInput}
              aria-label="Edit task title"
              value={draftTitle}
              maxLength={200}
              required
              onChange={(event) => setDraftTitle(event.target.value)}
              className="min-w-32 flex-1 rounded-lg border border-slate-400 px-2 py-2"
            />
            <button type="submit" disabled={!draftTitle.trim()} className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-600">Save</button>
            <button type="button" onClick={finishEditing} className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
          </div>
          <div>
            <label htmlFor={descriptionId} className="mb-2 block text-sm font-semibold">
              Description <span className="font-normal text-slate-600">(optional)</span>
            </label>
            <textarea
              id={descriptionId}
              value={draftDescription}
              onChange={(event) => setDraftDescription(event.target.value)}
              rows={2}
              className="block w-full resize-y rounded-lg border border-slate-400 px-2 py-2"
            />
          </div>
        </form>
      ) : (
        <div className="flex items-start gap-2 sm:gap-3">
          <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 py-2">
            <input
              type="checkbox"
              aria-labelledby={titleId}
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-blue-700"
            />
            <span className="min-w-0 wrap-anywhere">
              <span id={titleId} className={task.completed ? "text-slate-600 line-through" : undefined}>
                {task.title}
              </span>
              {!task.completed && task.description && (
                <span className="mt-1 block text-sm whitespace-pre-wrap text-slate-600">
                  {task.description}
                </span>
              )}
            </span>
          </label>
          <button ref={editButton} type="button" aria-label={"Edit " + task.title} onClick={startEditing} className="rounded-lg px-2 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50">Edit</button>
          <button type="button" aria-label={"Delete " + task.title} onClick={() => onDelete(task.id)} className="rounded-lg px-2 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Delete</button>
        </div>
      )}
    </li>
  );
}
