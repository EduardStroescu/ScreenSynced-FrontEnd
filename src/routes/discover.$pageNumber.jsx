import { FileRoute } from "@tanstack/react-router";
import { Discover } from "../pages";

export const route = new FileRoute("/discover/$pageNumber").createRoute({
  beforeLoad: ({ params: { pageNumber = 1 } }) => {
    const context = { pageNumber: pageNumber };
    return context;
  },
  component: () => {
    return <Discover />;
  },
});
