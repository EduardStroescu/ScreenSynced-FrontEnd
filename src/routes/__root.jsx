import { Layout } from "@components/Layout";
import { ReactLenis } from "@studio-freight/react-lenis";
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
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
    <Layout>
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
        <Outlet />
      </ReactLenis>
      <ScrollRestoration />
      {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
    </Layout>
  );
}
