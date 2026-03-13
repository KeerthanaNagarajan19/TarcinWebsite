import { useState, useRef } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "wouter";

export default function EducationalProgramsSection() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axios.get("/api/cms/courses");
      return res.data;
    },
  });

  const allCourses = courses?.filter((course: any) => !!course.title);
  const displayedCourses = showAll ? allCourses : allCourses.slice(0, 3);

  const handleToggle = () => {
    if (showAll) {
      // Smooth scroll back to section top when collapsing
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll(!showAll);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load courses</p>;

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6 md:mb-8">
            Educational Programs
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
            Explore our educational solutions designed for schools, colleges, and training institutions across Tamil Nadu.
          </p>
        </div>

        {allCourses.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            No courses available yet. Check back soon!
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCourses.map((course: any, index: number) => (
                <article
                  key={course._id || index}
                  className="group relative h-full bg-white rounded-2xl border border-blue-50 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="h-48 relative overflow-hidden rounded-t-xl">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {course.category}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-[#001D4D] mb-3 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 mb-6 text-sm md:text-base font-medium leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-blue-50">
                      <div className="flex items-center text-[11px] font-medium text-slate-500">
                        <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400 fill-yellow-400" />
                        {course.rating} <span className="ml-1 opacity-60">({Math.round(course.rating * 100)} reviews)</span>
                      </div>
                      <Button asChild className="bg-[#001D4D] hover:bg-blue-800 text-white rounded-xl px-4 py-1.5 h-auto text-[11px] font-bold shadow-md transition-all uppercase tracking-wider">
                        <Link href={`/courses/${course._id}`}>Explore Now</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {allCourses.length > 3 && (
              <div className="mt-16 text-center">
                <Button
                  onClick={handleToggle}
                  className="h-14 px-12 rounded-2xl bg-[#001D4D] hover:bg-blue-800 text-white font-black uppercase tracking-widest text-sm shadow-xl hover:shadow-blue-900/20 transition-all duration-300"
                >
                  {showAll ? "View Less" : "View More"}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
