import privateClient from "../privateClient";
import publicClient from "../publicClient";

const userEndpoints = {
  login: "auth/login",
  googleLogin: "auth/login/google",
  facebookLogin: "auth/login/facebook",
  register: "auth/register",
  getUserInfo: "users/current-user",
  passwordUpdate: "users/update-password",
  avatarUpdate: "users/change-avatar",
  accountUpdate: "users/update-details",
  logout: "auth/logout",
};

const userApi = {
  signin: async ({ password, email }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        password,
        email,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  signup: async ({ avatar, email, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        avatar,
        email,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getUserInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  avatarUpdate: async ({ avatar }) => {
    try {
      const response = await privateClient.patch(userEndpoints.avatarUpdate, {
        avatar,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  accountUpdate: async ({ displayName }) => {
    try {
      const response = await privateClient.patch(userEndpoints.accountUpdate, {
        displayName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  logout: async () => {
    try {
      const response = await privateClient.get(userEndpoints.logout);

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
