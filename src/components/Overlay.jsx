import { useUserStoreActions } from "@lib/store";
import PropTypes from "prop-types";

export function Overlay({ children }) {
  const { setOverlay } = useUserStoreActions();
  return (
    <div className="fixed left-0 top-0 z-[1000] flex min-h-screen w-full flex-col items-center justify-center overflow-y-auto">
      <div
        onClick={() => setOverlay(false)}
        className="absolute z-[-1] h-full w-full bg-black/90"
      />
      <div className="relative z-[1] flex max-h-screen w-full flex-col items-center overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
};
