"use client";

import { useState, useCallback } from "react";

export type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onAdd(trimmed);
        setValue("");
      }
    },
    [value, onAdd]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="What needs to be done?"
        className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
        aria-label="New todo text"
      />
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        Add
      </button>
    </form>
  );
}
