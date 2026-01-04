import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer'; // NEW: Import the UI component
import { CartProvider } from '@/context/CartContext'; // NEW: Import the data provider
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'URBNWAVE | MELBOURNE / TOKYO / CONCRETE',
  description: 'Brutalist Streetwear Brand. Built to bleed.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black cursor-none`}>
        {/* The CartProvider must wrap everything that needs access to the cart */}
        <CartProvider>
          <NoiseOverlay />
          <CustomCursor />
          <Navbar />
          
          <main>{children}</main>
          
          {/* The CartDrawer sits at the root level so it can slide over any page */}
          <CartDrawer />
          
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}