import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const wishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  function toggleWishlist(x) {
    const inx = wishlist.findIndex((b) => b.id === x.id);
    if (inx === -1) {
      setWishlist([...wishlist,x]);
      return;
    }
    setWishlist(wishlist.filter((b) => b.id !== x.id));
  }

  const data = {
    wishlist,toggleWishlist
  }

  return <wishlistContext.Provider value={data}>{children}</wishlistContext.Provider>;
}

export default WishlistProvider;
