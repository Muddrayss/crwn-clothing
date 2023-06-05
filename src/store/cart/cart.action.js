import { createAction } from '../../utils/reducers/reducers.utils';

import { CART_ACTION_TYPES } from './cart.types';

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

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_IS_OPEN, bool);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
