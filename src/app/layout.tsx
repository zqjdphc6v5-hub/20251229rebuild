import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}