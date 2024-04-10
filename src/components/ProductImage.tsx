// components/ProductImage.tsx
import React, { useState } from 'react';

interface Image {
  key: number;
  url: string;
  name: string;
  alt: string;
}

interface ProductImageProps {
  images: Image[];
}

const ProductImage: React.FC<ProductImageProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div className="relative">
        <img
          key={images[selectedImage].key}
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          className="w-full h-auto object-cover rounded"
        />
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          onClick={handlePrevImage}
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          onClick={handleNextImage}
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="mt-4">
        <div className="flex justify-center space-x-2">
          {images.map((image, index) => (
            <div
              key={image.key}
              className={`cursor-pointer rounded ${
                selectedImage === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                key={image.key}
                src={image.url}
                alt={image.alt}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;