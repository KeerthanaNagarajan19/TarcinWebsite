import React, { useState } from "react";
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white text-blue-900 relative overflow-hidden">
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
              className="text-3xl md:text-5xl font-heading font-bold mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
            >
              {course.title}
            </motion.h1>

            <motion.p
              className="text-xl text-blue-900 mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              {course.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={2}
            >
              <div className="flex items-center text-blue-900">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Duration: {course.duration}</span>
              </div>
              <div className="flex items-center text-blue-900">
                <Award className="h-5 w-5 mr-2" />
                <span>Level: {course.level}</span>
              </div>
              <div className="flex items-center text-blue-900">
                <Users className="h-5 w-5 mr-2" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center text-blue-900">
                <Globe className="h-5 w-5 mr-2" />
                <span>Category: {course.category}</span>
              </div>
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
                    className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    Enroll Now
                  </Button>
                </a>
                <Button
                  size="lg"
                  onClick={openSyllabusPdf}
                  className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-2xl shadow-lg border border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <div
                  className="prose prose-blue max-w-none dark:prose-invert text-sm"
                  dangerouslySetInnerHTML={{ __html: course.fullDescription }}
                />
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.highlights.map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-600 font-bold">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modules */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                {course.modules.map((mod: { title: string; lessons: string[] }, idx: number) => (
                  <div key={idx} className="border border-gray-300 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2">
                      Module {idx + 1}: {mod.title}
                    </h3>
                    <ul className="list-disc pl-6">
                      {mod.lessons.map((lesson: string, j: number) => (
                        <li key={j}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">FAQs</h2>
                <div className="space-y-4">
                  {course.faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <div key={i} className="border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(i)}
                        className="w-full text-left p-4 bg-gray-100 dark:bg-gray-900 font-semibold flex justify-between"
                      >
                        {faq.question}
                        <span>{openIndex === i ? "▲" : "▼"}</span>
                      </button>
                      {openIndex === i && (
                        <div className="p-4 text-gray-700 dark:text-gray-300">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-xl sticky top-24 space-y-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.price}
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Level</span>
                <span>{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Students</span>
                <span>{course.students}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating</span>
                <span>{course.rating}/5</span>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScx_4em4gjbVOU4vI01r-jr9L0k0hShi-NG7VifyyKCNc9M-Q/viewform?usp=header"
                target="_blank"
              >
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
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
