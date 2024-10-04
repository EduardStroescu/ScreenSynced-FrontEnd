import { Link } from "@tanstack/react-router";
import { toast } from "react-toastify";
import userApi from "../api/backend/modules/user.api";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { placeholderAvatar } from "../lib/placeholders";
import { useUserStore, useUserStoreActions } from "../store";

export function Account() {
  const user = useUserStore((state) => state.user);
  useUserStore();
  const { setLoggedIn, setOverlayType, setOverlay, setBookmarkList } =
    useUserStoreActions();
  const { setItem } = useLocalStorage("user");
  const handleLogout = async () => {
    try {
      await userApi.logout();
      setItem(null);
      setLoggedIn(false);
      setBookmarkList([]);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="mt-20 flex w-full flex-col items-center rounded-t-sm border-t-4 border-t-cyan-500 sm:mt-28 sm:flex-row sm:items-start">
      <div className="group relative -translate-y-14 rounded-full sm:-translate-y-20">
        <img
          src={user?.avatar || placeholderAvatar}
          alt={user?.displayName + "'s" + "avatar"}
          className="aspect-[1/1] w-[10rem] rounded-full border-t-8 border-t-cyan-500 sm:w-[25rem]"
        />
        <button
          onClick={() => {
            setOverlayType("change-avatar");
            setOverlay(true);
          }}
          className="absolute left-0 top-14 hidden h-[101%] w-[10rem] -translate-y-14 rounded-full bg-gradient-to-t from-[#070B11] via-[#070B11]/40 to-[#070B11]/0 text-2xl group-hover:block sm:-left-0 sm:top-20 sm:w-full sm:-translate-y-20"
        >
          Change
        </button>
      </div>
      <div className="relative mt-6 flex w-full flex-col gap-2 border-y-4 border-y-cyan-500 py-4 text-lg sm:mt-0 sm:items-start sm:border-none sm:pl-3 sm:pr-2">
        <header className="absolute w-full -translate-y-16 sm:-translate-x-7 sm:-translate-y-20">
          <h1 className="flex justify-center font-londrina text-4xl sm:block sm:text-5xl">
            {user?.displayName}
          </h1>
        </header>
        <button
          onClick={() => {
            setOverlayType("change-details");
            setOverlay(true);
          }}
          className="text-lg hover:text-cyan-500"
        >
          Change Account Details
        </button>
        {!user?.facebookId && !user?.googleId && (
          <button
            onClick={() => {
              setOverlayType("change-password");
              setOverlay(true);
            }}
            className="text-lg hover:text-cyan-500"
          >
            Change Password
          </button>
        )}
        <Link
          to="/"
          className="text-center text-lg hover:text-cyan-500"
          onClick={handleLogout}
        >
          Log Out
        </Link>
      </div>
    </section>
  );
}
