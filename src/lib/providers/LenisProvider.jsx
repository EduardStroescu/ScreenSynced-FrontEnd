import PropTypes from "prop-types";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useRouterState } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef } from "react";

const LenisContext = createContext(null);

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const locationKey = useRouterState({
    select: (s) => s.location.state.key,
  });

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Stop immediately on route change
    lenis.stop();

    // Resume on next frame (after restoration)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenis.start();
      });
    });
  }, [locationKey]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        orientation: "vertical",
        gestureOrientaion: "vertical",
        lerp: 0.08,
        wheelMultiplier: 1.2,
      }}
    >
      <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
    </ReactLenis>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisContext must be used within an LenisProvider");
  }
  return context;
};

LenisProvider.propTypes = {
  children: PropTypes.node,
};
