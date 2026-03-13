import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
// @ts-ignore
import s2p from '@assets/service/s2pcommunity.jpg';

const CommunityWebsiteShowcase = () => {
  return (
    <section className="pt-0 pb-20 bg-white" id="s2p-website">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-6">
            Our Platform
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-[#001D4D] mb-8 tracking-tight">
            Explore Our Main S2P Website
          </h2>
          <p className="text-slate-500 font-medium max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover events, learning tracks, success stories, and more on our primary S2P platform. Stay connected with everything happening in our community.
          </p>
        </div>

        {/* Card */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden bg-slate-50 min-h-[300px]">
              <img
                src={s2p}
                alt="S2P Website Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay badge */}
              <div className="absolute top-6 left-6 bg-[#001D4D] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                Live Platform
              </div>
            </div>

            {/* Content */}
            <div className="p-12 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">
                Student to Professional
              </span>
              <h3 className="text-3xl md:text-4xl font-heading font-black text-[#001D4D] mb-6 leading-tight tracking-tight">
                Your Gateway to Learning
              </h3>
              <p className="text-slate-500 font-medium text-lg lg:text-xl leading-relaxed mb-10">
                Dive into our full platform for detailed programs, alumni stories, and live updates.
                The S2P main site is where growth and opportunity meet.
              </p>
              <a
                href="https://s2pcommunity.tarcin.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#001D4D] hover:bg-blue-800 text-white font-bold text-[11px] px-10 py-5 rounded-2xl transition-all self-start shadow-xl shadow-blue-900/10 uppercase tracking-[0.2em] hover:-translate-y-1"
              >
                Visit S2P Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
};

export default CommunityWebsiteShowcase;
