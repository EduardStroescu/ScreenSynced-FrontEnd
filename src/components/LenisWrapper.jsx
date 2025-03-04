import PropTypes from "prop-types";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const LenisWrapper = ({ children }) => {
  const lenisRef = useRef(null);
  const routerState = useRouterState();
  // Make Scroll Restoration work with Lenis
  useEffect(() => {
    if (lenisRef?.current && routerState.isLoading) {
      lenisRef.current.stop();
    }
    if (lenisRef?.current && !routerState.isLoading) {
      lenisRef.current.start();
    }
  }, [routerState]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        orientation: "vertical",
        gestureOrientataion: "vertical",
        lerp: 0.08,
        wheelMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
};

LenisWrapper.propTypes = {
  children: PropTypes.node,
};
