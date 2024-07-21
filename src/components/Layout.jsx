import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Flip, toast, ToastContainer } from "react-toastify";
import { bookmarkApi } from "../api/backend/modules/bookmark.api";
import { useClickOutside } from "../hooks/useClickOutside";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { desktopVariants } from "../lib/framerMotionVariants.js";
import { useUserStore, useUserStoreActions } from "../store.js";
import {
  BookmarkIcon,
  ChangeAccountDetailsForm,
  ChangeAvatarForm,
  ChangePasswordForm,
  Drawer,
  HamburgerIcon,
  Overlay,
  SearchBarDesktop,
  SearchBarMobile,
  SearchIcon,
  SignInForm,
  SignUpForm,
} from "./";

import "react-toastify/dist/ReactToastify.css";
import { useShallow } from "zustand/react/shallow";
import { placeholderAvatar } from "../lib/placeholders.js";

import PropTypes from "prop-types";
import userApi from "../api/backend/modules/user.api.js";

export function Layout({ children }) {
  const { user, loggedIn, isOverlay, overlayType } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      loggedIn: state.loggedIn,
      isOverlay: state.isOverlay,
      overlayType: state.overlayType,
    })),
  );
  const { setUser, setLoggedIn, setBookmarkList, setOverlay, setOverlayType } =
    useUserStoreActions();
  const { setItem, getItem } = useLocalStorage("user");
  const { search } = useLocation();
  const navigate = useNavigate();

  const { data: bookmarksQuery } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: bookmarkApi.getList,
    enabled: !!user,
  });

  useEffect(() => {
    const user = getItem();
    if (user) {
      setUser(user);
      setLoggedIn(true);
    } else if (!user && search.success) {
      (async () => {
        const { response } = await userApi.getInfo();
        if (response) {
          setUser(response);
          setLoggedIn(true);
          setItem(response);
        } else {
          toast.error("Something went wrong, please try again later");
        }
        navigate({ to: "/", replace: true });
      })();
    } else if (!user && search.error) {
      toast.error("Something went wrong");
      navigate({ to: "/", replace: true });
    }
  }, []);

  useEffect(() => {
    if (user && bookmarksQuery) {
      setBookmarkList(bookmarksQuery);
    }
    if (!user) {
      setBookmarkList([]);
    }
  }, [bookmarksQuery, user]);

  const renderModalBasedOnActionType = () => {
    switch (overlayType) {
      case "login":
        return <SignInForm />;
      case "sign-up":
        return <SignUpForm />;
      case "change-avatar":
        return <ChangeAvatarForm />;
      case "change-password":
        return <ChangePasswordForm />;
      case "change-details":
        return <ChangeAccountDetailsForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <DesktopHeader
        setItem={setItem}
        getItem={getItem}
        isOverlay={isOverlay}
        setOverlay={setOverlay}
        setOverlayType={setOverlayType}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
        setBookmarkList={setBookmarkList}
      />
      <MobileHeader
        setItem={setItem}
        getItem={getItem}
        isOverlay={isOverlay}
        setOverlay={setOverlay}
        setOverlayType={setOverlayType}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        theme="dark"
        toastClassName={"bg-[#070B11] border-double border-4 border-cyan-500"}
      />
      <main role="main" id="mainContent" className="relative text-white">
        {children}
      </main>
      {isOverlay && <Overlay>{renderModalBasedOnActionType()}</Overlay>}
      <Footer />
    </>
  );
}

function DesktopHeader({
  setOverlayType,
  setOverlay,
  loggedIn,
  setLoggedIn,
  user,
  setUser,
  setBookmarkList,
  setItem,
  getItem,
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      className="fixed top-0 z-[200] hidden h-16 w-full items-center justify-between gap-8 bg-gradient-to-b from-[#070B11] via-[#070B11]/80 to-[#070B11]/0 px-12 py-8 text-white transition duration-300 md:px-10 lg:flex dark:text-white"
    >
      <nav className="flex items-center justify-center">
        <Link
          className="font-londrina text-4xl font-bold"
          to="/"
          activeOptions={{ exact: true }}
          prefetch="intent"
        >
          Screen<span className="font-bold text-cyan-400">Synced</span>
        </Link>
      </nav>
      <SearchBarDesktop />
      <nav className="flex flex-row items-center justify-center gap-6">
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          className="font-serif text-lg hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400",
          }}
        >
          Discover
        </Link>
        <Link
          to="/movies/$pageNumber"
          params={{ pageNumber: 1 }}
          className="font-serif text-lg hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400",
          }}
        >
          Movies
        </Link>
        <Link
          to="/tvs/$pageNumber"
          params={{ pageNumber: 1 }}
          className="font-serif text-lg hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400 ",
          }}
        >
          Series
        </Link>
        <DesktopMenuDrawer
          loggedIn={loggedIn}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
          setItem={setItem}
          getItem={getItem}
          user={user}
          setUser={setUser}
          setBookmarkList={setBookmarkList}
          setLoggedIn={setLoggedIn}
          setOverlay={setOverlay}
          setOverlayType={setOverlayType}
        />
      </nav>
    </header>
  );
}

function MobileHeader({ setOverlayType, setOverlay, loggedIn, user }) {
  const [isMenuOpen, setMenuOpen] = useCycle(false, true);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <>
      <header
        role="banner"
        className="h-nav fixed top-0 z-[200] flex w-full items-center gap-4 bg-gradient-to-b from-[#070B11] via-[#070B11]/80 to-[#070B11]/0 px-3 py-2 text-white md:px-8 lg:hidden"
      >
        <nav className="flex items-center justify-start">
          <button
            onClick={() => setMenuOpen()}
            className="relative flex h-8 w-8 items-center justify-center"
          >
            <HamburgerIcon />
          </button>
          <Link
            className="font-londrina text-3xl font-bold"
            to="/"
            activeOptions={{ exact: true }}
            prefetch="intent"
          >
            Screen<span className="font-bold text-cyan-400">Synced</span>
          </Link>
        </nav>
        <div className="flex w-full items-center justify-end gap-4">
          <button onClick={() => setSearchModalOpen(true)}>
            <SearchIcon className={"w-[1.2rem] translate-y-1 stroke-white"} />
          </button>
          {isSearchModalOpen && (
            <>
              <SearchBarMobile setSearchModalOpen={setSearchModalOpen} />
              <Overlay />
            </>
          )}
          {loggedIn ? (
            <div className="relative w-[2.5rem]">
              <Link to="/account">
                <motion.img
                  src={user?.avatar || placeholderAvatar}
                  alt={user?.displayName + "picture"}
                  className="aspect-[1/1] translate-y-1 rounded-full object-cover"
                />
              </Link>
            </div>
          ) : (
            <button
              className="text-lg"
              onClick={() => {
                setOverlay(true);
                setOverlayType("login");
              }}
            >
              Log In
            </button>
          )}
        </div>
      </header>
      <MobileMenuDrawer isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}

export function DesktopMenuDrawer({
  user,
  loggedIn,
  isMenuOpen,
  setMenuOpen,
  setItem,
  getItem,
  setUser,
  setBookmarkList,
  setLoggedIn,
  setOverlay,
  setOverlayType,
}) {
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenuOpen(false));
  const handleLogout = async () => {
    try {
      await userApi.logout();
      setMenuOpen(false);
      setItem(null);
      setUser(getItem());
      setLoggedIn(false);
      setBookmarkList([]);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <AnimatePresence>
      {loggedIn ? (
        <div ref={menuRef} className="relative w-[2.5rem]">
          <button type="button" onClick={() => setMenuOpen((x) => !x)}>
            <img
              src={user?.avatar || placeholderAvatar}
              alt={user?.displayName + "picture"}
              className="aspect-[1/1] translate-y-1 rounded-full object-cover"
            />
          </button>
          <motion.div
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={desktopVariants}
            className="absolute right-0 top-14 flex flex-col justify-around gap-4 rounded-lg border-4 border-double border-cyan-500 bg-[#070B11] px-10 pb-2 font-serif text-lg"
          >
            <h3 className="w-full border-b-2 border-double border-cyan-500 py-2 text-center font-londrina text-3xl text-white">
              {user?.displayName}
            </h3>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded px-2 text-center hover:bg-cyan-500"
            >
              Account
            </Link>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="flex w-full flex-row items-center justify-center gap-2 rounded px-2 text-center hover:bg-cyan-500"
            >
              <BookmarkIcon className={"w-4"} />
              Bookmarks
            </Link>
            <Link
              to="/"
              className="w-full rounded px-2 text-center hover:bg-cyan-500"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </motion.div>
        </div>
      ) : (
        <button
          onClick={() => {
            setOverlay(true);
            setOverlayType("login");
          }}
          className="font-serif text-lg hover:text-cyan-500"
        >
          Log In
        </button>
      )}
    </AnimatePresence>
  );
}

export function MobileMenuDrawer({ isMenuOpen, setMenuOpen }) {
  return (
    <Drawer isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} openFrom="left">
      <nav className="flex w-full flex-col items-center justify-center gap-4 p-6 text-white sm:gap-6 sm:px-12 sm:py-8">
        <Link
          onClick={setMenuOpen}
          to="/"
          className="font-serif text-2xl hover:text-cyan-400"
        >
          Home
        </Link>
        <Link
          to="/account"
          onClick={setMenuOpen}
          className="font-serif text-2xl hover:text-cyan-400"
        >
          Account
        </Link>
        <Link
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={setMenuOpen}
          className="font-serif text-2xl hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400",
          }}
        >
          Discover
        </Link>
        <Link
          to="/movies/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={setMenuOpen}
          className="font-serif text-2xl hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400",
          }}
        >
          Movies
        </Link>
        <Link
          to="/tvs/$pageNumber"
          params={{ pageNumber: 1 }}
          onClick={setMenuOpen}
          className="font-serif text-2xl hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400 ",
          }}
        >
          Series
        </Link>
      </nav>
    </Drawer>
  );
}

function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t border-cyan-500 px-2 py-6 lg:py-10">
      <div className="flex max-w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-double border-cyan-500 bg-[#131E2E] px-4 py-6 text-white lg:gap-4">
        <nav className="flex w-full flex-row justify-center gap-4 text-cyan-500">
          <Link to="/discover/$pageNumber" params={{ pageNumber: 1 }}>
            Discover
          </Link>
          <Link to="/movies/1">Movies</Link>
          <Link to="/tvs/1">Series</Link>
          <Link to="/account">Account</Link>
        </nav>
        <section className="flex w-full flex-col text-center">
          <p>
            Your destination for online movie streaming. Watch movies anytime,
            anywhere. Explore our vast collection and experience cinematic
            wonders at your fingertips.
          </p>
          <div className="self-center pt-4 text-white">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://eduardstroescu-portofolio.vercel.app/"
              className="text-cyan-300"
            >
              &copy; {new Date().getFullYear()} / Eduard Stroescu
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const userPropTypes = PropTypes.shape({
  avatar: PropTypes.string,
  createdAt: PropTypes.string,
  displayName: PropTypes.string,
  id: PropTypes.number,
  updatedAt: PropTypes.string,
  email: PropTypes.string,
  googleId: PropTypes.string,
  facebookId: PropTypes.string,
});
DesktopHeader.propTypes = {
  setOverlayType: PropTypes.func.isRequired,
  setOverlay: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  user: userPropTypes,
  setUser: PropTypes.func.isRequired,
  setBookmarkList: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
};

MobileHeader.propTypes = {
  setOverlayType: PropTypes.func.isRequired,
  setOverlay: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: userPropTypes,
};

DesktopMenuDrawer.propTypes = {
  user: userPropTypes,
  loggedIn: PropTypes.bool.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  setItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setBookmarkList: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  setOverlay: PropTypes.func.isRequired,
  setOverlayType: PropTypes.func.isRequired,
};

MobileMenuDrawer.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
