import { create } from "zustand";

export const useUser = create((set) => ({
  loggedIn: false,
  user: null,
  bookmarkList: [],
  isOverlay: false,
  overlayType: "login",
  setLoggedIn: (loggedIn) => set({ loggedIn }),
  setUser: (user) => set({ user }),
  setBookmarkList: (bookmarkList) => set({ bookmarkList }),
  setOverlay: (isOverlay) => set({ isOverlay }),
  setOverlayType: (overlayType) => set({ overlayType }),
}));
