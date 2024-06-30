import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import userApi from "../api/backend/modules/user.api";
import { useUserStoreActions } from "../store";
import { CloseIcon } from "./";

export function ChangePasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setLoggedIn, setOverlay, setOverlayType } =
    useUserStoreActions();
  const navigate = useNavigate({ from: "/" });

  const updatePasswordMutation = useMutation({
    mutationFn: (values) => userApi.passwordUpdate(values),
  });

  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "The password must be at least 8 characters")
        .required("A password is required"),
      newPassword: Yup.string()
        .min(8, "The new password must be at least 8 characters")
        .required("A new password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "The passwords do not match")
        .min(8, "The confirmation password must be at least 8 characters")
        .required("The confirmation password is required"),
    }),
    onSubmit: async (values) => {
      if (isLoading) return;
      setIsLoading(true);
      const { response, error } =
        await updatePasswordMutation.mutateAsync(values);

      if (response) {
        setIsLoading(false);
        changePasswordForm.resetForm();
        setUser(null);
        setLoggedIn(false);
        navigate({ to: "/" });
        setOverlay(true);
        setOverlayType("login");
        toast.success("Password Updated! Please re-login");
      }

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="flex w-[30%] flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black">
      <header className="flex flex-col pb-6">
        <button
          onClick={() => setOverlay(false)}
          className="self-end pb-6 text-white"
        >
          <CloseIcon
            aria-label="Close panel"
            className={"hover:stroke-cyan-500"}
          />
        </button>
        <h1 className="self-center font-londrina text-5xl text-white">
          Change Password
        </h1>
      </header>
      <div className="flex flex-col justify-center gap-8">
        <form
          onSubmit={changePasswordForm.handleSubmit}
          className="flex flex-col justify-center gap-4 text-white"
        >
          <input
            type="password"
            placeholder="Current Password"
            name="password"
            value={changePasswordForm.values.password}
            onChange={changePasswordForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {changePasswordForm.touched.password &&
            changePasswordForm.errors.password && (
              <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
                {changePasswordForm.errors.password}
              </div>
            )}
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            value={changePasswordForm.values.newPassword}
            onChange={changePasswordForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {changePasswordForm.touched.newPassword &&
            changePasswordForm.errors.newPassword && (
              <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
                {changePasswordForm.errors.newPassword}
              </div>
            )}
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            value={changePasswordForm.values.confirmNewPassword}
            onChange={changePasswordForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {changePasswordForm.touched.confirmNewPassword &&
            changePasswordForm.errors.confirmNewPassword && (
              <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
                {changePasswordForm.errors.confirmNewPassword}
              </div>
            )}
          <button
            type="submit"
            value="Send"
            className="my-5 rounded border-2 border-cyan-500 bg-[#005f70] px-4 py-1 text-white hover:bg-cyan-500"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
