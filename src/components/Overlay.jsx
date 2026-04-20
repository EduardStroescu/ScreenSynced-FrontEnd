import { useLenisContext } from "@lib/providers/LenisProvider";
import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const Overlay = ({ modalTypes }) => {
  const { overlayType, setOverlayType } = useOverlayContext();
  const lenisRef = useLenisContext();

  useEffect(() => {
    if (overlayType) {
      document.documentElement.style.scrollbarGutter = "stable";
      document.body.style.overflow = "hidden";
      lenisRef.current?.stop();
    } else {
      document.documentElement.style.scrollbarGutter = "";
      document.body.style.overflow = "";
      lenisRef.current?.start();
    }
  }, [overlayType, lenisRef]);

  return (
    <AnimatePresence>
      {!!modalTypes[overlayType] && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[1000] flex min-h-dvh w-full flex-col items-center justify-center overflow-y-auto p-4"
        >
          <div
            onClick={() => setOverlayType(null)}
            className="absolute z-[-1] h-full w-full bg-black/60"
          />

          {modalTypes[overlayType]}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Overlay.propTypes = {
  modalTypes: PropTypes.object.isRequired,
};
