// components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import AddToCart from './AddToCart';
interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
interface Price {
  id: string;
  value: Value;
  country: string;
}
interface Variant {
  id: number;
  sku: string;
  price: Price;
  discountedPrice: Price;
  name: string;
  description: string;
  images:{
    key: number;
    url: string;
    name: string;
    alt: string;
  }[];
  extraInfo: {
    title: string;
    content: string;
  }[];
}

interface ProductData {
  id: string;
  key: string;
  variants: Variant[];
}
interface ProductDetailProps {
  productId: string;
}

function transformProductData(response: any): ProductData {
  // in the response variants are array of object and master variant is an additional variant, we need to combine both together and set in the variants array
  const variants = response.masterData.current.variants || [];
  variants.push(response.masterData.current.masterVariant);
  const transformedVariant = variants.map((variant: any) => {
    let i = 0;
    const images = variant.images.map((image: any) => {
      return {
        key: i++,
        url: image.url,
        name: variant.name,
        alt: variant.name,
      };
    });
    const extraInfo = variant.attributes.map((attribute: any) => {
      let content = attribute.value;
      if (typeof content === 'object') {
      content = content.label;
      }
      return {
      title: attribute.name,
      content: content,
      };
    });
    return {
      id: variant.id,
      sku: variant.sku,
      price: variant.prices[0],
      discountedPrice: variant.prices[0],
      name: variant.name,
      description: variant.description,
      images: images,
      extraInfo: extraInfo,
    };
  });
  return {
    id: response.id,
    key: response.key,
    variants: transformedVariant,
  };
}


const ProductDetails: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const discountPercentage = selectedVariant 
    ? ((selectedVariant.price.value.centAmount - selectedVariant.discountedPrice.value.centAmount) / selectedVariant.price.value.centAmount) * 100
    : 0;
  
  useEffect(() => {
    fetch(`http://localhost:5000/product/${productId}?locale=en-GB&country=GB`)
      .then(response => response.json())
      .then(data => {
        const productData = transformProductData(data);
        setProduct(productData);
        setSelectedVariant(productData.variants[0]);
      })
      .catch(error => console.error('Error:', error));
  }, [productId]);

  if (!product || !selectedVariant) {
    return <div>Loading...</div>;
  }

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage images={selectedVariant.images} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedVariant.name}</h1>
          <p className="text-gray-600 mb-4">{selectedVariant.description}</p>
          <div className="mb-4">
            <label htmlFor="variant" className="block font-bold mb-2">
              Variant:
            </label>
            <select
              id="variant"
              className="border border-gray-300 rounded px-4 py-2"
              value={selectedVariant.id}
              onChange={(e) => {
                const variantId = Number(e.target.value);
                const variant = product.variants.find(
                (v) => v.id === variantId
                );
                setSelectedVariant(variant || null);
              }}
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.sku}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <span className="text-2xl font-bold">
              ${selectedVariant.discountedPrice.value.centAmount.toFixed(2)}
            </span>
            <span className="text-gray-500 line-through ml-2">
              ${selectedVariant.price.value.centAmount.toFixed(2)}
            </span>
            <span className="text-green-500 ml-2">
              {discountPercentage}% off
            </span>
          </div>
          <AddToCart productId={product.id} variantId={selectedVariant.id.toString()} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Extra Information</h2>
        <div className="divide-y divide-gray-300">
          {selectedVariant.extraInfo.map((info, index) => (
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