// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="text-gray-600">
              <li className="mb-2">About Us</li>
              <li className="mb-2">Careers</li>
              <li className="mb-2">Press</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Help</h3>
            <ul className="text-gray-600">
              <li className="mb-2">Contact Us</li>
              <li className="mb-2">FAQ</li>
              <li className="mb-2">Shipping & Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <ul className="text-gray-600">
              <li className="mb-2">Facebook</li>
              <li className="mb-2">Twitter</li>
              <li className="mb-2">Instagram</li>
              <li>Pinterest</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="text-gray-600">
              <li className="mb-2">Terms of Service</li>
              <li className="mb-2">Privacy Policy</li>
              <li className="mb-2">Cookie Policy</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 pt-8">
          <p className="text-gray-600 text-center">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
