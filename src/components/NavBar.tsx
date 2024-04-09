
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className="flex space-x-6">
        <li>
          <Link to="/kitchen" className="text-gray-600 hover:text-blue-500">
            Kitchen
          </Link>
        </li>
        <li>
          <Link to="/home-decor" className="text-gray-600 hover:text-blue-500">
            Home Decor
          </Link>
        </li>
        <li>
          <Link to="/furniture" className="text-gray-600 hover:text-blue-500">
            Furniture
          </Link>
        </li>
        <li>
          <Link to="/new-arrivals" className="text-gray-600 hover:text-blue-500">
            New Arrivals
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;