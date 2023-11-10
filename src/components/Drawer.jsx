import { motion } from "framer-motion";
import { mobileVariants } from "../lib/const";
import { CloseIcon } from "./";

export function Drawer({ isMenuOpen, setMenuOpen, children }) {
  return (
    <motion.div
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      variants={mobileVariants}
      className="relative z-[210] block bg-[url('/pageBackground.jpg')] lg:hidden"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25" />
      <div className="fixed inset-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 flex max-w-full">
            <div className="h-[100vh] w-[100vw] max-w-lg transform border-4 border-double border-cyan-500 bg-[#070B11] text-left align-middle shadow-xl transition-all">
              <header className="sticky top-2 flex items-center justify-between px-6 py-4 text-cyan-500 sm:px-8 md:px-12">
                <div>
                  <h2 className="text-2xl font-bold">Menu</h2>
                </div>
                <button
                  type="button"
                  className="text-primary hover:text-primary/50 -m-4 p-4 transition"
                  onClick={() => setMenuOpen()}
                  data-test="close-menu"
                >
                  <CloseIcon
                    aria-label="Close panel"
                    className="hover:stroke-cyan-500"
                  />
                </button>
              </header>
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
