import { FileRoute, redirect } from "@tanstack/react-router";
import { SignUpForm } from "../components";
import { isAuthenticated } from "../lib/isAuthenticated";

export const route = new FileRoute("/signup").createRoute({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => {
    return (
      <section className="flex h-[100vh] w-full flex-col items-center justify-center bg-[url('/pageBackground.jpg')]">
        <SignUpForm acceptsRedirect={true} />
      </section>
    );
  },
});
