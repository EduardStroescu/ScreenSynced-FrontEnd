import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: () => (
    <section className="flex h-[100vh] w-full flex-col items-center justify-center gap-24">
      <h2 className="text-center text-7xl text-red-500">
        Oops! This page is unavailable!
      </h2>
      <Link
        to="/"
        className="rounded-xl bg-cyan-500 p-3 text-xl hover:bg-cyan-600"
      >
        Return Home
      </Link>
    </section>
  ),
});
