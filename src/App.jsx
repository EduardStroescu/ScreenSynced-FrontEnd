import { ErrorComponent } from "@components/ErrorComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
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
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
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
