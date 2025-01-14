import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const cartTotal = () => {
    let res = 0;
    
    for (let key of Object.keys(cart)) {
      
      const val = cart[key];
      res += (val.price * val.quantity);
    } 
    

    return Number.parseFloat(res).toFixed(2);

  }
  const addToCart = (item) => {
    
    const temp = {...item};
    const tempCart = copyCart(cart);
    tempCart[temp.id] = temp;
    
    setCart(tempCart);
  };

  const copyCart = (prevCart) => {
    const res = {};

    for (let key of Object.keys(prevCart)) {
      
      const val = prevCart[key];
      res[key] = {...val};
    } 


    return res;
    
  }

  const removeFromCart = (idToRemove) => {
    setCart((prevCart) => Object.fromEntries(
      Object.entries(prevCart).filter(([id]) => id !== idToRemove)
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
