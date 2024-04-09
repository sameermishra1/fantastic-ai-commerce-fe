import React, { useState } from 'react';

const Banner: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-sm">EXPLORE THIS SEASON'S NEW ARRIVALS</div>
        <div>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="bg-gray-800 text-white border-none focus:outline-none"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            {/* Add more country options as needed */}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Banner;