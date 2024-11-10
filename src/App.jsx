import { ErrorComponent } from "@components/ErrorComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: false,
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
