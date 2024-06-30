import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { mobileVariants } from "../lib/framerMotionVariants";
import { CloseIcon } from "./";

export function Drawer({ isMenuOpen, setMenuOpen, children }) {
  return (
    <motion.div
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      variants={mobileVariants}
      className="fixed z-[210] block bg-[url('/pageBackground.jpg')] lg:hidden"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 flex max-w-full">
          <div className="h-[100vh] w-[100vw] max-w-lg transform border-4 border-double border-cyan-500 bg-[#070B11] shadow-xl transition-all">
            <button
              type="button"
              className="text-primary hover:text-primary/50 absolute right-2 top-2 p-4 transition"
              onClick={setMenuOpen}
              data-test="close-menu"
            >
              <CloseIcon
                aria-label="Close panel"
                className="hover:stroke-cyan-500"
              />
            </button>
            <header className="my-12 w-full px-6 text-cyan-500 sm:px-8 md:px-12">
              <h2 className="text-center text-3xl font-bold">Menu</h2>
            </header>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

Drawer.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
