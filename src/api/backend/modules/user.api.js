import privateClient from "../privateClient";
import publicClient from "../publicClient";

const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
  avatarUpdate: "user/update-avatar",
};

const userApi = {
  signin: async ({ password, username }) => {
    try {
      const response = await publicClient.post(userEndpoints.signin, {
        password,
        username,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  signup: async ({
    avatar,
    username,
    password,
    confirmPassword,
    displayName,
  }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        avatar,
        username,
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
      const response = await privateClient.get(userEndpoints.getInfo);

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
      const response = await privateClient.put(userEndpoints.avatarUpdate, {
        avatar,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
