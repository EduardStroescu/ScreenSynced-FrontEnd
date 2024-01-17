import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUser } from "../store";
import { CloseIcon } from "./";
import DemoAccountLogin from "./DemoAccountLogin";

export function SignInForm({ acceptsRedirect }) {
  const { setUser, setLoggedIn, setOverlay, setOverlayType } = useUser();
  const { setItem, getItem } = useLocalStorage("user");
  const navigate = useNavigate({ from: "/" });

  const signInMutation = useMutation((values) => userApi.signin(values));
  const signInForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "The username must have minimum 8 characters")
        .required("A username is required"),
      password: Yup.string()
        .min(8, "The password must have minimum 8 characters")
        .required("A password is required"),
    }),
    onSubmit: async (values) => {
      const { response, error } = await signInMutation.mutateAsync(values);

      if (response) {
        signInForm.resetForm();
        setItem(response);
        setUser(getItem());
        setLoggedIn(true);
        setOverlay(false);
        setOverlayType("login");
        acceptsRedirect && navigate({ to: "/account" });
        toast.success("Logged In");
      }

      if (error) toast.error(error.message);
    },
  });

  return (
    <section className="flex w-[90%] min-w-[10rem] max-w-[30rem] flex-col justify-center gap-6 rounded-xl border-4 border-double border-cyan-500 bg-[#070B11] px-6 py-4 text-black lg:w-[50%]">
      <header className="flex flex-col pb-6">
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
      <section className="flex flex-col justify-center">
        <form
          onSubmit={signInForm.handleSubmit}
          className="flex flex-col items-center justify-center gap-4"
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={signInForm.values.username}
            onChange={signInForm.handleChange}
            className="w-full rounded bg-[#005f70] py-1 text-center text-white"
          />
          {signInForm.touched.username && signInForm.errors.username && (
            <div className="w-full rounded bg-red-600 py-1 text-center text-[0.8rem] text-white">
              {signInForm.errors.username}
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
            className="mt-4 w-1/2 rounded border-2 border-cyan-500 bg-[#005f70] py-1 text-white hover:bg-cyan-500"
            type="submit"
            value="Send"
          >
            Log In
          </button>
        </form>
        <nav className="flex w-full flex-row items-center justify-start gap-2 self-end pb-6 pt-10">
          <p className="text-white">New to ScreenSynced?</p>
          {acceptsRedirect ? (
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="text-cyan-500 "
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={() => {
                setOverlayType("sign-up");
              }}
              className="text-cyan-500 "
            >
              Sign Up
            </button>
          )}
        </nav>
        <DemoAccountLogin acceptsRedirect={acceptsRedirect} />
      </section>
    </section>
  );
}
