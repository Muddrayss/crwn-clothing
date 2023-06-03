import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducers/reducers.utils';

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

const CART_STATE_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  TOGGLE_CART_IS_OPEN: 'TOGGLE_CART_IS_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_STATE_TYPES.TOGGLE_CART_IS_OPEN:
      return { ...state, isCartOpen: payload };
    case CART_STATE_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount, cartTotalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((accumulator, currentObj) => {
      return accumulator + currentObj.quantity;
    }, 0);

    const newCartTotalPrice = newCartItems.reduce((accumulator, currentObj) => {
      return accumulator + currentObj.price * currentObj.quantity;
    }, 0);

    dispatch(
      createAction(CART_STATE_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotalPrice: newCartTotalPrice,
      })
    );
  };
 
  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_STATE_TYPES.TOGGLE_CART_IS_OPEN, bool));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
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
