import { create } from "zustand";

export const useUserStore = create((set) => ({
  loggedIn: false,
  user: null,
  bookmarkList: [],
  isOverlay: false,
  overlayType: "login",
  actions: {
    setLoggedIn: (loggedIn) => set({ loggedIn }),
    setUser: (user) => set({ user }),
    setBookmarkList: (bookmarkList) => set({ bookmarkList }),
    setOverlay: (isOverlay) => set({ isOverlay }),
    setOverlayType: (overlayType) => set({ overlayType }),
  },
}));

export const useUserStoreActions = () => useUserStore((state) => state.actions);
