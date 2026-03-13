// components/TutorConnectSection.tsx

import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";

export default function TutorConnectSection() {
  return (
    <>

      {/* banner section  */}

      <section
        className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)" }}
      >
        <div className="absolute inset-0 opacity-15 animate-wave">
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
              0% { transform: translateX(0); }
              100% { transform: translateX(-100px); }
            }
            .animate-wave svg {
              animation: waveMove 5s linear infinite;
            }
          `}
        </style>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
            >
              Tutor Connect for Educators
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
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

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-heading font-black text-black text-center mb-8 tracking-tight"
          >
            Tutor Connect - Powered by Tarcin
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-lg md:text-xl max-w-3xl mx-auto text-slate-500 font-medium leading-relaxed mb-12"
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
              className="bg-black text-white px-10 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-black/20 hover:-translate-y-1 hover:bg-slate-900 transition-all font-heading"
            >
              Visit Tutor Connect
            </motion.a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-16 text-center tracking-tight">What Problems Do We Solve?</h2>
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
                className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500"
              >
                <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-16 text-center tracking-tight">How Tutor Connect Works</h2>
          <ol className="relative border-l-2 border-slate-100 ml-4 space-y-12">
            {[
              "Sign up as a tutor or learner",
              "Complete your profile and preferences",
              "Schedule sessions with real-time calendar",
              "Track progress and receive insights",
            ].map((step, i) => (
              <li key={i} className="ml-10">
                <span className="absolute -left-[1.35rem] flex items-center justify-center w-10 h-10 border-2 border-black rounded-full text-black font-bold text-sm bg-transparent shadow-sm">
                  {i + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-medium text-black leading-tight tracking-tight">
                  {step}
                </h3>
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
