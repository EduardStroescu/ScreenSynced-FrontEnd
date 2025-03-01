import { useAuthContext } from "@lib/providers/AuthProvider";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";

export function DemoAccountLogin({ acceptsRedirect = false, isLoading }) {
  const navigate = useNavigate({ from: "/" });
  const { signIn } = useAuthContext();

  const { mutateAsync: signInMutation } = signIn;

  const handleDemoLogin = async () => {
    const email = import.meta.env.VITE_DEMO_ACC_EMAIL;
    const password = import.meta.env.VITE_DEMO_ACC_PASSWORD;
    await signInMutation(
      {
        password: password,
        email: email,
      },
      {
        onSuccess: () => {
          acceptsRedirect && navigate({ to: "/account" });
        },
      },
    );
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-center gap-2">
      <p className="text-white">For presentation purposes:</p>
      <button
        className="w-full rounded border-2 border-cyan-500  py-1 text-[#fe391f] hover:bg-[#bb1e09] hover:text-white"
        onClick={handleDemoLogin}
        disabled={isLoading}
      >
        {!isLoading ? "Continue with Demo Account" : "Loading..."}
      </button>
    </div>
  );
}

DemoAccountLogin.propTypes = {
  acceptsRedirect: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
};
