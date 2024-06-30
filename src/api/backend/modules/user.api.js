import privateClient from "../privateClient";
import publicClient from "../publicClient";

const userEndpoints = {
  login: "auth/login",
  register: "auth/register",
  getUserInfo: "users/current-user",
  passwordUpdate: "users/update-password",
  avatarUpdate: "users/change-avatar",
};

const userApi = {
  signin: async ({ password, userName }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        password,
        userName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  signup: async ({
    avatar,
    userName,
    password,
    confirmPassword,
    displayName,
  }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        avatar,
        userName,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  getInfo: async () => await privateClient.get(userEndpoints.getUserInfo),

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
};

export default userApi;
