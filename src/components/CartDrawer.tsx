"use client";

import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();

  // If the cart isn't open, don't render anything
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      {/* Backdrop: Blurs the background when cart is open */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-black border-l border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#ff00ff]" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Your_Cart</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 hover:bg-neutral-900 border border-transparent hover:border-neutral-700 transition-all text-neutral-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 grayscale">
              <p className="font-mono text-xs tracking-[0.2em]">// CART_IS_EMPTY</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="group flex gap-4 border border-neutral-800 p-4 bg-neutral-950 hover:border-neutral-600 transition-colors relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-full bg-[#ff00ff] transition-all duration-300" />
                
                <div className="w-20 h-24 bg-neutral-900 border border-neutral-800 flex-shrink-0 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-bold uppercase leading-tight line-clamp-1">{item.title}</h3>
                    <p className="font-mono text-[10px] text-neutral-500 mt-1 uppercase">Size: {item.size || 'N/A'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="font-mono text-sm text-[#ff00ff] font-bold">${item.price}</p>
                    <p className="font-mono text-[9px] text-neutral-600">QTY: {item.quantity}</p>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-neutral-700 hover:text-red-500 transition-colors self-start p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Button */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs text-neutral-500">
              <span>SUBTOTAL</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-xl tracking-tighter">
              <span>TOTAL_USD</span>
              <span className="text-[#ff00ff]">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            disabled={cart.length === 0}
            className="w-full bg-white text-black font-black py-5 uppercase tracking-[0.2em] text-xs hover:bg-[#ff00ff] hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="relative z-10">Proceed to Checkout [+]</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
          </button>
          
          <p className="text-[9px] font-mono text-neutral-600 text-center uppercase tracking-widest">
            // Shipping and taxes calculated at next step
          </p>
        </div>
      </div>
    </div>
  );
}