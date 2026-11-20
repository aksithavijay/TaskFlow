"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import TaskProgress from "./TaskProgress";

const storageKey = "taskflow.tasks.v1";

function readTasks() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey));
    if (!Array.isArray(saved)) return [];

    const ids = new Set();
    const validTasks = saved.filter((task) => {
      if (
        !task ||
        typeof task.id !== "string" ||
        !task.id ||
        ids.has(task.id) ||
        typeof task.title !== "string" ||
        !task.title.trim() ||
        typeof task.completed !== "boolean"
      ) return false;

      ids.add(task.id);
      return true;
    });

    return validTasks.map((task) => ({
      ...task,
      description: typeof task.description === "string" ? task.description.trim() : "",
    }));
  } catch {
    return [];
  }
}

function TaskBoard() {
  const [tasks, setTasks] = useState(readTasks);
  const [filter, setFilter] = useState("All");

  function updateTasks(nextTasks) {
    setTasks(nextTasks);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextTasks));
    } catch {
      // Tasks still work for the current visit when storage is unavailable.
    }
  }

  function addTask(title, description) {
    const id = Array.from(crypto.getRandomValues(new Uint32Array(4)), (part) =>
      part.toString(16).padStart(8, "0"),
    ).join("");
    updateTasks([...tasks, { id, title, description, completed: false }]);
  }

  function editTask(id, title, description) {
    updateTasks(tasks.map((task) =>
      task.id === id ? { ...task, title, description } : task,
    ));
  }

  function toggleTask(id) {
    updateTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ));
  }

  function deleteTask(id) {
    updateTasks(tasks.filter((task) => task.id !== id));
  }

  const completed = tasks.filter((task) => task.completed).length;
  const remaining = tasks.length - completed;
  const visibleTasks = tasks.filter((task) =>
    filter === "All" || task.completed === (filter === "Completed"),
  );

  return (
    <>
      <TaskProgress total={tasks.length} completed={completed} />
      <section aria-label="Tasks" className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7">
        <TaskForm onAdd={addTask} />
        <TaskFilter filter={filter} onChange={setFilter} />
        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onEdit={editTask}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <p aria-live="polite" className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-600">
          {remaining} {remaining === 1 ? "task" : "tasks"} remaining
        </p>
      </section>
    </>
  );
}

// Mount the task board in the browser, where localStorage is available.
const ClientTaskBoard = dynamic(() => Promise.resolve(TaskBoard), {
  ssr: false,
  loading: () => <p role="status" className="text-slate-600">Loading tasks…</p>,
});

export default function TaskApp() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-10 pb-12 sm:px-8 sm:pt-20">
      <header className="mb-8">
        <div aria-hidden="true" className="mb-5 grid size-13 place-items-center rounded-2xl bg-blue-700 text-2xl font-bold text-white shadow-md shadow-blue-700/20">✓</div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">TaskFlow</h1>
        <p className="mt-2 text-slate-600">Stay organized, one task at a time.</p>
      </header>
      <ClientTaskBoard />
    </main>
  );
}
