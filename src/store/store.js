import { create } from "zustand";

const useStore = create((set) => ({
  likedProducts: [],
  addLikedProduct: (newLikedProduct) => set((state) => ({ likedProducts: state.likedProducts.push(newLikedProduct) })),
  removeLikedProduct: (likedProduct) => set((state) => ({ likedProducts: state.likedProducts.push(likedProduct) })),
  setLikedProducts: (likedProducts) => set((state) => ({ likedProducts: likedProducts })),
  logoutButton: localStorage.getItem("info") ? true : false,
  setLogoutButton: (val) => set(() => ({ logoutButton: val })),
}));

export default useStore;
