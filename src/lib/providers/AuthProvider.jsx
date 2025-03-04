import userApi from "@api/backend/modules/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useOverlayContext } from "./OverlayProvider";
import { useBookmarksQuery } from "@lib/queries";
import { useLocalStorageSync } from "@hooks/useLocalStorageSync";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const { setOverlayType } = useOverlayContext();

  const [user, setUser, removeUser] = useLocalStorageSync("user");

  useEffect(() => {
    if (user) return;

    if (!user && search.success) {
      (async () => {
        try {
          const { response } = await userApi.getInfo();
          if (response) {
            setUser(response);
          } else {
            throw new Error();
          }
        } catch (_) {
          toast.error("Something went wrong, please try again later");
        }
        navigate({ to: "/", replace: true });
      })();
    } else if (!user && search.error) {
      toast.error("Something went wrong");
      navigate({ to: "/", replace: true });
    }
  }, [user, navigate, setUser, search.success, search.error]);

  useBookmarksQuery(user);

  const signIn = useMutation({
    mutationFn: (body) => userApi.signin(body),
    onSuccess: (response) => {
      setUser(response);
      setOverlayType(null);
      toast.success("Logged In");
    },
    onError: (error) => {
      toast.error(
        error?.message ??
          "Could not establish a server connection. Please try again later.",
      );
    },
  });

  const signUp = useMutation({
    mutationFn: (body) => userApi.signup(body),
    onSuccess: (response) => {
      setUser(response);
      setOverlayType(null);
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.message ??
          "Could not establish a server connection. Please try again later.",
      );
    },
  });

  const logout = useMutation({
    mutationFn: userApi.logout,
    onSettled: () => {
      removeUser();
      setOverlayType(null);
      queryClient.removeQueries({ queryKey: ["bookmarks"] });
      toast.success("Logged Out");
    },
  });

  const updateAccount = useMutation({
    mutationFn: (body) => userApi.accountUpdate(body),
    onSuccess: (response) => {
      setUser(response);
      setOverlayType(null);
      toast.success("Account updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.message ??
          "Could not establish a server connection. Please try again later.",
      );
    },
  });

  const changeAvatar = useMutation({
    mutationFn: (body) => userApi.avatarUpdate(body),
    onSuccess: (response) => {
      setUser(response);
      setOverlayType(null);
      toast.success("Avatar updated successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.message ??
          "Could not establish a server connection. Please try again later.",
      );
    },
  });

  const changePassword = useMutation({
    mutationFn: (body) => userApi.passwordUpdate(body),
    onSuccess: () => {
      removeUser();
      setOverlayType("sign-in");
      toast.success("Password Updated! Please re-login");
    },
    onError: (error) => {
      toast.error(
        error?.message ??
          "Could not establish a server connection. Please try again later.",
      );
    },
  });

  const values = {
    user,
    logout,
    signIn,
    signUp,
    updateAccount,
    changeAvatar,
    changePassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthProvider.displayName = "AuthProvider";
