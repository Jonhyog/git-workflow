"use client";

import { useCallback } from "react";

export type TodoItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <li className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3">
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
        className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-600"
        aria-label={`Mark "${text}" as ${completed ? "incomplete" : "complete"}`}
      />
      <span
        className={`flex-1 text-zinc-900 dark:text-zinc-100 ${
          completed ? "line-through text-zinc-500 dark:text-zinc-400" : ""
        }`}
      >
        {text}
      </span>
      <button
        type="button"
        onClick={handleDelete}
        className="rounded px-2 py-1 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
        aria-label={`Delete "${text}"`}
      >
        Delete
      </button>
    </li>
  );
}
