import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import { motion } from "framer-motion";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import useScrollAnimation from "../hooks/use-scroll-animation";
import AboutSection from "../components/about/AboutSection";
import GalleryIntro from "@/components/about/GalleryIntro";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "Foundation",
    title: "Tarcin Robotic LLP Established",
    description: "Founded in Madurai, Tamil Nadu with a focus on product-driven and service-based technology solutions."
  },
  {
    year: "Education",
    title: "Institution Partnerships",
    description: "Connected with 50+ institutions across Tamil Nadu including engineering colleges, schools, and private academies."
  },
  {
    year: "Product",
    title: "Code Asthram Launch",
    description: "Released our logic-based, gamified coding education platform for schools and colleges focusing on algorithmic thinking."
  },
  {
    year: "Product",
    title: "SproutED LMS Development",
    description: "Created lightweight, modular learning management system for schools and training institutions."
  },
  {
    year: "Community",
    title: "S2P Community Launch",
    description: "Established Student to Professional community that mentors and deploys skilled students into real-world projects."
  },
  {
    year: "Innovation",
    title: "IoT & Agentic AI Integration",
    description: "Began integrating agentic AI systems into existing products and developing smart home automation solutions."
  },
];

const values: Value[] = [
  { icon: "ri-lightbulb-line", title: "Execution", description: "We prioritize real-world implementation over hype, focusing on practical solutions that work reliably." },
  { icon: "ri-building-2-line", title: "Regional Grounding", description: "We are deeply rooted in Tamil Nadu and understand the unique needs of our regional ecosystem." },
  { icon: "ri-team-line", title: "Student Ecosystems", description: "We leverage grassroots student talent to drive innovation without expensive overhead." },
  { icon: "ri-tools-line", title: "Product + Service", description: "We blend products and services with community engagement to create comprehensive technology solutions." },
];

const AboutPage: React.FC = () => {
  const { elementRef: timelineRef } = useScrollAnimation();
  const { elementRef: valuesRef } = useScrollAnimation();

  return (
    <>
      <DocumentHead
        title="About Us | Tarcin LLP"
        description="Learn about Tarcin LLP - our mission, team, history, and values driving innovation in robotics, IoT, AI, and educational technology based in Madurai, Tamil Nadu."
        ogTitle="About Tarcin LLP"
        ogDescription="Meet the team behind Tarcin LLP and discover our journey of innovation in robotics, IoT, AI, and educational technology."
      />

      {/* Hero */}
      <header>
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
          <style>{`
            @keyframes waveMove { 0% { transform: translateX(0); } 100% { transform: translateX(-100px); } }
            .animate-wave svg { animation: waveMove 5s linear infinite; }
          `}</style>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              >
                About Our Company
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              >
                We're a passionate team creating innovative robotics, IoT, and educational platforms to empower the future and solve real-world problems.
              </motion.p>
            </div>
          </div>
        </section>
      </header>

      {/* About Section */}
      <AboutSection />

      {/* ── Timeline Section ── */}
      <section className="relative py-24 md:py-36 bg-white overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-blue-100/30 blur-[160px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 shadow-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Our Story</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-black mb-4 tracking-tight">
              Our Journey
            </h2>
            <p className="mt-4 text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              The story of Tarcin and our path to pioneering innovative technologies.
            </p>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef as React.RefObject<HTMLDivElement>} className="relative max-w-4xl mx-auto">
            {/* Line draws itself from top to bottom */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-blue-400 via-blue-300 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className={`relative mb-16 flex items-center ${isLeft ? "flex-row-reverse md:flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-[calc(50%-2.5rem)] group relative bg-white border border-blue-50 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
                    whileHover={{ y: -6, scale: 1.02 }}
                  >
                    {/* Hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                    {/* Year badge */}
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 uppercase tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {event.year}
                    </div>

                    <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-3 group-hover:text-blue-700 transition-colors tracking-tight">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                      {event.description}
                    </p>
                  </motion.div>

                  {/* Center dot with sonar pulse */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-[0_0_10px_3px_rgba(59,130,246,0.35)] z-10" />
                    <motion.div
                      className="absolute w-8 h-8 rounded-full border border-blue-300"
                      animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Core Values Section ── */}
      <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-200/30 blur-[120px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-indigo-200/25 blur-[110px]"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 shadow-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Our Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-black mb-5 tracking-tight">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              The guiding principles that drive our work and shape our culture.
            </p>
          </motion.div>

          <div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => {
              const gradients = [
                { from: "from-blue-500", to: "to-cyan-400", glow: "rgba(59,130,246,0.3)", iconBg: "bg-blue-50", iconText: "text-blue-600", num: "#3B82F6" },
                { from: "from-indigo-500", to: "to-purple-400", glow: "rgba(99,102,241,0.3)", iconBg: "bg-indigo-50", iconText: "text-indigo-600", num: "#6366F1" },
                { from: "from-sky-500", to: "to-blue-400", glow: "rgba(14,165,233,0.3)", iconBg: "bg-sky-50", iconText: "text-sky-600", num: "#0EA5E9" },
                { from: "from-violet-500", to: "to-indigo-400", glow: "rgba(139,92,246,0.3)", iconBg: "bg-violet-50", iconText: "text-violet-600", num: "#8B5CF6" },
              ];
              const g = gradients[index % 4];
              const nums = ["01", "02", "03", "04"];

              return (
                <motion.div
                  key={index}
                  className="group relative flex flex-col items-center text-center rounded-3xl bg-white border border-blue-50 p-8 shadow-sm overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
                >
                  {/* Shimmer sweep */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>

                  {/* Top bar */}
                  <motion.div
                    className={`absolute top-0 left-0 h-1.5 bg-gradient-to-r ${g.from} ${g.to} rounded-t-3xl`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.4 + index * 0.14, ease: "easeOut" }}
                  />

                  {/* Faded number */}
                  <div className="absolute top-4 right-5 text-4xl font-black leading-none select-none" style={{ color: g.num, opacity: 0.08 }}>
                    {nums[index]}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${g.iconBg} ${g.iconText} shadow-sm`}
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <i className={`${value.icon} text-3xl`}></i>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ boxShadow: `0 0 0 0px ${g.glow}` }}
                      animate={{ boxShadow: [`0 0 0 0px ${g.glow}`, `0 0 0 10px transparent`] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  </motion.div>

                  <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-4 tracking-tight">{value.title}</h3>
                  <p className="text-sm md:text-base font-medium leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">{value.description}</p>

                  <div
                    className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${g.glow}, transparent, ${g.glow})` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-slate-50">
        <GalleryIntro />
      </div>
      <Stats />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default AboutPage;
