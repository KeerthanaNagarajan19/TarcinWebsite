import React from "react";
import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft, Check, Zap, Package, Shield, Star,
  MessageCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import DocumentHead from "../components/shared/DocumentHead";
import CTASection from "../components/home/CTASection";
import Newsletter from "../components/home/Newsletter";
import { productsData } from "../data/productData";
import techIllustration from "../assets/illustrations/tech_illustration_premium.png";

const TABS = [
  { label: "Overview", value: "overview" },
  { label: "Features", value: "features" },
  { label: "Specifications", value: "specs" },
  { label: "Case Studies", value: "case-studies" },
  { label: "FAQ", value: "faq" },
];

const ProductDetail: React.FC = () => {
  const [, params] = useRoute<{ id: string }>("/products/:id");
  const productId = params?.id || "";
  const product = productsData[productId as keyof typeof productsData];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If product doesn't exist, show a message
  if (!product) {
    return (
      <>
        <DocumentHead
          title="Product Not Found | Tarcin Robotic LLP"
          description="The requested product could not be found."
        />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or may have been removed.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <DocumentHead
        title={`${product.title} | Tarcin Robotic LLP`}
        description={product.description}
      />

      <article>
        {/* Hero Section */}
        <header>
          <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex justify-start mb-8">
                <Link href="/products">
                  <Button variant="ghost"
                    className="inline-flex items-center bg-white text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] px-6 py-3 rounded-2xl shadow-xl shadow-blue-900/5 border border-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-300 gap-2 mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <span
                      className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border shadow-sm ${product.category === "Robotics"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : product.category === "IoT Devices"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : product.category === "Software"
                            ? "bg-blue-50 text-blue-700 border-blue-100"
                            : "bg-purple-50 text-purple-700 border-purple-100"
                        }`}
                    >
                      {product.category}
                    </span>
                    <span className="mx-3 text-slate-300">•</span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      {product.tier} Tier
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 text-black tracking-tight leading-tight">
                    {product.title}
                  </h1>

                  <p className="text-lg md:text-xl text-slate-500 mb-6 font-medium leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-6">
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="relative group w-full"
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                >
                  <div className="h-full relative overflow-hidden flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </header>

        {/* Floating Quick Nav Menu (Visible on Scroll) */}
        <div className="sticky top-20 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 hidden md:block w-full h-14 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
          <div className="container mx-auto px-4 h-full flex items-center justify-center gap-8">
            {TABS.map((tab) => (
              <a
                key={tab.value}
                href={`#${tab.value}`}
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(tab.value)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 md:py-32 bg-white relative overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mb-20" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 w-full lg:items-start">

              {/* Left Main Scrollable Content */}
              <div className="lg:col-span-8 space-y-24">
                {/* SECTION 1: OVERVIEW */}
                <motion.section
                  id="overview"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-40"
                >
                  <div className="mb-10">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">01 / Introduction</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6 tracking-tight text-left">Overview</h2>
                  </div>
                  <div
                    className="prose prose-lg max-w-none mb-8 text-slate-500 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: product.fullDescription }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {product.features.slice(0, 4).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-1 mr-3 shrink-0" />
                        <span className="text-slate-500 font-medium text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* SECTION 2: FEATURES */}
                <motion.section
                  id="features"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  className="scroll-mt-40"
                >
                  <div className="mb-14">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-blue-600 font-black tracking-[0.2em] uppercase text-xs mb-3 block"
                    >
                      02 / CAPABILITIES
                    </motion.span>
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-3xl md:text-5xl font-heading font-black text-black mb-6 tracking-tight text-left"
                    >
                      Key Features
                    </motion.h2>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "80px" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-2 bg-blue-600 rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {product.features.map((feature: string, index: number) => {
                      const iconColors = [
                        "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600",
                        "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:bg-indigo-600",
                        "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-600"
                      ];
                      const GlowColors = [
                        "group-hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.3)]",
                        "group-hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.3)]",
                        "group-hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.3)]"
                      ];
                      const Icons = [Zap, Shield, Package];
                      const IconComp = Icons[index % 3];

                      return (
                        <motion.div
                          key={index}
                          variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: index * 0.1
                              }
                            }
                          }}
                          whileHover={{ y: -10, transition: { duration: 0.3 } }}
                          className={`group relative overflow-hidden rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 bg-white dark:bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-blue-200 transition-all duration-500 ${GlowColors[index % 3]}`}
                        >
                          <div className="relative z-10 flex items-center gap-7">
                            <div className={`w-16 h-16 shrink-0 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] ${iconColors[index % 3]}`}>
                              <IconComp className="h-8 w-8" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl md:text-2xl font-black text-black leading-tight mb-2 group-hover:text-blue-600 transition-colors duration-300 font-heading">
                                {feature}
                              </h3>
                              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed group-hover:text-slate-700 transition-colors">Experience seamless operation and reliability.</p>
                            </div>
                          </div>

                          {/* Inner soft glow */}
                          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>

                {/* SECTION 3: SPECIFICATIONS */}
                {product.technicalSpecs && Object.keys(product.technicalSpecs).length > 0 && (
                  <motion.section
                    id="specs"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="scroll-mt-40"
                  >
                    <div className="mb-10">
                      <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">03 / Data</span>
                      <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-8 tracking-tight text-left">Technical Specifications</h2>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                      <div className="divide-y divide-slate-100">
                        {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                           <div key={key} className={`flex flex-col sm:flex-row p-8 transition-colors hover:bg-slate-50 ${index % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/30'}`}>
                            <div className="sm:w-1/3 mb-2 sm:mb-0">
                              <span className="font-bold text-slate-400 uppercase text-[11px] tracking-widest font-heading">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                            <div className="sm:w-2/3">
                              <span className="text-black font-bold text-base md:text-lg leading-relaxed">
                                {value as string}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                )}

              </div>

              {/* Right Sidebar (Product Context/Buy Menu) */}
              <aside className="lg:col-span-4 border-t lg:border-t-0 pt-12 lg:pt-0">
                <div className="space-y-8 pb-8">
                  {/* Premium Glassmorphism Card */}
                  <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-blue-50 relative overflow-hidden group">

                    {/* Glowing background effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none transition-transform duration-1000 group-hover:scale-150" />

                    <div className="relative z-10">
                      <div className="mb-10 text-center">
                        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50/80 text-blue-700 font-black text-[10px] uppercase tracking-[0.2em] mb-6 border border-blue-100 shadow-sm flex-row gap-2">
                          <Star className="w-3 h-3 fill-current" /> {product.tier} Tier
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-heading font-black text-black">
                          {product.price === "Contact for pricing" ? "Custom Pricing" : product.price}
                        </h3>
                        {product.price === "Contact for pricing" && (
                          <p className="text-slate-500 mt-2 text-sm font-medium">Tailored to your institutional needs</p>
                        )}
                      </div>

                      <div className="space-y-2 mb-10">
                        <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-gray-500 dark:text-gray-400 flex items-center gap-3 font-semibold text-sm">
                            <div className="p-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg"><Package className="w-4 h-4 text-gray-700 dark:text-gray-300" /></div> Category
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-800">
                          <span className="text-gray-500 dark:text-gray-400 flex items-center gap-3 font-semibold text-sm">
                            <div className="p-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg"><Shield className="w-4 h-4 text-gray-700 dark:text-gray-300" /></div> Deployment
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {product.category === "Educational" || product.category === "Software" ? "Cloud / On-Prem" : "Plug & Play"}
                          </span>
                        </div>
                      </div>

                      <Link href="/contact" className="block w-full">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full h-16 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-black/10 flex items-center justify-center gap-3 relative overflow-hidden group/btn bg-black hover:bg-slate-900 transition-all"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span className="relative z-10">Discuss Your Needs</span>
                        </motion.button>
                      </Link>

                      <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-[0.2em] leading-relaxed">
                        Secure your enterprise demonstration.<br />Reach out to our technical team today.
                      </p>
                    </div>
                  </div>

                  {/* Why Choose Us Card */}
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-[2rem] p-8 text-black shadow-xl border border-blue-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-700" />
                    <h4 className="text-xl font-heading font-black mb-6 flex items-center gap-2">
                      Why Tarcin Robotics?
                    </h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 p-1 rounded-full"><Check className="w-3 h-3 text-blue-600" /></div>
                        <span className="text-sm font-medium text-slate-600 text-justify">Customized solutions for regional educational contexts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 p-1 rounded-full"><Check className="w-3 h-3 text-blue-600" /></div>
                        <span className="text-sm font-medium text-slate-600 text-justify">Empowering communities with localized technology</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 p-1 rounded-full"><Check className="w-3 h-3 text-blue-600" /></div>
                        <span className="text-sm font-medium text-slate-600 text-justify">End-to-end support from implementation to training</span>
                      </li>
                    </ul>
                  </div>

                  {/* Trust Badge Section */}
                  <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-[2rem] p-8 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">Institutional Compliance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300">ISO CERTIFIED</span>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-center gap-2">
                        <Package className="w-5 h-5 text-amber-500" />
                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300">MADE IN INDIA</span>
                      </div>
                    </div>
                  </div>

                  {/* Related Solutions */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-heading font-black text-black dark:text-white flex items-center gap-2 px-2">
                      Explore More
                    </h4>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">Looking for something else? Explore our full range of robotic solutions.</p>
                      <Link href="/products">
                        <button className="w-full py-3 rounded-xl gap-2 font-black text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center">
                          View Product Lineup <ArrowLeft className="w-4 h-4 rotate-180" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Testimonials Sidebar Version */}
                  {product.testimonials && product.testimonials.length > 0 && (
                    <div className="space-y-6">
                      <h4 className="text-lg font-heading font-black text-black dark:text-white flex items-center gap-2 px-2">
                        Trusted Voices
                      </h4>
                      {product.testimonials.map((testimonial: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative group"
                        >
                          <i className="ri-double-quotes-l absolute top-4 right-4 text-3xl text-blue-500/10 group-hover:text-blue-500/20 transition-colors"></i>
                          <p className="text-sm italic text-gray-600 dark:text-gray-300 mb-4 relative z-10 leading-relaxed text-justify">
                            "{testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs">
                              {testimonial.author[0]}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 dark:text-white">{testimonial.author}</div>
                              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">{testimonial.position}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Decorative Illustration */}
                  <div className="rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 group bg-white dark:bg-gray-800">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={techIllustration}
                      alt="Tech Illustration"
                      className="w-full h-auto object-cover opacity-90 group-hover:opacity-100"
                    />
                    <div className="p-6 text-center">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Excellence in Engineering</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* FULL-WIDTH SECTIONS BEYOND THE SIDEBAR */}
            <div className="mt-32 space-y-32">
              {/* SECTION 4: CASE STUDIES (Now Full Width) */}
              {product.caseStudies && product.caseStudies.length > 0 && (
                <motion.section
                  id="case-studies"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-40"
                >
                  <div className="mb-12">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">04 / Proven Results</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6 tracking-tight text-left">Success Stories</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {product.caseStudies.map((caseStudy: any, index: number) => (
                      <motion.div
                        initial={{ opacity: 0, y: 40, rotateX: 10 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        key={index}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15,
                          type: "spring",
                          stiffness: 100,
                          damping: 20
                        }}
                        whileHover={{
                          y: -10,
                          scale: 1.02,
                          transition: { duration: 0.4 }
                        }}
                        className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col h-full"
                      >
                        <div className="pt-6 pb-6 px-8 relative overflow-hidden flex flex-col h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                          <div className="relative z-10 flex flex-col gap-4 mb-5">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="w-min whitespace-nowrap bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100/50 dark:border-blue-800/30 shadow-sm"
                            >
                              {caseStudy.industry}
                            </motion.span>
                            <h3 className="text-xl md:text-2xl font-heading font-black text-black dark:text-white tracking-tighter leading-tight">
                              {caseStudy.title}
                            </h3>
                          </div>
                          <p className="relative z-10 text-slate-500 dark:text-gray-300 leading-relaxed text-sm md:text-base font-medium flex-grow">
                            {caseStudy.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* SECTION 5: FAQS (Now Centered Full Width) */}
              {product.faqs && product.faqs.length > 0 && (
                <motion.section
                  id="faq"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-40 mb-20 max-w-5xl mx-auto w-full"
                >
                  <div className="mb-12 text-center">
                    <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-[11px] mb-4 block">05 / Support</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-4 tracking-tight">Frequently Asked Questions</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {product.faqs.map((faq: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-all"
                      >
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full text-left p-6 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl group"
                        >
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white pr-8 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {faq.question}
                          </h3>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${openIndex === index ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-400 group-hover:border-blue-300'}`}>
                            <i className="ri-arrow-down-s-line text-2xl"></i>
                          </div>
                        </button>

                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-8 pt-0 border-t border-gray-100 dark:border-gray-700 mt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          </div>
        </section>
      </article>

      <CTASection />
      <Newsletter />
    </>
  );
};

export default ProductDetail;