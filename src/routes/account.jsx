import { FileRoute, redirect } from "@tanstack/react-router";
import { bookmarkApi } from "../api/backend/modules/bookmark.api";
import { Account } from "../components";
import { Bookmarks } from "../components/Bookmarks";
import { isAuthenticated } from "../lib/isAuthenticated";

export const route = new FileRoute("/account").createRoute({
  id: "authenticated",
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
    return {
      queryBookmarks: {
        queryKey: ["bookmarks"],
        queryFn: bookmarkApi.getList,
      },
    };
  },
  loader: async ({ context: { queryClient, queryBookmarks } }) => {
    await queryClient.ensureQueryData(queryBookmarks);
  },
  component: () => {
    return (
      <section className="flex flex-col px-2 py-10 lg:px-12">
        <Account />
        <Bookmarks />
      </section>
    );
  },
});
