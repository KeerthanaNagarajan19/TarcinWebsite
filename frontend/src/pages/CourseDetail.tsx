import { useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DocumentHead from "../components/shared/DocumentHead";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Award, Users, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "wouter";
import CTASection from "../components/home/CTASection";
import Newsletter from "../components/home/Newsletter";
import { fadeUpVariants } from "../lib/animations";

export default function CourseDetail() {
  const [, params] = useRoute("/courses/:id");
  const id = params?.id;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { data: course, isLoading, isError } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axios.get(`/api/cms/courses/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Helper to get embeddable PDF URL
  function getEmbedUrl(url: string): string {
    // Convert GitHub blob URL to raw URL
    const githubBlob = url.match(/https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+\.pdf)/);
    if (githubBlob) {
      const [, user, repo, branch, path] = githubBlob;
      return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    }
    // If already a raw.githubusercontent.com link or direct PDF, just return
    return url;
  }

  // Open PDF in new tab via backend proxy
  function openSyllabusPdf() {
    if (!course?.syllabus) return;
    const url = `/api/pdf?url=${encodeURIComponent(getEmbedUrl(course.syllabus))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  if (isLoading) return <p>Loading course...</p>;
  if (isError || !course) return <p>Error loading course</p>;

  return (
    <>
      <DocumentHead title={course.title} description={course.description} />
      {/* Hero Section */}
      <section className="pt-32 pb-6 md:pt-40 md:pb-12 bg-white text-blue-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/courses"
            className="inline-flex items-center bg-white text-blue-600 font-semibold px-5 py-2 rounded-2xl shadow border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all courses
          </Link>

          <div className="pt-2 max-w-4xl">
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-black mb-6 text-[#001D4D] tracking-tight leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
            >
              {course.title}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-500 font-medium mb-8 max-w-2xl leading-relaxed"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              {course.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 mb-10"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={2}
            >
              {[
                { icon: <Calendar className="h-5 w-5" />, label: `Duration: ${course.duration}` },
                { icon: <Award className="h-5 w-5" />, label: `Level: ${course.level}` },
                { icon: <Users className="h-5 w-5" />, label: `${course.students} Students` },
                { icon: <Globe className="h-5 w-5" />, label: `Category: ${course.category}` }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100/50">
                  <div className="text-blue-600">{item.icon}</div>
                  <span className="text-sm font-bold text-blue-900 tracking-wide uppercase text-[10px]">{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} custom={3}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScx_4em4gjbVOU4vI01r-jr9L0k0hShi-NG7VifyyKCNc9M-Q/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-2xl shadow-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2 text-[11px] uppercase tracking-wider"
                  >
                    Enroll Now
                  </Button>
                </a>
                <Button
                  size="lg"
                  onClick={openSyllabusPdf}
                  className="bg-white text-blue-600 font-bold px-6 py-2.5 rounded-2xl shadow-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2 text-[11px] uppercase tracking-wider"
                >
                  View Syllabus
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-3xl font-heading font-black text-[#001D4D] mb-6 tracking-tight">About This Course</h2>
                <div
                  className="prose prose-blue max-w-none dark:prose-invert text-slate-500 font-medium text-sm md:text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.fullDescription }}
                />
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-3xl font-heading font-black text-[#001D4D] mb-6 tracking-tight">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.highlights.map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-blue-200 transition-colors">
                      <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5 stroke-[3]" />
                      <span className="text-sm md:text-base font-medium text-slate-600 leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules */}
              <div>
                <h2 className="text-3xl font-heading font-black text-[#001D4D] mb-6 tracking-tight">Course Content</h2>
                <div className="space-y-4">
                  {course.modules.map((mod: { title: string; lessons: string[] }, idx: number) => (
                    <div key={idx} className="group relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="relative">
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
                          Module {idx + 1}
                        </div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-[#001D4D] mb-6">
                          {mod.title}
                        </h3>
                        <ul className="space-y-3">
                          {mod.lessons.map((lesson: string, j: number) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-blue-400 shrink-0 mt-1 stroke-[2.5]" />
                              <span className="text-sm md:text-base font-medium text-slate-600">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-heading font-black text-[#001D4D] mb-6 tracking-tight">FAQs</h2>
                <div className="space-y-4">
                  {course.faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <div key={i} className="group overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
                      <button
                        onClick={() => toggleFAQ(i)}
                        className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 transition-colors"
                      >
                        <span className="text-base md:text-lg font-bold text-[#001D4D] group-hover:text-blue-600 transition-colors uppercase tracking-tight">{faq.question}</span>
                        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-slate-100 transition-all ${openIndex === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                          <span className="text-xl font-light">{openIndex === i ? "−" : "+"}</span>
                        </div>
                      </button>
                      <motion.div 
                        initial={false}
                        animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 text-sm md:text-base font-medium text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl lg:sticky lg:top-32 space-y-4 h-fit shadow-sm">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.price}
              </div>
              <div className="space-y-4 pt-4 border-t border-slate-200">
                {[
                  { label: "Duration", value: course.duration },
                  { label: "Level", value: course.level },
                  { label: "Students", value: course.students },
                  { label: "Rating", value: `${course.rating}/5` }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <span className="text-[11px] font-black text-blue-900">{stat.value}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScx_4em4gjbVOU4vI01r-jr9L0k0hShi-NG7VifyyKCNc9M-Q/viewform?usp=header"
                target="_blank"
                className="block pt-4"
              >
                <Button className="w-full bg-[#001D4D] hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/10 text-[11px] uppercase tracking-[0.2em] transition-all">
                  Enroll Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Newsletter />
    </>
  );
}
