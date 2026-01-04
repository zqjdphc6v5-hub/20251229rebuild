"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define what a product in our cart looks like
interface CartItem {
  id: string;
  title: string;
  handle: string;
  price: string;
  img: string;
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence: Load cart from local storage when the site loads
  useEffect(() => {
    const savedCart = localStorage.getItem('urbnwave_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Persistence: Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('urbnwave_cart', JSON.stringify(cart));
  }, [cart]);

const addToCart = (newItem: CartItem) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === newItem.id);
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prevCart, { ...newItem, quantity: 1 }];
  });
  // REMOVED: setIsCartOpen(true); <--- Delete this line so it doesn't pop open
};

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};