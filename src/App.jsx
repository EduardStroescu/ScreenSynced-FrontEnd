import { ReactLenis } from "@studio-freight/react-lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "./routeTree";

const queryClient = new QueryClient();
const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactLenis
          root
          options={{
            orientation: "vertical",
            gestureOrientataion: "vertical",
            lerp: 0.08,
            wheelMultiplier: 1.2,
          }}
        >
          <RouterProvider router={router} />
        </ReactLenis>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
