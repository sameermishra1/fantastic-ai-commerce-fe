// components/AddToCart.tsx
import React, { useState } from 'react';

interface AddToCartProps {
  productId: string;
  variantId: string;
}

const AddToCart: React.FC<AddToCartProps> = ({ productId, variantId }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    // Mock the add to cart action
    console.log('Adding to cart:', {
      productId,
      variantId,
      quantity,
    });
    // You can replace this with your actual add to cart logic
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="border border-gray-300 rounded px-2 py-1 w-16"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;