import PropTypes from "prop-types";
import { useUserStoreActions } from "../store";

export function Overlay({ children }) {
  const { setOverlay } = useUserStoreActions();
  return (
    <div className="fixed left-0 top-0 z-[1000] flex h-full w-full flex-col items-center justify-center">
      <div
        onClick={() => setOverlay(false)}
        className="absolute z-[-1] h-full w-full bg-black/90"
      />
      {children}
    </div>
  );
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};
