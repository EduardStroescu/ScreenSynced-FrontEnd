import privateClient from "../privateClient";

const bookmarkEndpoints = {
  list: "user/bookmarks",
  add: "user/bookmarks",
  remove: ({ bookmarkId }) => `user/bookmarks/${bookmarkId}`,
};

export const bookmarkApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(bookmarkEndpoints.list);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  add: async ({ mediaId, mediaType }) => {
    try {
      const response = await privateClient.post(bookmarkEndpoints.add, {
        mediaId,
        mediaType,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ bookmarkId }) => {
    try {
      const response = await privateClient.delete(
        bookmarkEndpoints.remove({ bookmarkId }),
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};
