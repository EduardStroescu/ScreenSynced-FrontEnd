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
  signin: async ({ password, email }) =>
    await publicClient.post(userEndpoints.login, {
      password,
      email,
    }),

  signup: async ({ avatar, email, password, confirmPassword, displayName }) =>
    await publicClient.post(userEndpoints.register, {
      avatar,
      email,
      password,
      confirmPassword,
      displayName,
    }),

  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getUserInfo);
      return { response };
    } catch (error) {
      return error.message;
    }
  },

  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) =>
    await privateClient.put(userEndpoints.passwordUpdate, {
      password,
      newPassword,
      confirmNewPassword,
    }),

  avatarUpdate: async ({ avatar }) =>
    await privateClient.patch(userEndpoints.avatarUpdate, {
      avatar,
    }),

  accountUpdate: async ({ displayName }) =>
    await privateClient.patch(userEndpoints.accountUpdate, {
      displayName,
    }),

  logout: async () => await privateClient.get(userEndpoints.logout),
};

export default userApi;
