import React from 'react';
import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

async function getProduct(handle: string) {
  // 1. Guard Clause: Stop crashing if handle is missing
  if (!handle || handle === 'undefined') {
    return null;
  }

  // Debug Log: Watch your terminal to see if this prints!
  console.log(`🔍 Fetching Product Handle: "${handle}"`);

  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        availableForSale
        # Metafields temporarily commented out to isolate the connection issue
        # subheader: metafield(namespace: "custom", key: "subheader") {
        #   value
        # }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    // 2. Updated API Version to 2025-01
    const res = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables: { handle } }),
      next: { revalidate: 0 }, 
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error("❌ Shopify API Errors:", JSON.stringify(json.errors, null, 2));
      return null;
    }

    return json.data.productByHandle;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return null;
  }
}

// 3. Updated for Next.js 15/16 (Awaiting params)
export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await params;
  const handle = resolvedParams.handle;
  
  const product = await getProduct(handle);

  if (!product) {
    console.log(`❌ Product not found for handle: ${handle}`);
    notFound(); 
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <ProductView product={product} />
    </div>
  );
}