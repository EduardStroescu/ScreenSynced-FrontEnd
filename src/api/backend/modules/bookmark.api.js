import privateClient from "../privateClient";

const bookmarkEndpoints = {
  list: "bookmarks",
  add: "bookmarks",
  remove: ({ bookmarkId }) => `bookmarks/${bookmarkId}`,
};

export const bookmarkApi = {
  getList: async () => await privateClient.get(bookmarkEndpoints.list),

  add: async ({ mediaId, mediaType }) =>
    await privateClient.post(bookmarkEndpoints.add, {
      mediaId,
      mediaType,
    }),
  remove: async ({ bookmarkId }) =>
    await privateClient.delete(bookmarkEndpoints.remove({ bookmarkId })),
};
