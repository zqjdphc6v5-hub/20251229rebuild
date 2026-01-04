"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import Reveal from './ui/Reveal';

export default function ProductView({ product }: { product: any }) {
  const { addToCart } = useCart();
  
  // Safe access to variants in case data is malformed
  const variants = product?.variants?.edges || [];
  
  // Default to the first available variant, or just the first one if everything is sold out
  const [selectedVariant, setSelectedVariant] = useState(
    variants.find((v: any) => v.node.availableForSale)?.node || variants[0]?.node
  );

  if (!product || !selectedVariant) return null;

  const isSoldOut = !product.availableForSale;
  const currentPrice = selectedVariant.price.amount;

  const handleAdd = () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;
    
    addToCart({
      id: selectedVariant.id,
      title: product.title,
      handle: product.handle,
      price: currentPrice,
      img: product.images?.edges?.[0]?.node.url || "",
      quantity: 1,
      size: selectedVariant.title
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* LEFT: Images */}
      <div className="space-y-4">
        <Reveal>
            <div className="relative aspect-square bg-neutral-900 border border-neutral-800 overflow-hidden">
            {isSoldOut && (
                <div className="absolute top-6 left-6 z-30 bg-[#ff00ff] text-white font-mono text-sm px-3 py-1 font-black uppercase tracking-widest animate-pulse border border-[#ff00ff]">
                // SOLD_OUT
                </div>
            )}
            {product.images?.edges?.[0] ? (
              <img 
                  src={product.images.edges[0].node.url} 
                  alt={product.title}
                  className={`w-full h-full object-cover ${isSoldOut ? 'grayscale opacity-60' : ''}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-700 font-mono text-xs">NO_IMAGE</div>
            )}
            </div>
        </Reveal>
        
        {/* Gallery Grid (if more images exist) */}
        {product.images?.edges?.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
              {product.images.edges.slice(1).map((img: any, i: number) => (
               <Reveal delay={i * 100} key={i}>
                  <div className="aspect-square bg-neutral-900 border border-neutral-800">
                      <img src={img.node.url} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                  </div>
               </Reveal>
              ))}
          </div>
        )}
      </div>

      {/* RIGHT: Details */}
      <div className="flex flex-col justify-center h-full">
        <Reveal delay={200}>
            <div className="border-l-2 border-[#ff00ff] pl-6 mb-8">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-2">
                    {product.title}
                </h1>
                
                {/* Metafield Subheader (Optional) */}
                {product.subheader?.value && (
                  <p className="font-mono text-neutral-500 text-sm tracking-widest uppercase mb-2">
                    // {product.subheader.value}
                  </p>
                )}

                <p className="font-mono text-[#ff00ff] text-xl font-bold">
                    ${parseFloat(currentPrice).toLocaleString(undefined, { style: 'currency', currency: selectedVariant.price.currencyCode || 'USD' })}
                </p>
            </div>
        </Reveal>

        <Reveal delay={300}>
            <div className="prose prose-invert prose-p:font-mono prose-p:text-sm prose-p:text-neutral-400 mb-10 max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
            />
        </Reveal>

        {/* Size Selector */}
        <Reveal delay={400}>
            <div className="mb-8">
                <p className="font-mono text-xs text-neutral-500 mb-3 uppercase">// SELECT_SIZE</p>
                <div className="flex flex-wrap gap-3">
                    {variants.map((v: any) => {
                        const isAvailable = v.node.availableForSale;
                        const isSelected = selectedVariant.id === v.node.id;
                        
                        return (
                            <button
                                key={v.node.id}
                                onClick={() => setSelectedVariant(v.node)}
                                disabled={!isAvailable}
                                className={`
                                    min-w-[3rem] px-4 py-3 border text-sm font-bold font-mono transition-all
                                    ${isSelected ? 'bg-white text-black border-white' : 'bg-black text-neutral-500 border-neutral-800 hover:border-neutral-500'}
                                    ${!isAvailable ? 'opacity-30 cursor-not-allowed line-through' : ''}
                                `}
                            >
                                {v.node.title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </Reveal>

        {/* Action Button */}
        <Reveal delay={500}>
            <button 
                onClick={handleAdd}
                disabled={!selectedVariant.availableForSale}
                className={`
                    w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 border !transform-none will-change-transform
                    ${selectedVariant.availableForSale 
                        ? 'bg-white text-black border-white hover:bg-[#ff00ff] hover:text-white hover:border-[#ff00ff]' 
                        : 'bg-neutral-900 text-neutral-600 border-neutral-800 cursor-not-allowed'}
                `}
            >
                {selectedVariant.availableForSale ? 'ADD TO CART' : 'OUT OF STOCK'} 
                {selectedVariant.availableForSale && <Plus size={18} />}
            </button>
        </Reveal>
      </div>
    </div>
  );
}