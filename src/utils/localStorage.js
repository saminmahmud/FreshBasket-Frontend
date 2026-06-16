const CART_KEY = "cartItems";

// get
// export const getCartItems = () => {
//   const items = localStorage.getItem(CART_KEY);
//   return items ? JSON.parse(items) : [];
// };

export const getCartItems = () => {
  try {
    const items = localStorage.getItem("cartItems");
    return items ? JSON.parse(items) : [];
  } catch (err) {
    console.error("Cart parse error:", err);
    return [];
  }
};

// save
export const saveCartItems = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// add
export const addToCart = (items, product) => {
  const existing = items.find((i) => i.id === product.id);

  if (existing) {
    return items.map((i) =>
      i.id === product.id ? { ...i, qty: i.qty + 1 } : i
    );
  }

  return [...items, { ...product, qty: 1 }];
};

// update qty
export const updateQty = (items, id, qty) => {
  if (qty <= 0) return items.filter((i) => i.id !== id);

  return items.map((i) =>
    i.id === id ? { ...i, qty } : i
  );
};

// remove
export const removeItem = (items, id) => {
  return items.filter((i) => i.id !== id);
};

// clear
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};