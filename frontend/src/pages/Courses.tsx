import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import CTASection from "../components/home/CTASection";
import Newsletter from "../components/home/Newsletter";
import LearningHubContent from "../components/courses/LearningHubContent";

const Courses: React.FC = () => {
  return (
    <>
      <DocumentHead
        title="Education & Training | Tarcin Robotic LLP"
        description="Enhance your skills with our Code Asthram platform, S2P Community and technical training programs for educational institutions across Tamil Nadu."
        ogTitle="Education & Training - Tarcin Robotic LLP"
        ogDescription="Discover our comprehensive training programs and educational initiatives for schools and colleges in Tamil Nadu."
      />

      <main className="pt-20">
        <LearningHubContent />
      </main>

      <CTASection />
      <Newsletter />
    </>
  );
};

export default Courses;
