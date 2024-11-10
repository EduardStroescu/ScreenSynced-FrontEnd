import userApi from "@api/backend/modules/user.api";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { useUserStoreActions } from "@lib/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export function DemoAccountLogin({
  acceptsRedirect = false,
  isLoading,
  setIsLoading,
}) {
  const { setUser, setLoggedIn, setOverlay, setOverlayType } =
    useUserStoreActions();
  const { setItem, getItem } = useLocalStorage("user");
  const navigate = useNavigate({ from: "/" });
  const signInMutation = useMutation({
    mutationFn: (values) => userApi.signin(values),
  });
  const handleDemoLogin = async () => {
    setIsLoading(true);
    const email = import.meta.env.VITE_DEMO_ACC_EMAIL;
    const password = import.meta.env.VITE_DEMO_ACC_PASSWORD;
    const { response, error } = await signInMutation.mutateAsync({
      password: password,
      email: email,
    });

    if (response) {
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
  };

  return (
    <div className="mb-2 flex flex-col items-center justify-center gap-2">
      <p className="text-white">For presentation purposes:</p>
      <button
        className="w-full rounded border-2 border-cyan-500  py-1 text-[#fe391f] hover:bg-[#bb1e09] hover:text-white"
        onClick={() => handleDemoLogin()}
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
  setIsLoading: PropTypes.func.isRequired,
};
