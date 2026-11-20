import TaskItem from "./TaskItem";

const emptyMessages = {
  All: ["No tasks yet", "Add a task above to get started."],
  Active: ["No active tasks", "New and reopened tasks will appear here."],
  Completed: ["No completed tasks", "Check off a task to see it here."],
};

export default function TaskList({ tasks, filter, onEdit, onToggle, onDelete }) {
  if (!tasks.length) {
    const [heading, description] = emptyMessages[filter];
    return (
      <div role="status" className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-9 text-center">
        <p className="font-semibold">{heading}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
