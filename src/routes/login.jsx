import { FileRoute, redirect } from "@tanstack/react-router";
import { SignInForm } from "../components";
import { isAuthenticated } from "../lib/isAuthenticated";

export const route = new FileRoute("/login").createRoute({
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
        <SignInForm acceptsRedirect={true} />
      </section>
    );
  },
});
