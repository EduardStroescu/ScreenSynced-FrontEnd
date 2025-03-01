import { CloseIcon } from "@components/Icons";
import { Separator } from "@components/Separator";
import { ThirdPartyLogin } from "@components/ThirdPartyLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeholderAvatar } from "@lib/const";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { signUpFormSchema } from "@lib/types";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export function SignUpForm({ acceptsRedirect = false }) {
  const navigate = useNavigate({ from: "/" });
  const { signUp } = useAuthContext();
  const { setOverlayType } = useOverlayContext();

  const { mutateAsync: handleSignUpMutation, isPending } = signUp;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      confirmPassword: "",
      avatar: placeholderAvatar,
    },
    mode: "onSubmit",
    resolver: zodResolver(signUpFormSchema),
  });
  const avatar = watch("avatar");
  const signUpForm = async (values) => {
    await handleSignUpMutation(values, {
      onSuccess: () => {
        reset();
        acceptsRedirect && navigate({ to: "/account" });
      },
    });
  };

  const uploadFile = (event) => {
    if (!event.target.files?.length) return;
    const fileReader = new FileReader();
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      const content = fileReader.result;
      if (content) {
        setValue("avatar", content, { shouldDirty: true });
      }
    };
  };

  return (
    <section className="flex w-full min-w-[10rem] max-w-[30rem] flex-col justify-center gap-5 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-2 py-4 text-black sm:px-6">
      <header className="flex flex-col">
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
          Register
        </h1>
      </header>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(signUpForm)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <img
            src={avatar}
            alt="User Avatar"
            className="aspect-[1/1] w-1/2 rounded-full"
          />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={uploadFile}
            className="w-full rounded-full bg-[#005f70] text-center text-white"
          />

          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.email && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.email.message}
            </div>
          )}

          <input
            {...register("displayName")}
            type="text"
            placeholder="Display Name"
            name="displayName"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.displayName && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.displayName.message}
            </div>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.password && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.password.message}
            </div>
          )}

          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.confirmPassword && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.confirmPassword.message}
            </div>
          )}

          <button
            className="mt-2 w-full rounded border-2 border-cyan-500 bg-[#005f70] py-1 text-white hover:bg-cyan-500"
            type="submit"
            value="Send"
            disabled={isPending}
          >
            Sign up
          </button>
        </form>
        <Separator className="my-4">
          <p className="z-[2] bg-[#070B11] px-2 text-center text-white">Or</p>
        </Separator>
        <div className="flex flex-col gap-2">
          <ThirdPartyLogin />
        </div>
        <nav className="w-full pt-4">
          <p className="inline text-white">
            Already registered to ScreenSynced?{" "}
          </p>
          <button
            onClick={() => {
              acceptsRedirect
                ? navigate({ to: "/login" })
                : setOverlayType("sign-in");
            }}
            className="whitespace-nowrap text-cyan-500 hover:text-cyan-400"
          >
            Log In
          </button>
        </nav>
      </div>
    </section>
  );
}

SignUpForm.propTypes = {
  acceptsRedirect: PropTypes.bool,
};
