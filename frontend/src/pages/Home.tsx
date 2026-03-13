import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import Hero from "../components/home/Hero";
import OrbNarrative from "../components/home/OrbNarrative";
import Features from "../components/home/Features";
import Partners from "../components/home/Partners";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";
import Newsletter from "../components/home/Newsletter";
import ServicesSection from "../components/services/ServicesSection";
import ProductsSection from "../components/products/ProductsSection";
import EventsSection from "../components/events/EventsSection";
import VisionMission from "../components/home/VisionMission";
import MissionHighlights from "../components/home/MissionHighlights";

const Home: React.FC = () => {
  return (
    <>
      <DocumentHead
        title="Tarcin LLP - Deep-Tech Solutions from Madurai, Tamil Nadu"
        description="Tarcin LLP is a deep-tech startup delivering scalable solutions across robotics, IoT, AI, observability, custom software development, and educational technology."
        ogTitle="Tarcin LLP - Execution-Driven Innovation"
        ogDescription="Building innovative technology solutions from Madurai, Tamil Nadu across robotics, IoT, AI, custom software, and educational products. Grounded in execution and regional impact."
      />

      <Hero />
      <OrbNarrative />
      <VisionMission />
      <MissionHighlights />
      <Features />
      <Partners />
      <Stats />
      <Testimonials />
      {/* <ServicesSection /> */}
      {/* <ProductsSection /> */}
      <EventsSection />
      <CTASection />
      <Newsletter />
    </>
  );
};

export default Home;
