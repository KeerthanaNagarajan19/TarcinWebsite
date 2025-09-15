import React from 'react';
import { motion } from 'framer-motion';
import { FaCogs, FaLightbulb, FaCodeBranch, FaChalkboardTeacher } from 'react-icons/fa';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const focusItems = [
  {
    icon: <FaCogs size={28} className="text-blue-700" />,
    title: 'Innovation Engineering',
    description:
      'We develop scalable technology frameworks tailored for automation, R&D, and integrated digital ecosystems.',
  },
  {
    icon: <FaLightbulb size={28} className="text-blue-700" />,
    title: 'Smart Learning',
    description:
      'EdTech platforms and content that drive STEM education through interactive, real-time experiences.',
  },
  {
    icon: <FaCodeBranch size={28} className="text-blue-700" />,
    title: 'System Integration',
    description:
      'Our systems integrate hardware and software for seamless operations, from industrial to educational environments.',
  },
  {
    icon: <FaChalkboardTeacher size={28} className="text-blue-700" />,
    title: 'Research & Outreach',
    description:
      'We support educational institutions and learners with research-driven content, workshops, and live projects.',
  },
];

const AboutSection: React.FC = () => {
  return (
    <section className="relative bg-white pt-32 pb-20 overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-10 animate-wave">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="animated-waves" width="120" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 30 0, 60 20 T 120 20" fill="none" stroke="rgba(0,0,255,0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#animated-waves)" />
        </svg>
      </div>
      <style>
        {`
          @keyframes waveMove {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-120px);
            }
          }

          .animate-wave svg {
            animation: waveMove 6s linear infinite;
          }
        `}
      </style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-blue-800 mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          About S2P EduTech
        </motion.h2>
        <motion.p
          className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          custom={1}
        >
          We are committed to building impactful educational technologies and automation systems that empower students, educators, and industries through innovation.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {focusItems.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-50 rounded-xl border hover:shadow-md transition"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={i + 2}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-100 p-3 rounded-full">{item.icon}</div>
                <h4 className="text-lg font-semibold text-blue-700">{item.title}</h4>
              </div>
              <p className="text-gray-600 text-left">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
