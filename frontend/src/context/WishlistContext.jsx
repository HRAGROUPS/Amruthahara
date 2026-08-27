import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);
const WISHLIST_KEY = "amruthahara_wishlist";

function readWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readWishlist);
  const persist = (items) => {
    setWishlist(items);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  };
  const itemId = (item) => String(item?._id || item?.id || "");
  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    toggleWishlist: (product) => {
      const id = itemId(product);
      persist(wishlist.some((item) => itemId(item) === id) ? wishlist.filter((item) => itemId(item) !== id) : [...wishlist, product]);
    },
    removeFromWishlist: (id) => persist(wishlist.filter((item) => itemId(item) !== String(id))),
    clearWishlist: () => persist([]),
    isInWishlist: (id) => wishlist.some((item) => itemId(item) === String(id)),
  };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context) return context;
  return { wishlist: readWishlist(), wishlistCount: 0, toggleWishlist: () => {}, removeFromWishlist: () => {}, clearWishlist: () => {}, isInWishlist: () => false };
}
