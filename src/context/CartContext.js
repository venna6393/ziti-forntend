import React from "react";

const CartContext = React.createContext({
  cartList: [],
  message: false,
  text: true,
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  clicked1: () => {},
  change1: () => {},
});

export default CartContext;
