import { CloseIcon } from "@components/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { updatePasswordFormSchema } from "@lib/types";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export function ChangePasswordForm() {
  const { changePassword } = useAuthContext();
  const { setOverlayType } = useOverlayContext();
  const navigate = useNavigate({ from: "/" });

  const { mutateAsync: handleChangePasswordMutation, isPending } =
    changePassword;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(updatePasswordFormSchema),
  });

  const changePasswordForm = async (values) => {
    if (isPending) return;

    await handleChangePasswordMutation(values, {
      onSuccess: () => {
        reset();
        navigate({ to: "/" });
      },
    });
  };

  return (
    <section className="flex w-fit flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black">
      <header className="flex flex-col pb-6">
        <button
          onClick={() => setOverlayType(null)}
          className="self-end pb-6 text-white"
        >
          <CloseIcon
            aria-label="Close panel"
            className={"hover:stroke-cyan-500"}
          />
        </button>
        <h1 className="self-center text-center font-londrina text-5xl text-white">
          Change Password
        </h1>
      </header>
      <div className="flex flex-col justify-center gap-8">
        <form
          onSubmit={handleSubmit(changePasswordForm)}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            {...register("password")}
            type="password"
            placeholder="Current Password"
            name="password"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.password && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.password.message}
            </p>
          )}

          <input
            {...register("newPassword")}
            type="password"
            placeholder="New Password"
            name="newPassword"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.newPassword && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.newPassword.message}
            </p>
          )}

          <input
            {...register("confirmNewPassword")}
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.confirmNewPassword && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.confirmNewPassword.message}
            </p>
          )}

          <button
            type="submit"
            value="Send"
            className="my-5 rounded border-2 border-cyan-500 bg-[#005f70] px-4 py-1 text-white hover:bg-cyan-500"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
