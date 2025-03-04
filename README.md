<p align="center">
  <a href="https://screensynced.vercel.app/" target="blank"><img src="https://raw.githubusercontent.com/EduardStroescu/PubImages/main/WebsiteImages/screenSynced.jpg" alt="ScreenSynced Preview" /></a>
</p>

# ScreenSynced FrontEnd

### Links to the REST API/backend:

https://github.com/EduardStroescu/NestJs-ScreenSynced-Backend-CookieAuth - New Backend GIT Repository
https://screensynced-backend.vercel.app/ - New Backend HomePage
https://screensynced-backend.vercel.app/api/docs - New Backend API Documentation made with Swagger

https://github.com/EduardStroescu/ScreenSynced-Backend - OLD Backend GIT Repository
https://screensynced-database.vercel.app/- OLD Backend HomePage

# Introduction

Full-Stack content streaming website using the TMDB API and what used to be an ExpressJS REST API along with MongoDB and Cloudinary for authentication and bookmarking. The backend is now a NestJS REST API with Cookie based JWT authentication using NeonDB coupled with Prisma ORM and Cloudinary CDN for avatar uploads.

## Overview

Used Tanstack Router in combination with Tanstack Query in order to preload and manage the content required for all the routes, including TMDB data and user details. The profile pictures used by the users are sent to cloudinary where they are optimized by their specific tools and the encoded params(tokens) linking them to the users stored on the backend.

In order not to keep asking the user to log in for every visit I've used the browser's local storage to keep track of the user's last session state, which is then managed by Zustand.

## Technologies Used

- Vite-React
- [tanstack/react-query](https://github.com/TanStack/query)
- [tanstack/react-router](https://github.com/TanStack/router)
- [axios](https://github.com/axios/axios)
- [react-player](https://github.com/cookpete/react-player)
- [react-toastify](https://github.com/fkhadra/react-toastify)
- [swiper](https://github.com/nolimits4web/Swiper)
- [framer-motion](https://github.com/framer/motion)
- [react-hook-form](https://github.com/react-hook-form/react-hook-form)
- [zod](https://github.com/colinhacks/zod)
- [studio-freight/lenis](https://github.com/studio-freight/lenis)
- [Tailwind](https://tailwindcss.com/)

```
Remember to update `.env` with your tmbd token! You also need to provide the url to the frontend and backend

Example:

VITE_TMDB_KEY="" - Provided by TMBD
VITE_FRONTEND_URL="http://localhost:5173" for local dev - The url of where the frontend is hosted.
VITE_BACKEND_URL="" - The url of where the backend is hosted. The port can be chosen through the backend's .env

VITE_DEMO_ACC_EMAIL="" - Credentials of the account created for demo purposes
VITE_DEMO_ACC_PASSWORD="" - Credentials of the account created for demo purposes

```

### Installation && Local Development

```bash
git clone https://github.com/EduardStroescu/ScreenSynced-FrontEnd.git
npm install
npm run dev
```

### To prepare for production/minify

```bash
npm run build
```

### Notes:

I've made usage of the react-player library to display the videos from the site, and due to them being streamed from youtube there are multiple cors errors printed to the console, I've tried to troubleshoot the issue by changing the origin provided to youtube and the source, but it did solve the issue. Same thing when trying to use the youtube-player library. From multiple posts on both libraries' github pages it seems they acknowledged the issue, but don't know how to fix it.
Source: [react-player@github](https://github.com/cookpete/react-player/issues/508#issuecomment-454426112)
