import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { placeholderAvatar } from "../lib/placeholders";
import { useUserStoreActions } from "../store";
import { CloseIcon } from "./";

export function SignUpForm({ acceptsRedirect = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setLoggedIn, setOverlayType, setOverlay } =
    useUserStoreActions();
  const { setItem, getItem } = useLocalStorage("user");
  const navigate = useNavigate({ from: "/" });
  const [avatar, setAvatar] = useState(placeholderAvatar);

  const useSignup = useMutation({
    mutationFn: (values) => userApi.signup(values),
  });

  const signUpForm = useFormik({
    initialValues: {
      password: "",
      userName: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(8, "The username must have minimum 8 characters")
        .required("A username is required"),
      password: Yup.string()
        .min(8, "A password must have minimum 8 characters")
        .required("A password is required"),
      displayName: Yup.string()
        .min(8, "The display name must have minimum 8 characters")
        .required("displayName is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirm Password does not match")
        .min(8, "Confirm Password must have minimum 8 characters")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { response, error } = await useSignup.mutateAsync(values);

      if (response) {
        signUpForm.resetForm();
        setIsLoading(false);
        setItem(response);
        setUser(getItem());
        setLoggedIn(true);
        setOverlay(false);
        setOverlayType("login");
        acceptsRedirect && navigate({ to: "/account" });
        toast.success("Sign in successful!");
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
        signUpForm.setFieldValue("avatar", content, false);
      }
    };
  };

  return (
    <section className="flex w-[90%] min-w-[10rem] max-w-[30rem] flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-2 py-4 text-black sm:px-6">
      <header className="flex flex-col">
        {!acceptsRedirect && (
          <button
            onClick={() => setOverlay(false)}
            className="self-end text-white"
          >
            <CloseIcon className={"hover:stroke-cyan-500"} />
          </button>
        )}
        <h1 className="self-center font-londrina text-5xl text-white">
          Register
        </h1>
      </header>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={signUpForm.handleSubmit}
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
            className="w-full rounded bg-[#005f70] text-center text-white"
          />
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={signUpForm.values.userName}
            onChange={signUpForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signUpForm.touched.userName && signUpForm.errors.userName && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signUpForm.errors.userName}
            </div>
          )}
          <input
            type="text"
            placeholder="Display Name"
            name="displayName"
            value={signUpForm.values.displayName}
            onChange={signUpForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signUpForm.touched.displayName && signUpForm.errors.displayName && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signUpForm.errors.displayName}
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signUpForm.values.password}
            onChange={signUpForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signUpForm.touched.password && signUpForm.errors.password && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signUpForm.errors.password}
            </div>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={signUpForm.values.confirmPassword}
            onChange={signUpForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signUpForm.touched.confirmPassword &&
            signUpForm.errors.confirmPassword && (
              <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
                {signUpForm.errors.confirmPassword}
              </div>
            )}
          <button
            className="mt-4 w-full rounded border-2 border-cyan-500 bg-[#005f70] py-1 text-white hover:bg-cyan-500"
            type="submit"
            value="Send"
            disabled={isLoading}
          >
            Sign up
          </button>
        </form>
        <nav className="flex w-full flex-row items-center justify-start gap-2 self-end pl-4 pt-4 sm:py-4">
          <p className="text-white">Already registered to ScreenSynced?</p>
          {acceptsRedirect ? (
            <button
              onClick={() => navigate({ to: "/account" })}
              className="text-cyan-500"
            >
              Log In
            </button>
          ) : (
            <button
              onClick={() => setOverlayType("login")}
              className="text-cyan-500"
            >
              Log In
            </button>
          )}
        </nav>
      </div>
    </section>
  );
}

SignUpForm.propTypes = {
  acceptsRedirect: PropTypes.bool,
};
