import { createContext, useState, useEffect } from 'react';

const getItemInCart = (cartItems, itemToCheck) => {
  return cartItems.find((cartItem) => cartItem.id === itemToCheck.id);
};

const addCartItem = (cartItems, productToAdd) => {
  if (getItemInCart(cartItems, productToAdd)) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = getItemInCart(cartItems, productToRemove);

  if (existingItem.quantity === 1) {
    return deleteCartItem(cartItems, productToRemove);
  }

  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const deleteCartItem = (cartItems, productToDelete) => {
  if (getItemInCart(cartItems, productToDelete)) {
    return cartItems.filter((cartItem) => {
      return cartItem.id !== productToDelete.id;
    });
  }

  return cartItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((accumulator, currentObj) => {
      return accumulator + currentObj.quantity;
    }, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotalPrice = cartItems.reduce((accumulator, currentObj) => {
      return accumulator + currentObj.price * currentObj.quantity;
    }, 0);

    setCartTotalPrice(newCartTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
