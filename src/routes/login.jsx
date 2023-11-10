import { FileRoute } from "@tanstack/react-router";
import { SignInForm } from "../components";

export const route = new FileRoute("/login").createRoute({
  component: () => {
    return (
      <section className="flex h-[100vh] w-full flex-col items-center justify-center bg-[url('/pageBackground.jpg')]">
        <SignInForm acceptsRedirect={true} />
      </section>
    );
  },
});
