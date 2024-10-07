import React from 'react'
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import paylogo from "../assets/images/w.png";
import logo from "../assets/images/newlogo.png";




function Footer() {
  return (
    <footer className="bg-green-900 text-black py-10 bg-gradient-to-r from-[#2f1313] via-[#631313] to-[#a10707] animate-gradient relative top-60 ">
    <div className="container mx-auto px-4  flex flex-wrap justify-between">
      {/* Left Section */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <div className="mb-4 relative bottom-5">
          <img src={logo} alt="Logo" className="w-40 h-40 relative bottom-4" />
        </div>
        
        <p className="text-sm text-gray-400 mb-4 text-justify w-[347px] gap-4 relative bottom-16">
        Welcome to Regal Cinema, where your movie experience comes to life. Our website offers a sleek, responsive design for easy browsing, ticket booking, and exploring our film selection. Enjoy a seamless and enjoyable experience on any device with Regal Cinema.


        </p>
        <div className="mb-4 border-2 border-white w-52 p-2 pr-2 relative bottom-12 ">
          <p className="font-semibold">HOTLINE: 077 345 6789</p>
        </div>
        <div className="flex space-x-4 mb-4 relative bottom-8">
          {/* Social Media Icons */}
          <a href="#">
            <FaFacebook className="w-6 h-6 text-white hover:text-gray-400" />
          </a>
          <a href="#">
            <FaYoutube className="w-6 h-6 text-white hover:text-gray-400" />
          </a>
          <a href="#">
            <FaInstagram className="w-6 h-6 text-white hover:text-gray-400" />
          </a>
        </div>
        {/* Payment Methods */}
        <div className="flex space-x-4 relative bottom-8">
        <img src={paylogo} alt="PayHere" className="w-64" />
          
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/4 flex flex-wrap justify-between">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-1/3 pl-14">
            <h3 className="font-semibold mb-4">HELP & ADVICE</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Delivery Information
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Terms & Conditions
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
    <div className="text-center mt-8 text-sm text-gray-400">
      <p>Copyright © 2024 Essentials.lk. All rights reserved. | Colombo, Sri Lanka</p>
      <p>
        Website & SEO by{" "}
        <a href="#" className="hover:text-gray-200">
          Serendipity Int
        </a>
      </p>
    </div>
  </footer>
  );
};

export default Footer;