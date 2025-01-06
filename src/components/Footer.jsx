// Footer.js
import React from 'react';

const Footer = ({ className}) => {
  return (
    <footer className={`bg-white-500 text-black py-8 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>Email: info@example.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Main Street, City, Country</li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600">
                <i className="fab fa-facebook-f"></i> {/* You can use icons from FontAwesome */}
              </a>
              <a href="#" className="hover:text-blue-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-blue-600">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-blue-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 mb-4 border border-gray-600 bg-white-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm">&copy; Project Tekweb Davin Vergian 2025.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
