import React, { useState } from "react";
import "./LearningHub.css";

import Roadmap from "./Roadmap";

export default function LearningHub() {
  // STATE FOR ROADMAPS
  const roadmapPaths = [
    {
      title: "Robotics & IoT Innovator",
      modules: [
        { name: "Introduction to Robotics", status: "completed" },
        { name: "Microcontrollers & Embedded Systems", status: "in-progress" },
        { name: "IoT Systems and Communication", status: "upcoming" },
      ],
    },
    {
      title: "Full Stack Web Development",
      modules: [
        { name: "Frontend Development", status: "completed" },
        { name: "Backend & APIs", status: "in-progress" },
        { name: "Authentication & Deployment", status: "upcoming" },
        { name: "Capstone Project", status: "upcoming" },
      ],
    },
    {
      title: "Data Science Explorer",
      modules: [
        { name: "Python for Data Science", status: "completed" },
        { name: "Statistics & Visualization", status: "in-progress" },
        { name: "Machine Learning Basics", status: "upcoming" },
        { name: "Capstone Project", status: "upcoming" },
      ],
    },
  ];
const [currentRoadmap, setCurrentRoadmap] = useState(0);

  const prevRoadmap = () => {
    setCurrentRoadmap(
      (prev) => (prev === 0 ? roadmapPaths.length - 1 : prev - 1)
    );
  };

  const nextRoadmap = () => {
    setCurrentRoadmap(
      (prev) => (prev === roadmapPaths.length - 1 ? 0 : prev + 1)
    );
  };


  // STATE FOR EVENTS
  const [filter, setFilter] = useState("upcoming");
  const events = [
    { title: "AI Hackathon 2026", date: "2026-01-25", type: "upcoming" },
    { title: "Robotics Workshop", date: "2026-02-10", type: "upcoming" },
    { title: "Web Dev Bootcamp", date: "2026-03-05", type: "upcoming" },
    { title: "Past AI Seminar", date: "2025-12-15", type: "past" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Education & Training</h1>
          <p>
            Empowering institutions across Tamil Nadu with interactive learning
            solutions.
          </p>
        </div>
      </section>

      <div className="container">
        {/* INTERNSHIP & COURSE PROGRAM */}
        <section className="program">
          <h2>Internship & Course Program</h2>
          <p>
            Hands-on technical internship and certification courses. Learn by
            building real-world projects in Robotics and AI.
          </p>
        </section>

        {/* SKILL ROADMAPS */}
      <section className="roadmaps">


  <div className="roadmap-glass-box">
      <h2>Skill Roadmaps</h2>
    <div className="roadmap-navigation">
      <button onClick={prevRoadmap} className="nav-btn">←</button>
      <Roadmap
        title={roadmapPaths[currentRoadmap].title}
        modules={roadmapPaths[currentRoadmap].modules}
      />
      <button onClick={nextRoadmap} className="nav-btn">→</button>
    </div>
  </div>
</section>

        {/* INDUSTRY INSIGHTS */}
        <section className="insights">
          <h2>Industry Insights</h2>
          <div className="insight-cards">
            {[
              {
                title: "Robotics in Manufacturing",
                desc: "Automation and AI-driven robotics are reshaping modern industries.",
                points: ["Smart factories", "Predictive maintenance", "Reduced human error"],
              },
              {
                title: "AI in Healthcare",
                desc: "Artificial Intelligence improves diagnosis and patient care.",
                points: ["Medical imaging", "Health monitoring", "Early disease detection"],
              },
              {
                title: "IoT in Smart Systems",
                desc: "Interconnected devices enable real-time data exchange.",
                points: ["Smart cities", "Energy efficiency", "Remote monitoring"],
              },
              {
                title: "Data Science in Business",
                desc: "Data-driven decisions power modern enterprises.",
                points: ["Customer analytics", "Market prediction", "Business intelligence"],
              },
              {
                title: "Cybersecurity & Ethical Hacking",
                desc: "With rising cyber threats, security professionals are in high demand.",
                points: ["Network security", "Ethical hacking practices", "Data protection & compliance"],
              },
              {
  title: "Cloud Computing & DevOps",
  desc: "Scalable infrastructure and automated deployment power modern applications.",
  points: [
    "AWS, Azure & GCP fundamentals",
    "CI/CD pipelines & automation",
    "Containerization with Docker & Kubernetes",
  ],
},

            ].map((insight, i) => (
              <div key={i} className="insight-card">
                <h3>{insight.title}</h3>
                <p>{insight.desc}</p>
                <ul>
                  {insight.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

       <section className="next-steps">
  <h2>Recommended Next Steps</h2>
  <div className="steps-grid">
    {[
      {
        question: "Do you have strong core fundamentals?",
        title: "Strengthen Core Skills",
        desc: "Build a solid foundation required across all technical roles.",
        steps: [
          "Revise Python / JavaScript basics",
          "Practice logic & problem-solving",
          "Understand core engineering concepts",
        ],
      },
      {
        question: "Have you applied your knowledge practically?",
        title: "Hands-on Projects",
        desc: "Convert theory into real-world implementation.",
        steps: [
          "Build mini projects",
          "Work on real-time datasets",
          "Document projects on GitHub",
        ],
      },
      {
        question: "Are you ready to specialize?",
        title: "Advanced Learning",
        desc: "Choose a domain and build depth.",
        steps: [
          "AI / ML model development",
          "Robotics & automation",
          "Cloud & deployment skills",
        ],
      },
      {
        question: "Are you industry-ready?",
        title: "Career Readiness",
        desc: "Prepare for internships, jobs, and interviews.",
        steps: [
          "Create a strong portfolio",
          "Prepare interview questions",
          "Apply for internships & workshops",
        ],
      },
      {
        question: "Are you visible to recruiters?",
        title: "Personal Branding & Networking",
        desc: "Increase your professional visibility and industry connections.",
        steps: [
          "Optimize LinkedIn profile",
          "Share projects & learning posts",
          "Connect with professionals & mentors",
        ],
      },
       {
        question: "Do you continue learning & upskilling?",
        title: "Continuous Learning & Certification",
        desc: "Stay updated with the latest technologies and validate your skills.",
        steps: [
          "Enroll in online courses and certifications",
          "Attend webinars and workshops",
          "Follow industry trends and emerging tech",
        ],
      },
    ].map((block, i) => (
      <div key={i} className="step-card-advanced">
        <div className="step-badge">{i + 1}</div>
        <div className="step-content">
          <div className="step-question">{block.question}</div>
          <h3>{block.title}</h3>
          <p>{block.desc}</p>
          <ul>
            {block.steps.map((s, j) => (
              <li key={j}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* EVENTS & WORKSHOPS */}
        <section className="events">
          <h2>Events & Workshops</h2>
          <div className="event-filters">
            <button
              className={filter === "upcoming" ? "active" : ""}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={filter === "past" ? "active" : ""}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
          </div>
          <div className="event-cards">
            {events
              .filter((e) => e.type === filter)
              .map((event, i) => (
                <div key={i} className="card event-card">
                  <h3>{event.title}</h3>
                  <p>Date: {event.date}</p>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
