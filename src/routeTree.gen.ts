/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignUpImport } from './routes/signUp'
import { Route as LoginImport } from './routes/login'
import { Route as AccountImport } from './routes/account'
import { Route as SplatImport } from './routes/$'
import { Route as IndexImport } from './routes/index'
import { Route as TvsPageNumberImport } from './routes/tvs.$pageNumber'
import { Route as TvTvIdImport } from './routes/tv.$tvId'
import { Route as MoviesPageNumberImport } from './routes/movies.$pageNumber'
import { Route as MovieMovieIdImport } from './routes/movie.$movieId'
import { Route as DiscoverPageNumberImport } from './routes/discover.$pageNumber'
import { Route as SearchSearchTermPageNumberImport } from './routes/search.$searchTerm.$pageNumber'

// Create/Update Routes

const SignUpRoute = SignUpImport.update({
  path: '/signUp',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AccountRoute = AccountImport.update({
  path: '/account',
  getParentRoute: () => rootRoute,
} as any)

const SplatRoute = SplatImport.update({
  path: '/$',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TvsPageNumberRoute = TvsPageNumberImport.update({
  path: '/tvs/$pageNumber',
  getParentRoute: () => rootRoute,
} as any)

const TvTvIdRoute = TvTvIdImport.update({
  path: '/tv/$tvId',
  getParentRoute: () => rootRoute,
} as any)

const MoviesPageNumberRoute = MoviesPageNumberImport.update({
  path: '/movies/$pageNumber',
  getParentRoute: () => rootRoute,
} as any)

const MovieMovieIdRoute = MovieMovieIdImport.update({
  path: '/movie/$movieId',
  getParentRoute: () => rootRoute,
} as any)

const DiscoverPageNumberRoute = DiscoverPageNumberImport.update({
  path: '/discover/$pageNumber',
  getParentRoute: () => rootRoute,
} as any)

const SearchSearchTermPageNumberRoute = SearchSearchTermPageNumberImport.update(
  {
    path: '/search/$searchTerm/$pageNumber',
    getParentRoute: () => rootRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$': {
      id: '/$'
      path: '/$'
      fullPath: '/$'
      preLoaderRoute: typeof SplatImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/signUp': {
      id: '/signUp'
      path: '/signUp'
      fullPath: '/signUp'
      preLoaderRoute: typeof SignUpImport
      parentRoute: typeof rootRoute
    }
    '/discover/$pageNumber': {
      id: '/discover/$pageNumber'
      path: '/discover/$pageNumber'
      fullPath: '/discover/$pageNumber'
      preLoaderRoute: typeof DiscoverPageNumberImport
      parentRoute: typeof rootRoute
    }
    '/movie/$movieId': {
      id: '/movie/$movieId'
      path: '/movie/$movieId'
      fullPath: '/movie/$movieId'
      preLoaderRoute: typeof MovieMovieIdImport
      parentRoute: typeof rootRoute
    }
    '/movies/$pageNumber': {
      id: '/movies/$pageNumber'
      path: '/movies/$pageNumber'
      fullPath: '/movies/$pageNumber'
      preLoaderRoute: typeof MoviesPageNumberImport
      parentRoute: typeof rootRoute
    }
    '/tv/$tvId': {
      id: '/tv/$tvId'
      path: '/tv/$tvId'
      fullPath: '/tv/$tvId'
      preLoaderRoute: typeof TvTvIdImport
      parentRoute: typeof rootRoute
    }
    '/tvs/$pageNumber': {
      id: '/tvs/$pageNumber'
      path: '/tvs/$pageNumber'
      fullPath: '/tvs/$pageNumber'
      preLoaderRoute: typeof TvsPageNumberImport
      parentRoute: typeof rootRoute
    }
    '/search/$searchTerm/$pageNumber': {
      id: '/search/$searchTerm/$pageNumber'
      path: '/search/$searchTerm/$pageNumber'
      fullPath: '/search/$searchTerm/$pageNumber'
      preLoaderRoute: typeof SearchSearchTermPageNumberImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  SplatRoute,
  AccountRoute,
  LoginRoute,
  SignUpRoute,
  DiscoverPageNumberRoute,
  MovieMovieIdRoute,
  MoviesPageNumberRoute,
  TvTvIdRoute,
  TvsPageNumberRoute,
  SearchSearchTermPageNumberRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/$",
        "/account",
        "/login",
        "/signUp",
        "/discover/$pageNumber",
        "/movie/$movieId",
        "/movies/$pageNumber",
        "/tv/$tvId",
        "/tvs/$pageNumber",
        "/search/$searchTerm/$pageNumber"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/$": {
      "filePath": "$.jsx"
    },
    "/account": {
      "filePath": "account.jsx"
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/signUp": {
      "filePath": "signUp.jsx"
    },
    "/discover/$pageNumber": {
      "filePath": "discover.$pageNumber.jsx"
    },
    "/movie/$movieId": {
      "filePath": "movie.$movieId.jsx"
    },
    "/movies/$pageNumber": {
      "filePath": "movies.$pageNumber.jsx"
    },
    "/tv/$tvId": {
      "filePath": "tv.$tvId.jsx"
    },
    "/tvs/$pageNumber": {
      "filePath": "tvs.$pageNumber.jsx"
    },
    "/search/$searchTerm/$pageNumber": {
      "filePath": "search.$searchTerm.$pageNumber.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
