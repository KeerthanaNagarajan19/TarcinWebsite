import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-800 min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <h1 className="mt-20 text-5xl font-bold text-blue-800 mb-4">Privacy Policy</h1>
          <p className="text-base text-gray-600">Last updated: May 23, 2025</p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="prose prose-blue max-w-none prose-headings:text-blue-800 prose-a:text-blue-600 prose-a:underline"
        >
          {/* Full privacy content here */}
          <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
          <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank" rel="noopener noreferrer">Privacy Policy Generator</a>.</p>

          <h2>Interpretation and Definitions</h2>
          <h3>Interpretation</h3>
          <p>The words of which the initial letter is capitalized have meanings defined under the following conditions...</p>

          <h3>Definitions</h3>
          <ul>
            <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
            <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party...</li>
            <li><strong>Company</strong> refers to Tarcin Robotic LLP, 176, E 6th Street, K K Nagar, Madurai - 625020, TamilNadu, India.</li>
            <li><strong>Cookies</strong> are small files placed on Your computer, mobile device or any other device...</li>
            <li><strong>Country</strong> refers to: Tamil Nadu, India</li>
            <li><strong>Device</strong> means any device that can access the Service...</li>
            <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
            <li><strong>Service</strong> refers to the Website.</li>
            <li><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company...</li>
            <li><strong>Third-party Social Media Service</strong> refers to any website or social network site for login/account creation.</li>
            <li><strong>Usage Data</strong> refers to data collected automatically...</li>
            <li><strong>Website</strong> refers to Tarcin Robotic LLP, accessible from <a href="https://tarcin.in" target="_blank" rel="noopener noreferrer">https://tarcin.in</a></li>
            <li><strong>You</strong> means the individual using the Service, or the legal entity on behalf of which the Service is used.</li>
          </ul>

          <h2>Collecting and Using Your Personal Data</h2>
          <h3>Types of Data Collected</h3>
          <h4>Personal Data</h4>
          <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information...</p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
            <li>Usage Data</li>
          </ul>

          <h4>Usage Data</h4>
          <p>Usage Data is collected automatically when using the Service...</p>

          <h3>Information from Third-Party Social Media Services</h3>
          <p>The Company allows You to create an account and log in to use the Service through services like Google, Facebook, Instagram, Twitter, LinkedIn...</p>

          <h2>Tracking Technologies and Cookies</h2>
          <p>We use Cookies and similar tracking technologies to track activity on Our Service...</p>

          <h3>Types of Cookies</h3>
          <ul>
            <li><strong>Necessary / Essential Cookies</strong>: Session cookies used to provide essential services.</li>
            <li><strong>Cookies Policy / Notice Acceptance Cookies</strong>: Persistent cookies for cookie consent.</li>
            <li><strong>Functionality Cookies</strong>: Persistent cookies to store preferences.</li>
          </ul>

          <h2>Use of Your Personal Data</h2>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To manage Your Account</li>
            <li>For the performance of a contract</li>
            <li>To contact You</li>
            <li>To provide You with news and special offers</li>
            <li>To manage Your requests</li>
            <li>For business transfers</li>
            <li>For other purposes like analytics and improving the service</li>
          </ul>

          <h2>Sharing Your Personal Data</h2>
          <ul>
            <li>With Service Providers</li>
            <li>For business transfers</li>
            <li>With Affiliates</li>
            <li>With business partners</li>
            <li>With other users and social media</li>
            <li>With Your consent</li>
          </ul>

          <h2>Retention of Your Personal Data</h2>
          <p>The Company will retain Your Personal Data only for as long as is necessary...</p>

          <h2>Transfer of Your Personal Data</h2>
          <p>Your information, including Personal Data, is processed at the Company's operating offices...</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, You can contact us:</p>
          <ul>
            <li>By email: <a href="mailto:contact@tarcinrobotic.in">contact@tarcinrobotic.in</a></li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
