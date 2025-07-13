import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">StayEasy</h3>
            <p className="text-gray-800 font-medium">Property Made StayEasy</p>
            <p className="text-gray-600">
              Effortlessly buy, sell, rent, and travel with StayEasy
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span>1143 Blue Crane Drive, Fourways</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a href="mailto:StayEasy@support.com" className="hover:text-blue-400 transition-colors">
                  StayEasy@support.com
                </a>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a href="tel:+27110897000" className="hover:text-blue-400 transition-colors">
                  +27 11 089 7000
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Featured Properties",
                "Offers and Discounts",
                "Success Stories",
                "Agent Directory",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Discover</h4>
            <ul className="space-y-2">
              {[
                "About",
                "Our Team",
                "Testimonials",
                "Gallery",
                "Contact"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} StayEasy Property Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

    