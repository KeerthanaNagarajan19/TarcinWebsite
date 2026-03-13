// src/components/about/GalleryIntro.tsx
import React from "react";
import gallery from "../../assets/TarcinGallery.jpg"

interface GalleryIntroProps {
  imageSrc?: string;
}

const GalleryIntro: React.FC<GalleryIntroProps> = ({ imageSrc }) => {
  const fallback = "/images/gallery-intro.jpg"; // fallback image in /public/images

  return (
    <section className="relative bg-transparent py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
<div className="text-center mb-16">
  <h2 className="text-4xl md:text-6xl font-heading font-black text-black tracking-tight leading-tight mb-6">
    About Our Gallery
  </h2>
  <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
    A glimpse into our events, sessions, and fun activities that showcase
    the culture and creativity of Tarcin.
  </p>
</div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Image */}
          <div className="w-full md:w-1/2">
            <img
              src={gallery}
              alt="Gallery intro"
              className="w-full h-80 md:h-[450px] object-cover rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-50"
            />
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-heading font-black text-black mb-4 tracking-tight">
              Our Journey in Frames
            </h3>
            <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
              From inspiring sessions to team-building activities, the Tarcin
              Gallery captures the energy and human side of our work. Each photo
              is a window into the moments that shaped our projects, our
              community outreach, and the culture we’re proud of.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-4">
              <a
                href="/gallery"
                className="px-8 py-4 rounded-xl bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-slate-900 transition-all hover:-translate-y-1"
              >
                Explore full gallery
              </a>
              <a
                href="/contact"
                className="px-8 py-4 rounded-xl border border-slate-200 bg-white text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm hover:-translate-y-1"
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
