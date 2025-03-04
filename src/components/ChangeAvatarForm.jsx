import { CloseIcon } from "@components/Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { placeholderAvatar } from "@lib/const";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { updateAvatarFormSchema } from "@lib/types";
import { useForm } from "react-hook-form";

export function ChangeAvatarForm() {
  const { user, changeAvatar } = useAuthContext();
  const { setOverlayType } = useOverlayContext();

  const { mutateAsync: changeAvatarMutation, isPending } = changeAvatar;

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: "",
    },
    values: {
      avatar: user?.avatar,
    },
    mode: "onSubmit",
    resolver: zodResolver(updateAvatarFormSchema),
  });
  const avatar = watch("avatar");

  const changeAvatarForm = async (values) => {
    if (isPending) return;

    await changeAvatarMutation(values, {
      onSuccess: () => {
        reset();
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
    <section className="flex w-fit flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black">
      <header className="flex flex-col pb-6">
        <button
          onClick={() => setOverlayType(null)}
          className="self-end text-white"
        >
          <CloseIcon
            aria-label="Close panel"
            className={"hover:stroke-cyan-500"}
          />
        </button>
        <h1 className="self-center text-center font-londrina text-5xl text-white">
          Change Avatar
        </h1>
      </header>
      <div className="flex flex-col items-center justify-center gap-8">
        <img
          src={avatar || placeholderAvatar}
          alt={user?.displayName + "'s" + "avatar"}
          className="aspect-[1/1] w-[20rem] rounded-full border-t-8 border-t-cyan-500"
        />
        <form
          onSubmit={handleSubmit(changeAvatarForm)}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={uploadFile}
            className="w-full rounded-full bg-[#005f70] text-center text-white"
          />
          {errors.avatar && (
            <p className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {errors.avatar.message}
            </p>
          )}

          <button
            type="submit"
            value="Send"
            className="my-4 rounded border-2 border-cyan-500 bg-[#005f70] px-6 py-1 text-white hover:bg-cyan-500"
            disabled={isPending || avatar === user?.avatar}
          >
            {isPending ? "Updating..." : "Update Avatar"}
          </button>
        </form>
      </div>
    </section>
  );
}
