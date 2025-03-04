import { DemoAccountLogin } from "@components/DemoAccountLogin";
import { CloseIcon } from "@components/Icons";
import { Separator } from "@components/Separator";
import { ThirdPartyLogin } from "@components/ThirdPartyLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { signInFormSchema } from "@lib/types";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export function SignInForm({ acceptsRedirect = false }) {
  const navigate = useNavigate({ from: "/" });

  const { signIn } = useAuthContext();
  const { setOverlayType } = useOverlayContext();

  const { mutateAsync: handleSignInMutation, isPending } = signIn;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(signInFormSchema),
  });

  const signInForm = async (values) => {
    await handleSignInMutation(values, {
      onSuccess: () => {
        reset();
        acceptsRedirect && navigate({ to: "/account" });
      },
    });
  };

  return (
    <section className="flex w-full min-w-[10rem] max-w-[30rem] flex-col justify-center gap-4 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black lg:w-[50%]">
      <header className="mb-2 flex flex-col">
        {!acceptsRedirect && (
          <button
            onClick={() => setOverlayType(null)}
            className="self-end text-white"
          >
            <CloseIcon
              aria-label="Close panel"
              className={"hover:stroke-cyan-500"}
            />
          </button>
        )}
        <h1 className="self-center font-londrina text-5xl text-white">
          Log In
        </h1>
      </header>
      <div className="flex flex-col gap-2">
        <ThirdPartyLogin />
      </div>
      <Separator>
        <p className="z-[2] bg-[#070B11] px-2 text-center text-white">Or</p>
      </Separator>
      <section className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(signInForm)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.email && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.email.message}
            </p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.password && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.password.message}
            </p>
          )}

          <button
            className="mt-2 w-1/2 rounded border-2 border-cyan-500 bg-[#005f70] py-1 text-white hover:bg-cyan-500"
            type="submit"
            value="Send"
            disabled={isPending}
          >
            {!isPending ? "Log In" : "Loading..."}
          </button>
        </form>
        <nav className="w-full py-4">
          <p className="inline text-white">New to ScreenSynced? </p>
          <button
            onClick={() => {
              acceptsRedirect
                ? navigate({ to: "/signup" })
                : setOverlayType("sign-up");
            }}
            className="whitespace-nowrap text-cyan-500 hover:text-cyan-400"
          >
            Sign Up
          </button>
        </nav>
        <DemoAccountLogin
          acceptsRedirect={acceptsRedirect}
          isLoading={isPending}
          setIsLoading={isPending}
        />
      </section>
    </section>
  );
}

SignInForm.propTypes = {
  acceptsRedirect: PropTypes.bool,
};
