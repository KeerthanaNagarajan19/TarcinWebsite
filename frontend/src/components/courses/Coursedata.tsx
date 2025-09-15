import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "wouter";

export default function EducationalProgramsSection() {
  const [showAllCourses, setShowAllCourses] = useState(false);

  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("/api/cms/courses");
      return res.data;
    },
  });

  const upcomingCourses = courses?.filter(course => !!course.title);

  if (isLoading) return <p className="text-center">Loading courses...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load courses</p>;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Educational Programs
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our educational solutions designed for schools, colleges, and training institutions across Tamil Nadu.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(showAllCourses ? upcomingCourses : upcomingCourses?.slice(0, 3))?.map((course, index) => (
            <motion.article
              key={course._id || index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="h-48 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating} ({Math.round(course.rating * 100)} reviews)
                  </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
  <Link href={`/courses/${course._id}`}>Learn More</Link>
</Button>

                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {upcomingCourses.length > 3 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-3"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? "Show Less" : "View All Courses"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
