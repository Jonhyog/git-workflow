"use client";

import Link from "next/link";
import TodoList from "./TodoList";

export default function ExamplePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 py-16 px-8 bg-white dark:bg-black sm:px-16">
        <nav className="flex gap-4 text-base font-medium">
          <Link
            href="/"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Home
          </Link>
          <Link
            href="/slides"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            View slides
          </Link>
        </nav>
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Demo: TODOs
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Add items, toggle completion, and delete.
        </p>
        <TodoList />
      </main>
    </div>
  );
}
