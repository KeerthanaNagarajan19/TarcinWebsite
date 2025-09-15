import React from 'react';

const stories = [
  {
    name: 'Anjali Kumari',
    title: 'Software Engineer @ InnovateX',
    story:
      'S2P helped me transform my career path with real-world projects and consistent mentoring.',
  },
  {
    name: 'Rahul Mehta',
    title: 'Embedded Systems Engineer @ TechCore',
    story:
      'Thanks to S2P’s expert-led sessions, I was able to build a strong foundation and land my dream job.',
  },
  {
    name: 'Meera Iyer',
    title: 'UI/UX Designer @ PixelDash',
    story:
      'The support I received at S2P helped me gain clarity and build a strong portfolio that impressed recruiters.',
  },
];

const StudentVoices = () => {
  return (
    <section className=" py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Voices from S2P</h2>
        <p className="text-gray-600 text-base">
          Real stories from students who grew with us and reached their goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stories.map((s, index) => (
          <article
            key={index}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{s.name}</h3>
            <p className="text-sm text-blue-600 mb-3">{s.title}</p>
            <p className="text-gray-700 text-sm italic">“{s.story}”</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default StudentVoices;
