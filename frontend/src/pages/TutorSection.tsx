// components/TutorConnectSection.tsx

import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";

export default function TutorConnectSection() {
  return (
    <>

        {/* banner section  */}

          <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-blue-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 animate-wave">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wave-lines" width="100" height="40" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
            <path d="M 0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#wave-lines)" />
      </svg>
    </div>
    
    <style>
    {`
      @keyframes waveMove {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100px);
        }
      }
    
      .animate-wave svg {
        animation: waveMove 5s linear infinite;
      }
    `}
    </style>
    
    
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                >
                  Tutor Connect for Educators
                </motion.h1>
                <motion.p
                  className="text-base md:text-xl text-white/90 mb-8"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  custom={1}
                >
                 Empowering educators through technology-driven tools that enhance STEM learning and support student success on platforms like Tutor Connect.
                </motion.p>
              </div>
            </div>
          </section>


       {/* tutor section url */}

    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl md:text-xl font-bold text-center mb-8"
        >
          Tutor Connect - Powered by Tarcin
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm max-w-3xl mx-auto text-gray-600 mb-10"
        >
          Tutor Connect is our in-house platform designed to bridge the gap between passionate tutors and eager learners.
          It enables scheduling, tracking, and real-time interaction, enhancing personalized learning experiences.
        </motion.p>

        <div className="flex justify-center">
          <motion.a
            href="https://tutorconnect.tarcin.in/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-300"
          >
            Visit Tutor Connect 
          </motion.a>
        </div>
      </div>
    </section>

    <section className="py-20 bg-gray-100 text-gray-800">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-xl font-bold mb-6 text-center">What Problems Do We Solve?</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Disconnected Learning", desc: "We bridge the gap between quality tutors and learners globally." },
        { title: "Poor Scheduling Tools", desc: "Our smart scheduler allows effortless session booking and tracking." },
        { title: "Limited Insights", desc: "Tutors and admins get real-time performance metrics and feedback." },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* <section className="bg-white py-16">
  <div className="max-w-5xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">Platform Growth at a Glance</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {[
        { value: "20,000+", label: "Active Students" },
        { value: "500+", label: "Certified Tutors" },
        { value: "98%", label: "Positive Feedback" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="bg-gray-100 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
          <p className="text-gray-700 mt-2">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section> */}


{/* <section className="bg-blue-50 py-16">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-10">Featured Tutors</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { name: "Aarav Mehta", subject: "Math Expert", img: "/tutors/aarav.png" },
        { name: "Sneha Rajan", subject: "Science Mentor", img: "/tutors/sneha.png" },
        { name: "Ravi Kumar", subject: "Coding Guide", img: "/tutors/ravi.png" },
      ].map((tutor, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
          className="bg-white p-6 rounded-xl text-center shadow-lg"
        >
          <img src={tutor.img} alt={tutor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
          <h3 className="text-xl font-semibold">{tutor.name}</h3>
          <p className="text-gray-600">{tutor.subject}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section> */}


<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-xl font-bold text-center mb-12">How Tutor Connect Works</h2>
    <ol className="relative border-l border-gray-300 ml-4">
      {[
        "Sign up as a tutor or learner",
        "Complete your profile and preferences",
        "Schedule sessions with real-time calendar",
        "Track progress and receive insights",
      ].map((step, i) => (
        <li key={i} className="mb-10 ml-6">
          <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white">{i + 1}</span>
          <h3 className="font-semibold text-sm text-gray-800">{step}</h3>
        </li>
      ))}
    </ol>
  </div>
</section>


{/* <section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-10"> Other Projects We’re Proud Of</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { name: "InternConnect", desc: "Platform for managing internships.", link: "/internconnect" },
        { name: "SkillPulse", desc: "Skill assessment for students.", link: "/skillpulse" },
        { name: "CareerGraph", desc: "AI-powered career recommendations.", link: "/careergraph" },
      ].map((project, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.2 }}
        >
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <p className="text-gray-600 mb-3">{project.desc}</p>
          <a href={project.link} className="text-blue-600 font-medium hover:underline">Learn More </a>
        </motion.div>
      ))}
    </div>
  </div>
</section> */}

    </>
  );
}
