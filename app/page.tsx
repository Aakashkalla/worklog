import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // If already logged in, go straight to app
  if (session) {
    redirect("/projects");
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold text-neutral-900">
          Worklog
        </span>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto mt-24 max-w-2xl px-6 text-center">
        <h1 className="text-4xl font-semibold text-neutral-900">
          Simple project & task tracking
        </h1>
        <p className="mt-4 text-lg text-neutral-600">
          Create projects, break them into tasks, and stay focused —
          without unnecessary complexity.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
