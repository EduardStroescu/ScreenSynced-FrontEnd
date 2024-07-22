import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserStoreActions } from "../store";
import { CloseIcon, DemoAccountLogin, Separator, ThirdPartyLogin } from "./";

export function SignInForm({ acceptsRedirect = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setLoggedIn, setOverlay, setOverlayType } =
    useUserStoreActions();
  const { setItem, getItem } = useLocalStorage("user");
  const navigate = useNavigate({ from: "/" });

  const signInMutation = useMutation({
    mutationFn: (values) => userApi.signin(values),
  });

  const signInForm = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .min(8, "The Email must have minimum 8 characters")
        .required("An Email is required"),
      password: Yup.string()
        .min(8, "The password must have minimum 8 characters")
        .required("A password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const { response, error } = await signInMutation.mutateAsync(values);

      if (response) {
        signInForm.resetForm();
        setIsLoading(false);
        setItem(response);
        setUser(getItem());
        setLoggedIn(true);
        setOverlay(false);
        setOverlayType("login");
        acceptsRedirect && navigate({ to: "/account" });
        toast.success("Logged In");
      }

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <section className="flex w-full min-w-[10rem] max-w-[30rem] flex-col justify-center gap-4 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black lg:w-[50%]">
      <header className="mb-2 flex flex-col">
        {!acceptsRedirect && (
          <button
            onClick={() => setOverlay(false)}
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
          onSubmit={signInForm.handleSubmit}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signInForm.values.email}
            onChange={signInForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signInForm.touched.email && signInForm.errors.email && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signInForm.errors.email}
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signInForm.values.password}
            onChange={signInForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signInForm.touched.password && signInForm.errors.password && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signInForm.errors.password}
            </div>
          )}
          <button
            className="mt-2 w-1/2 rounded border-2 border-cyan-500 bg-[#005f70] py-1 text-white hover:bg-cyan-500"
            type="submit"
            value="Send"
            disabled={isLoading}
          >
            {!isLoading ? "Log In" : "Loading..."}
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
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </section>
    </section>
  );
}

SignInForm.propTypes = {
  acceptsRedirect: PropTypes.bool,
};
