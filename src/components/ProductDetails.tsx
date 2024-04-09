// components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import AddToCart from './AddToCart';
import mockProductData from '../data/mockProductData.json';

interface Variant {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  variants: Variant[];
  images: {
    url: string;
    name: string;
    alt: string;
  }[];
  extraInfo: {
    title: string;
    content: string;
  }[];
}

interface ProductDetailProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    // Mock fetching product data from an API based on the productId
    const fetchProductData = async () => {
      // Replace this with your actual API call using the productId
      const data: Product | undefined = mockProductData.find(
        (item) => item.id === productId
      );
      setProduct(data || null);
      setSelectedVariant(data?.variants[0] || null);
    };

    fetchProductData();
  }, [productId]);

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const discountPercentage = (
    ((selectedVariant.price - selectedVariant.discountedPrice) /
      selectedVariant.price) *
    100
  ).toFixed(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage images={product.images} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="mb-4">
            <label htmlFor="variant" className="block font-bold mb-2">
              Variant:
            </label>
            <select
              id="variant"
              className="border border-gray-300 rounded px-4 py-2"
              value={selectedVariant.id}
              onChange={(e) => {
                const variantId = e.target.value;
                const variant = product.variants.find(
                  (v) => v.id === variantId
                );
                setSelectedVariant(variant || null);
              }}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <span className="text-2xl font-bold">
              ${selectedVariant.discountedPrice.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through ml-2">
              ${selectedVariant.price.toFixed(2)}
            </span>
            <span className="text-green-500 ml-2">
              {discountPercentage}% off
            </span>
          </div>
          <AddToCart productId={product.id} variantId={selectedVariant.id} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Extra Information</h2>
        <div className="divide-y divide-gray-300">
          {product.extraInfo.map((info, index) => (
            <div key={index} className="py-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-bold">{info.title}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    activeAccordion === index ? 'transform rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {activeAccordion === index && (
                <div className="mt-2">{info.content}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;