import React from "react";
import { Link } from "wouter";
import {
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";

// @ts-ignore
import logo from "../../assets/logo_footer.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();




  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand / Logo */}
          <div className="lg:col-span-2">

            <div className="flex items-center mb-0">
              <img src={logo} alt="Footer Logo Full" className="h-auto w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[340px]" />
            </div>


            <p className="text-justify text-gray-400 mb-6 max-w-md mr-10">
              Tarcin is pioneering the future of intelligent machines and systems that augment human capabilities and solve complex global challenges.
            </p>

            <nav className="flex space-x-2" aria-label="Social Media">
              <a
                href="https://www.linkedin.com/company/tarcin-robotic-llp/"
                className="text-gray-400 hover:text-white transition-colors p-2 -ml-2"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/tarcin_robotic/"
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@TarcinRobotic"
                className="text-gray-400 hover:text-white transition-colors p-2"
                aria-label="YouTube"
                target="_blank"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Quick Links">
            <h3 className="text-lg font-heading font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/certificate-validation" className="hover:text-white transition-colors">
                  Certificate validation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer Services">
            <h3 className="text-lg font-heading font-bold text-white mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="/service-section?tab=erp" className="hover:text-white transition-colors">
                  Custom ERP/CRM Solutions
                </a>
              </li>
              <li>
                <a href="/service-section?tab=pdaas" className="hover:text-white transition-colors">
                  Product Development
                </a>
              </li>
              <li>
                <a href="/service-section?tab=training" className="hover:text-white transition-colors">
                  Corporate & Institutional Training
                </a>
              </li>
              <li>
                <a href="/service-section?tab=iot" className="hover:text-white transition-colors">
                  IoT Deployment
                </a>
              </li>
              <li>
                <a href="/service-section?tab=ai" className="hover:text-white transition-colors">
                  AI/Data Integrations
                </a>
              </li>
              <li>
                <a href="/service-section?tab=edu" className="hover:text-white transition-colors">
                  Educational Licensing
                </a>
              </li>

            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Footer Legal">
            <h3 className="text-lg font-heading font-bold text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>

              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>

            </ul>
          </nav>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Tarcin LLP. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="/privacy-policy" className="text-gray-400 hover:text-gray-200 text-sm">
                Privacy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-gray-200 text-sm">
                Terms
              </a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-gray-200 text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
