import { Outlet, RootRoute, ScrollRestoration } from "@tanstack/react-router";
import { Layout } from "../components";

export const route = new RootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
        <ScrollRestoration />
        {/* <TanStackRouterDevtools initialIsOpen={false} /> */}
      </Layout>
    </>
  ),
});
