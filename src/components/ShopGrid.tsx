"use client";

import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import Link from 'next/link'; // <--- ADDED IMPORT
import Reveal from './ui/Reveal';
import { useCart } from '@/context/CartContext';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

const MOCK_PRODUCTS = [
  { 
    id: '1', 
    title: 'Oversized Acid Wash Tee', 
    handle: 'oversized-acid-tee', 
    availableForSale: true,
    price: '45.00', 
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    variants: { edges: [{ node: { id: 'm1', title: 'S', price: { amount: '45.00' } } }, { node: { id: 'm2', title: 'M', price: { amount: '45.00' } } }] }
  },
  { 
    id: '2', 
    title: 'Tactical Cargo Pant V2', 
    handle: 'tactical-cargo-v2', 
    availableForSale: false, 
    price: '120.00', 
    img: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1000&auto=format&fit=crop' 
  },
  { 
    id: '3', 
    title: 'Nocturnal Hoodie', 
    handle: 'nocturnal-hoodie', 
    availableForSale: true,
    price: '95.00', 
    img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop' 
  },
];

const ProductSkeleton = ({ id }: { id: string }) => (
  <div className="border border-neutral-800 p-4 md:p-6 flex flex-col justify-between h-[650px] md:h-[600px] bg-neutral-950">
    <div className="w-full h-[400px] bg-neutral-900/50 border border-neutral-800 relative flex items-center justify-center overflow-hidden">
      <div className="text-neutral-700 font-mono text-xs z-10 bg-black px-2 animate-pulse">LOADING_DATA_{id}</div>
    </div>
    <div className="space-y-4 mt-4">
      <div className="h-6 w-3/4 bg-neutral-900 animate-pulse"></div>
      <div className="h-4 w-1/4 bg-neutral-900 animate-pulse"></div>
      <div className="h-10 w-full bg-neutral-900 animate-pulse"></div>
    </div>
  </div>
);

interface Product {
  id: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  subheader?: { value: string };
  description?: string;
  images?: { edges: { node: { url: string; altText?: string; } }[] };
  img?: string;
  priceRange?: { minVariantPrice: { amount: string; currencyCode: string; } };
  price?: string;
  variants?: {
    edges: {
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode?: string; };
      };
    }[];
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const isSoldOut = !product.availableForSale;
  const variants = product.variants?.edges || [];
  const [selectedVariant, setSelectedVariant] = useState(variants[0]?.node);

  const image = product.images?.edges?.[0]?.node || { url: product.img, altText: product.title };
  const priceDisplay = product.priceRange?.minVariantPrice || { amount: product.price, currencyCode: 'USD' };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSoldOut || !selectedVariant) return;

    addToCart({
      id: selectedVariant.id,
      title: product.title,
      handle: product.handle,
      price: selectedVariant.price.amount,
      img: image.url || "",
      quantity: 1,
      size: selectedVariant.title
    });
  };

  const subheaderText = product.subheader?.value 
    ? `// ${product.subheader.value}` 
    : `// ${product.handle.toUpperCase().replace(/-/g, '_')}`;

  return (
    <div className={`border border-neutral-800 p-4 md:p-6 flex flex-col justify-between h-[650px] md:h-[600px] transition-all duration-300 bg-neutral-950 relative overflow-hidden ${isSoldOut ? 'opacity-60' : 'hover:border-neutral-500 group'}`}>
      
      {isSoldOut && (
        <div className="absolute top-4 left-4 z-30 bg-[#ff00ff] text-white font-mono text-[10px] px-2 py-1 font-black uppercase tracking-widest animate-pulse border border-[#ff00ff]">
          // SOLD_OUT
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff00ff] z-20 opacity-0 group-hover:opacity-100 animate-scanline" />
      
      {/* UPDATED: WRAPPED IMAGE IN LINK */}
      <Link 
        href={`/products/${product.handle}`}
        className="block w-full h-[350px] md:h-[380px] bg-neutral-900 relative flex items-center justify-center overflow-hidden cursor-none"
      >
        {image.url ? (
          <img 
            src={image.url} 
            alt={image.altText || product.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${!isSoldOut && 'group-hover:scale-110'} ${isSoldOut && 'grayscale'}`} 
          />
        ) : (
          <div className="text-neutral-600 font-mono text-xs">NO_IMAGE</div>
        )}
      </Link>

      <div className="space-y-1 mt-4">
        {/* UPDATED: WRAPPED TITLE IN LINK */}
        <Link href={`/products/${product.handle}`} className="cursor-none">
          <h3 className="text-lg md:text-xl font-black uppercase leading-tight line-clamp-1 hover:text-[#ff00ff] transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
          {subheaderText}
        </p>
        
        <p className="font-mono text-sm font-bold text-[#ff00ff] mt-1">
          {parseFloat(priceDisplay.amount).toLocaleString(undefined, { style: 'currency', currency: priceDisplay.currencyCode || 'USD' })}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {variants.map((variant) => (
          <button
            key={variant.node.id}
            disabled={isSoldOut}
            onClick={() => setSelectedVariant(variant.node)}
            className={`text-[10px] font-mono px-3 py-1 border transition-all ${
              selectedVariant?.id === variant.node.id 
                ? "bg-white text-black border-white" 
                : "bg-transparent text-neutral-500 border-neutral-800 hover:border-neutral-400"
            } ${isSoldOut ? 'cursor-not-allowed opacity-30' : ''}`}
          >
            {variant.node.title}
          </button>
        ))}
      </div>

      <button 
        disabled={isSoldOut}
        onClick={handleAdd}
        className={`mt-6 w-full border py-3 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 !transform-none will-change-transform
          ${isSoldOut 
            ? 'border-neutral-800 text-neutral-600 cursor-not-allowed' 
            : 'border-white hover:bg-[#ff00ff] hover:border-[#ff00ff] hover:text-white'}`}
      >
        {isSoldOut ? 'OUT OF STOCK' : 'ADD TO CART'} {!isSoldOut && <Plus size={14} />}
      </button>

      <style>{`
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scanline { animation: scanline 2s linear infinite; }
      `}</style>
    </div>
  );
};

export default function ShopGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopifyProducts = async () => {
      // Mock Data Check
      if (SHOPIFY_DOMAIN.includes("your-shop") || SHOPIFY_STOREFRONT_ACCESS_TOKEN.includes("your-public")) {
        setProducts(MOCK_PRODUCTS as unknown as Product[]);
        setLoading(false);
        return;
      }

      // The Updated Query with Metafields
      const query = `
        {
          products(first: 12) {
            edges {
              node {
                id
                title
                handle
                availableForSale
                subheader: metafield(namespace: "custom", key: "subheader") {
                  value
                }
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      try {
      // UPDATED: Use 2025-01
const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();
        if (json.errors) throw new Error(json.errors[0].message);

        setProducts(json.data.products.edges.map((edge: any) => edge.node));
      } catch (err) {
        console.error("Shopify Fetch Error:", err);
        setProducts(MOCK_PRODUCTS as unknown as Product[]);
      } finally {
        setLoading(false);
      }
    };

    fetchShopifyProducts();
  }, []);

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-neutral-800 pb-8">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">COLLECTION 01</h2>
            <span className="font-mono text-neutral-500 mt-4 md:mt-0">[ {products.length} ITEMS / READY TO SHIP ]</span>
          </Reveal>
        </div>

        {SHOPIFY_DOMAIN.includes("your-shop") && !loading && (
          <Reveal>
            <div className="mb-8 p-3 border border-neutral-800 bg-neutral-900/50 text-neutral-500 font-mono text-xs flex items-center gap-3">
              <AlertCircle size={16} />
              <span>DEMO MODE: DISPLAYING MOCK DATA.</span>
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {loading ? (
             [...Array(12)].map((_, i) => <ProductSkeleton key={i} id={String(i + 1).padStart(2, '0')} />)
          ) : (
            products.map((product, i) => (
              <Reveal key={product.id} delay={i * 50}>
                <ProductCard product={product} />
              </Reveal>
            ))
          )}
        </div>
        
        <div className="mt-24 text-center border-t border-neutral-900 pt-12">
          <p className="font-mono text-xs text-neutral-600 mb-4">// END OF COLLECTION</p>
          <Reveal className="!transform-none"> 
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="relative inline-block text-sm font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-[#ff00ff] hover:border-[#ff00ff] transition-colors duration-300"
            >
                Back to Top
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}