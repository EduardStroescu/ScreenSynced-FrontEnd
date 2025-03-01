import { useOverlayContext } from "@lib/providers/OverlayProvider";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

export const Overlay = ({ modalTypes }) => {
  const { overlayType, setOverlayType } = useOverlayContext();

  return (
    <AnimatePresence>
      {!!modalTypes[overlayType] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: modalTypes[overlayType] ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-[1000] flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto p-4"
        >
          <div
            onClick={() => setOverlayType(null)}
            className="absolute z-[-1] h-full w-full bg-black/90"
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
