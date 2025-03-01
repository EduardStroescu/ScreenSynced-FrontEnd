import { useClickOutside } from "@hooks/useClickOutside";
import { desktopVariants } from "@lib/framerMotionVariants.js";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useRef, useState } from "react";

import { placeholderAvatar } from "@lib/const";

import { Drawer } from "@components/Drawer";
import { HamburgerIcon, SearchIcon } from "@components/Icons";
import { SearchBarDesktop } from "@components/SearchBar";
import { useAuthContext } from "@lib/providers/AuthProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import PropTypes from "prop-types";

export function Layout({ children }) {
  const { user } = useAuthContext();

  return (
    <>
      <DesktopHeader user={user} />
      <MobileHeader user={user} />
      <main className="relative min-h-screen text-white">{children}</main>
      <Footer />
    </>
  );
}

function DesktopHeader({ user }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      className="fixed top-0 z-[200] hidden h-16 w-full items-center justify-between gap-8 bg-gradient-to-b from-[#070B11] via-[#070B11]/80 to-[#070B11]/0 px-12 py-10 text-white transition duration-300 md:px-10 lg:flex dark:text-white"
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
          aria-label="Discover Movies and Series"
          to="/discover/$pageNumber"
          params={{ pageNumber: 1 }}
          search={{ genres: "action" }}
          className="font-serif text-lg hover:text-cyan-400"
          activeProps={{
            className: "text-cyan-400",
          }}
        >
          Discover
        </Link>
        <Link
          aria-label="See All Movies"
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
          aria-label="See All Series"
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
          user={user}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
      </nav>
    </header>
  );
}

function MobileHeader({ user }) {
  const [isMenuOpen, setMenuOpen] = useCycle(false, true);
  const { setOverlayType } = useOverlayContext();

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
          <button onClick={() => setOverlayType("search")}>
            <SearchIcon className={"w-[1.2rem] stroke-white"} />
          </button>
          {user ? (
            <div className="relative w-[2.5rem]">
              <Link to="/account">
                <motion.img
                  src={user?.avatar || placeholderAvatar}
                  alt={user?.displayName + "picture"}
                  className="aspect-[1/1] rounded-full object-cover"
                />
              </Link>
            </div>
          ) : (
            <button
              className="text-lg"
              onClick={() => {
                setOverlayType("sign-in");
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

export function DesktopMenuDrawer({ user, isMenuOpen, setMenuOpen }) {
  const { logout } = useAuthContext();
  const { setOverlayType } = useOverlayContext();
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenuOpen(false));
  const { mutateAsync: handleLogout } = logout;

  return (
    <AnimatePresence>
      {user ? (
        <div ref={menuRef} className="relative w-[2.5rem]">
          <button type="button" onClick={() => setMenuOpen((x) => !x)}>
            <img
              src={user?.avatar || placeholderAvatar}
              alt={user?.displayName + "picture"}
              className="aspect-[1/1] rounded-full object-cover"
            />
          </button>
          <motion.div
            initial={false}
            animate={isMenuOpen ? "open" : "closed"}
            variants={desktopVariants}
            className="absolute right-0 top-14 flex flex-col justify-around gap-2 rounded-lg border-4 border-double border-cyan-500 bg-[#070B11] px-10 pb-2 font-serif text-lg"
          >
            <h3 className="w-full border-b-2 border-double border-cyan-500 py-2 text-center font-londrina text-3xl text-white">
              {user?.displayName}
            </h3>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded border-[1px] border-transparent px-2 text-center hover:border-cyan-500"
            >
              Account
            </Link>
            <Link
              to="/account"
              onClick={() => setMenuOpen(false)}
              className="w-full rounded border-[1px] border-transparent px-2 text-center hover:border-cyan-500"
            >
              Bookmarks
            </Link>
            <Link
              to="/"
              className="w-full rounded border-[1px] border-transparent px-2 text-center hover:border-cyan-500"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </motion.div>
        </div>
      ) : (
        <button
          onClick={() => {
            setOverlayType("sign-in");
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
          aria-label="Discover Movies and Series"
          to="/discover/$pageNumber"
          search={{ genres: "action" }}
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
          aria-label="See All Movies"
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
          aria-label="See All Series"
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
          <Link
            to="/discover/$pageNumber"
            params={{ pageNumber: 1 }}
            search={{ genres: "action" }}
          >
            Discover
          </Link>
          <Link to="/movies/1" aria-label="See All Movies">
            Movies
          </Link>
          <Link to="/tvs/1" aria-label="See All Series">
            Series
          </Link>
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
              href="https://eduardstroescu.com"
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
  children: PropTypes.node,
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
  user: userPropTypes,
};

MobileHeader.propTypes = {
  user: userPropTypes,
};

DesktopMenuDrawer.propTypes = {
  user: userPropTypes,
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};

MobileMenuDrawer.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
