import React from 'react';
import s2p from '@assets/service/s2pcommunity.jpg'

const CommunityWebsiteShowcase = () => {
  return (
    <section className="relative bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Explore Our Main S2P Website</h2>
        <p className="text-sm text-gray-600 mb-10">
          Discover events, learning tracks, success stories, and more on our primary S2P platform. Stay connected with everything happening in our community.
        </p>

        <aside className="bg-white rounded-xl shadow-2xl p-8 mx-auto w-full max-w-4xl transition hover:scale-105 hover:shadow-gray-200 duration-300">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={s2p}// Replace with an actual preview image if available
              alt="S2P Website Preview"
              className="w-full md:w-2/5 rounded-lg border border-gray-300"
            />
            <div className="text-left flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Gateway to Learning</h3>
              <p className="text-gray-600 mb-4">
                Dive into our full platform for detailed programs, alumni stories, and live updates. The S2P main site is where growth and opportunity meet.
              </p>
              <a
                href="https://s2pcommunity.tarcin.in/" // Replace with your actual URL
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition"
              >
                Visit S2P Website
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CommunityWebsiteShowcase;
