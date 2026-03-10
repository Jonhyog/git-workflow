import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-12 px-8 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Git Workflow
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Choose where you&apos;d like to go
          </p>
        </div>
        <nav className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:gap-6">
          <Link
            className="flex h-14 w-full min-w-[200px] items-center justify-center rounded-xl bg-black px-8 text-lg text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 sm:w-auto"
            href="/slides"
          >
            Open presentation
          </Link>
          <Link
            className="flex h-14 w-full min-w-[200px] items-center justify-center rounded-xl border border-zinc-300 px-8 text-lg transition-colors hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-800 sm:w-auto"
            href="/demo"
          >
            Try the demo
          </Link>
        </nav>
      </main>
    </div>
  );
}
