import { Account } from "@components/Account";
import { Bookmarks } from "@components/Bookmarks";
import { isAuthenticated } from "@lib/isAuthenticated";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useBookmarksQuery } from "@lib/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  id: "authenticated",
  beforeLoad: async () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AccountPage,
});

function AccountPage() {
  const { user } = useAuthContext();
  const { data: bookmarksData } = useBookmarksQuery(user);

  return (
    <section className="flex flex-col px-2 py-10 lg:px-12">
      <Account />
      <Bookmarks bookmarksData={bookmarksData} />
    </section>
  );
}
