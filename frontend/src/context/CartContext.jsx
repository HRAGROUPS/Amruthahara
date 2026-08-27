import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "amruthahara_cart";

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readCart);
  const persist = (items) => {
    setCartItems(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };
  const itemId = (item) => String(item?._id || item?.id || "");
  const addToCart = (product) => {
    const current = readCart();
    const id = itemId(product);
    const exists = current.some((item) => itemId(item) === id);
    persist(exists ? current.map((item) => itemId(item) === id ? { ...item, quantity: Number(item.quantity || 1) + 1 } : item) : [...current, { ...product, quantity: 1 }]);
  };
  const changeQuantity = (item, amount) => persist(cartItems.map((entry) => entry === item ? { ...entry, quantity: Math.max(1, Number(entry.quantity || 1) + amount) } : entry));
  const value = {
    cartItems,
    cart: cartItems,
    cartCount: cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    cartTotal: cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    addToCart,
    increaseQuantity: (item) => changeQuantity(item, 1),
    decreaseQuantity: (item) => changeQuantity(item, -1),
    removeFromCart: (id) => persist(cartItems.filter((item) => itemId(item) !== String(id))),
    clearCart: () => persist([]),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context) return context;
  const cartItems = readCart();
  return { cartItems, cart: cartItems, cartCount: 0, cartTotal: 0, addToCart: () => {}, increaseQuantity: () => {}, decreaseQuantity: () => {}, removeFromCart: () => {}, clearCart: () => {} };
}
