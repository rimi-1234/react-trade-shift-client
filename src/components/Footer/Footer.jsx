import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-black py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About */}
        <div>
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-md text-primary dark:text-black mb-4 inline-block"
          >
            TradeShift
          </Link>
          <p className="text-sm text-gray-700">
            TradeShift provides a wide range of quality products for all your business needs. Explore, buy, and succeed with our curated collections!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-700">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <SiX size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-2 text-gray-700">Subscribe for the latest updates and offers.</p>
          <form className="flex ">
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered w-full text-black"
              required
            />
            <button
              type="submit"
              className="btn bg-[#00AEEF] text-white border-none hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TradeShift. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
