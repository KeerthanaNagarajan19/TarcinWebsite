<section className="bg-blue-900 text-white py-16 text-center relative overflow-hidden">
  {/* Animated SVG Wave Background */}
  <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="wave" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 0,50 A 50,50 0 0,0 100,50 A 50,50 0 0,1 200,50"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-200 0"
              dur="12s"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 0,100 A 50,50 0 0,0 100,100 A 50,50 0 0,1 200,100"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-200 0"
              dur="18s"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M 0,150 A 50,50 0 0,0 100,150 A 50,50 0 0,1 200,150"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-200 0"
              dur="24s"
              repeatCount="indefinite"
            />
          </path>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#wave)" />
    </svg>
  </div>

  {/* Section Content */}
  <div className="container mx-auto px-4 max-w-3xl relative z-10">
    <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
    <p className="text-blue-100">
      At Tarcin Robotic, we're always evolving. If you're passionate about innovation in robotic, IoT, or AI,
      we encourage you to explore how you can be part of our journey.
    </p>
  </div>
</section>
