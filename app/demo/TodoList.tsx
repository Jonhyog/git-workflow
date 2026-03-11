"use client";

import { useState, useCallback } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

function createId() {
  return crypto.randomUUID?.() ?? Date.now().toString();
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  const addTodo = useCallback((text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: createId(), text, completed: false },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <TodoInput onAdd={addTodo} />
      {totalCount > 0 && (
        <>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {completedCount} of {totalCount} completed
          </p>
          <button
            type="button"
            onClick={clearCompleted}
            className="self-start rounded-lg border border-zinc-300 dark:border-zinc-600 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Clear completed
          </button>
        </>
      )}
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
