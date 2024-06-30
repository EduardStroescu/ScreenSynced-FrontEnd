import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserStoreActions } from "../store";

const DemoAccountLogin = ({
  acceptsRedirect = false,
  isLoading,
  setIsLoading,
}) => {
  const { setUser, setLoggedIn, setOverlay, setOverlayType } =
    useUserStoreActions();
  const { setItem, getItem } = useLocalStorage("user");
  const navigate = useNavigate({ from: "/" });
  const signInMutation = useMutation({
    mutationFn: (values) => userApi.signin(values),
  });
  const handleDemoLogin = async () => {
    setIsLoading(true);
    const userName = import.meta.env.VITE_DEMO_ACC_USERNAME;
    const password = import.meta.env.VITE_DEMO_ACC_PASSWORD;
    const { response, error } = await signInMutation.mutateAsync({
      password: password,
      userName: userName,
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
    <div className="mb-4 flex flex-col items-center justify-center gap-4">
      <p className="text-white">For presentation purposes:</p>
      <button
        className="w-full rounded border-2 border-cyan-500 bg-[#bb1e09] py-1 text-white hover:bg-[#df250d]"
        onClick={() => handleDemoLogin()}
        disabled={isLoading}
      >
        {!isLoading ? "Log in As Demo User" : "Loading..."}
      </button>
    </div>
  );
};

export default DemoAccountLogin;

DemoAccountLogin.propTypes = {
  acceptsRedirect: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
