import { FileRoute } from "@tanstack/react-router";
import { SignUpForm } from "../components";

export const route = new FileRoute("/signup").createRoute({
  component: () => {
    return (
      <section className="flex h-[100vh] w-full flex-col items-center justify-center bg-[url('/pageBackground.jpg')]">
        <SignUpForm acceptsRedirect={true} />
      </section>
    );
  },
});
