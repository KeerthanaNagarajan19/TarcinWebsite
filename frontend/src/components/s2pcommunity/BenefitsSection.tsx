import React from 'react';
import {
  FaRoute,
  FaUserTie,
  FaBriefcase,
  FaGlobe,
  FaChartLine,
  FaTools
} from 'react-icons/fa';

const benefits = [
  {
    icon: <FaRoute size={28} className="text-blue-600" />,
    title: "Guided Learning Roadmap",
    description:
      "Advance through a structured curriculum, from core concepts to specialized skills, designed for real-world applicability and long-term growth.",
  },
  {
    icon: <FaUserTie size={28} className="text-blue-600" />,
    title: "Industry Mentorship",
    description:
      "Gain insights and career guidance from seasoned professionals with deep industry expertise and awareness of market dynamics.",
  },
  {
    icon: <FaBriefcase size={28} className="text-blue-600" />,
    title: "Real-World Internships",
    description:
      "Work on practical, portfolio-building projects that reflect current industry standards and showcase your technical capabilities.",
  },
  {
    icon: <FaGlobe size={28} className="text-blue-600" />,
    title: "Global Networking",
    description:
      "Build connections with professionals, alumni, and partners worldwide to access collaborative and career opportunities.",
  },
  {
    icon: <FaChartLine size={28} className="text-blue-600" />,
    title: "Performance Evaluation",
    description:
      "Receive actionable feedback through continuous assessments, helping you track your progress and stay on course.",
  },
  {
    icon: <FaTools size={28} className="text-blue-600" />,
    title: "Practical Training",
    description:
      "Engage in immersive, hands-on sessions led by experts at Tarcin Robotic LLP to reinforce learning through experience.",
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="benefits">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What’s in It for You?</h2>
        <p className="text-sm text-gray-600 mb-12">
          Discover the key advantages that make our platform ideal for your career development and professional success.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <article
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-left hover:shadow-xl transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">{item.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
