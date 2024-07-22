import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "../components";
import { isAuthenticated } from "../lib/isAuthenticated";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => {
    return (
      <section className="flex min-h-[100vh] w-full flex-col items-center justify-center bg-[url('/pageBackground.jpg')] px-4 pb-4 pt-14 sm:p-0">
        <SignInForm acceptsRedirect={true} />
      </section>
    );
  },
});
