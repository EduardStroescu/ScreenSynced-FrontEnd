import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import ErrorComponent from "./components/ErrorComponent";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultErrorComponent: () => <ErrorComponent />,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
