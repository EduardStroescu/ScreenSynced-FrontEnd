import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { placeholderAvatar } from "../lib/placeholders";
import { useUserStore, useUserStoreActions } from "../store";
import { CloseIcon } from "./Icons";

export function ChangeAvatarForm() {
  const user = useUserStore((state) => state.user);
  const { setUser, setOverlay } = useUserStoreActions();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const { setItem, getItem } = useLocalStorage("user");

  const updateAvatarMutation = useMutation({
    mutationFn: (values) => userApi.avatarUpdate(values),
  });

  const changeAvatarForm = useFormik({
    initialValues: {
      avatar: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      if (isLoading) return;
      setIsLoading(true);

      const { response, error } =
        await updateAvatarMutation.mutateAsync(values);

      if (response) {
        changeAvatarForm.resetForm();
        setIsLoading(false);
        setItem(response);
        setUser(getItem());
        setOverlay(false);
        toast.success("Avatar Updated Successfully");
      }

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  const uploadFile = (event) => {
    if (!event.target.files?.length) return;
    const fileReader = new FileReader();
    const file = event.target.files[0];
    fileReader.readAsDataURL(file);

    fileReader.onloadend = () => {
      const content = fileReader.result;
      if (content) {
        setAvatar(content);
        changeAvatarForm.setFieldValue("avatar", content, false);
      }
    };
  };
  return (
    <section className="flex w-[30%] flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] p-4 text-black">
      <header className="flex flex-col pb-6">
        <button
          onClick={() => setOverlay(false)}
          className="self-end text-white"
        >
          <CloseIcon
            aria-label="Close panel"
            className={"hover:stroke-cyan-500"}
          />
        </button>
        <h1 className="self-center font-londrina text-5xl text-white">
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
          onSubmit={changeAvatarForm.handleSubmit}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={uploadFile}
            className="rounded-full bg-[#005f70] text-center text-white"
          />
          <button
            type="submit"
            value="Send"
            className="my-4 rounded border-2 border-cyan-500 bg-[#005f70] px-6 py-1 text-white hover:bg-cyan-500"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Avatar"}
          </button>
        </form>
      </div>
    </section>
  );
}
