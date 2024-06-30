import { route as CatchAllRoute } from "./routes/$";
import { route as rootRoute } from "./routes/__root";
import { route as AccountRoute } from "./routes/account";
import { route as DiscoverRoute } from "./routes/discover.$pageNumber";
import { route as IndexRoute } from "./routes/index";
import { route as LoginRoute } from "./routes/login";
import { route as MovieMovieIdRoute } from "./routes/movie.$movieId";
import { route as MoviesRoute } from "./routes/movies.$pageNumber";
import { route as SearchRoute } from "./routes/search.$searchTerm.$pageNumber";
import { route as SignUpRoute } from "./routes/signUp";
import { route as TvRouteTvIdRoute } from "./routes/tv.$tvId";
import { route as TvsRoute } from "./routes/tvs.$pageNumber";

Object.assign(IndexRoute.options, {
  path: "/",
  getParentRoute: () => rootRoute,
});

Object.assign(CatchAllRoute.options, {
  path: "/$",
  getParentRoute: () => rootRoute,
});

Object.assign(SearchRoute.options, {
  path: "/search/$searchTerm/$pageNumber",
  getParentRoute: () => rootRoute,
});

Object.assign(DiscoverRoute.options, {
  path: "/discover/$pageNumber",
  getParentRoute: () => rootRoute,
});

Object.assign(SignUpRoute.options, {
  path: "/signup",
  getParentRoute: () => rootRoute,
});

Object.assign(LoginRoute.options, {
  path: "/login",
  getParentRoute: () => rootRoute,
});

Object.assign(MoviesRoute.options, {
  path: "/movies/$pageNumber",
  getParentRoute: () => rootRoute,
});

Object.assign(MovieMovieIdRoute.options, {
  path: "/movie/$movieId",
  getParentRoute: () => rootRoute,
});

Object.assign(TvsRoute.options, {
  path: "/tvs/$pageNumber",
  getParentRoute: () => rootRoute,
});

Object.assign(TvRouteTvIdRoute.options, {
  path: "/tv/$tvId",
  getParentRoute: () => rootRoute,
});

Object.assign(AccountRoute.options, {
  path: "/account",
  getParentRoute: () => rootRoute,
});

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  CatchAllRoute,
  SearchRoute,
  DiscoverRoute,
  SignUpRoute,
  LoginRoute,
  MoviesRoute,
  MovieMovieIdRoute,
  TvsRoute,
  TvRouteTvIdRoute,
  AccountRoute,
]);
