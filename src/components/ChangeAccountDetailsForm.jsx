import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CloseIcon } from "@components/Icons";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { updateAccountFormSchema } from "@lib/types";

export function ChangeAccountDetailsForm() {
  const { updateAccount } = useAuthContext();
  const { setOverlayType } = useOverlayContext();

  const { mutateAsync: updateAccountMutation, isPending } = updateAccount;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(updateAccountFormSchema),
  });

  const updateAccountDetailsForm = async (values) => {
    if (isPending) return;

    await updateAccountMutation(values, {
      onSuccess: () => {
        reset();
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
          Update Account Details
        </h1>
      </header>
      <div className="flex flex-col justify-center gap-8">
        <form
          onSubmit={handleSubmit(updateAccountDetailsForm)}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            {...register("displayName")}
            type="text"
            placeholder="New Display Name"
            name="displayName"
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {errors.displayName && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.displayName.message}
            </p>
          )}

          <button
            type="submit"
            value="Send"
            className="my-5 rounded border-2 border-cyan-500 bg-[#005f70] px-4 py-1 text-white hover:bg-cyan-500"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </section>
  );
}
