import { FileRoute, Link } from "@tanstack/react-router";

export const route = new FileRoute("$").createRoute({
  component: () => {
    return (
      <section className="flex h-[100vh] w-full flex-col items-center justify-center gap-10">
        <h2 className="text-center text-7xl text-red-500">
          Oops! This page is unavailable!
        </h2>
        <Link to="/" className=" rounded-xl bg-cyan-500 p-4">
          Return Home
        </Link>
      </section>
    );
  },
});
