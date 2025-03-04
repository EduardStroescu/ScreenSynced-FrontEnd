import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState } from "react";

const OverlayContext = createContext(null);

export const OverlayProvider = ({ children }) => {
  const [overlayType, setOverlayType] = useState(false);

  const values = useMemo(
    () => ({
      overlayType,
      setOverlayType,
    }),
    [overlayType, setOverlayType],
  );

  return (
    <OverlayContext.Provider value={values}>{children}</OverlayContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOverlayContext = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlayContext must be used within an OverlayProvider");
  }
  return context;
};

OverlayProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

OverlayProvider.displayName = "OverlayProvider";
