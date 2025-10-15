// src/components/about/GalleryIntro.tsx
import React from "react";

interface GalleryIntroProps {
  imageSrc?: string;
}

const GalleryIntro: React.FC<GalleryIntroProps> = ({ imageSrc }) => {
  const fallback = "/images/gallery-intro.jpg"; // fallback image in /public/images

  return (
    <section className="relative bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
<div className="text-center mb-10">
  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
    About Our Gallery
  </h2>
  <p className="max-w-2xl mx-auto text-md md:text-lg text-slate-600 mt-3">
    A glimpse into our events, sessions, and fun activities that showcase
    the culture and creativity of Tarcin.
  </p>
</div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={imageSrc || fallback}
              alt="Gallery intro"
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              Our Journey in Frames
            </h3>
            <p className="mt-3 text-slate-600 leading-relaxed">
              From inspiring sessions to team-building activities, the Tarcin
              Gallery captures the energy and human side of our work. Each photo
              is a window into the moments that shaped our projects, our
              community outreach, and the culture we’re proud of.
            </p>

            {/* Buttons */}
            <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3">
              <a
                href="/gallery"
                className="px-5 py-2 rounded bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition"
              >
                Explore full gallery
              </a>
              <a
                href="/contact"
                className="px-5 py-2 rounded border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Request a feature
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryIntro;
