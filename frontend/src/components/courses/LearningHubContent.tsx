import { useState } from "react";
import "./LearningHub.css";
import Roadmap from "./Roadmap";
import EducationalProgramsSection from "./Coursedata";
import { CheckCircle } from "lucide-react";

interface Module {
    name: string;
    status: "completed" | "in-progress" | "upcoming";
}

interface RoadmapPath {
    title: string;
    modules: Module[];
}

export default function LearningHubContent() {
    // STATE FOR ROADMAPS
    const roadmapPaths: RoadmapPath[] = [
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
        setCurrentRoadmap((prev) => (prev === 0 ? roadmapPaths.length - 1 : prev - 1));
    };

    const nextRoadmap = () => {
        setCurrentRoadmap((prev) => (prev === roadmapPaths.length - 1 ? 0 : prev + 1));
    };

    const industryInsights = [
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
    ];

    const nextSteps = [
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
    ];

    return (
        <div className="bg-white dark:bg-gray-900 overflow-hidden">
            {/* HERO */}
            <section className="learning-hub-hero relative overflow-hidden py-24 md:py-32 flex items-center justify-center bg-gradient-to-br from-[#001D4D] to-[#003366]">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hub-wave-lines" width="100" height="40" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
                                <path d="M 0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#hub-wave-lines)" />
                    </svg>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 uppercase tracking-tight">
                        Education & Training
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        Empowering institutions across Tamil Nadu with interactive learning solutions and regional technical excellence.
                    </p>
                </div>
            </section>

            {/* SECTIONS */}
            <div className="w-full">
                {/* EDUCATIONAL PROGRAMS FROM DB */}
                <EducationalProgramsSection />

                {/* INTERNSHIP & COURSE PROGRAM */}
                <section className="py-24 md:py-32 bg-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6 md:mb-8">
                            Internship & Course Program
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                            Hands-on technical internship and certification courses. Learn by building real-world projects in Robotics and AI, guided by industry experts.
                        </p>
                    </div>
                </section>

                {/* SKILL ROADMAPS */}
                <section className="py-24 md:py-32 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-12 text-center">
                            Skill Roadmaps
                        </h2>

                        {/* Title of current roadmap */}
                        <div className="flex justify-center mb-10">
                            <div className="text-xl md:text-2xl font-bold font-heading text-blue-600 text-center bg-white py-3 px-8 rounded-full border border-blue-50 shadow-sm">
                                {roadmapPaths[currentRoadmap].title}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 md:gap-8 justify-center">
                            <button onClick={prevRoadmap} className="w-14 h-14 rounded-full border border-blue-100 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg shrink-0 z-10 relative">←</button>
                            <div className="flex-grow w-full max-w-[1400px]">
                                <Roadmap modules={roadmapPaths[currentRoadmap].modules} />
                            </div>
                            <button onClick={nextRoadmap} className="w-14 h-14 rounded-full border border-blue-100 flex items-center justify-center bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg shrink-0 z-10 relative">→</button>
                        </div>
                    </div>
                </section>

                {/* INDUSTRY INSIGHTS */}
                <section className="py-24 md:py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6 md:mb-8">
                                Industry Insights
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {industryInsights.map((insight, i) => (
                                <div key={i} className="group relative h-full bg-white rounded-[2.5rem] border border-blue-50 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden p-8">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" />
                                    <h3 className="text-2xl font-heading font-bold text-[#001D4D] mb-3 group-hover:text-blue-700 transition-colors tracking-tight">
                                        {insight.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-6">{insight.desc}</p>
                                    <ul className="space-y-4">
                                        {insight.points.map((p, j) => (
                                            <li key={j} className="flex items-start gap-4">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CheckCircle className="h-5 w-5 text-blue-500 stroke-[3]" />
                                                </div>
                                                <span className="text-sm md:text-base font-medium text-slate-600 leading-relaxed">{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RECOMMENDED NEXT STEPS */}
                <section className="py-24 md:py-32 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6 md:mb-8 text-center px-4">
                                Recommended Next Steps
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {nextSteps.map((block, i) => (
                                <div key={i} className="group relative h-full bg-white rounded-[2.5rem] border border-blue-50 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden p-8">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/30">
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">{block.question}</span>
                                        </div>
                                        <h3 className="text-2xl font-heading font-bold text-[#001D4D] mb-3 group-hover:text-blue-700 transition-colors tracking-tight">{block.title}</h3>
                                        <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-6">{block.desc}</p>
                                        <ul className="space-y-4">
                                            {block.steps.map((s, j) => (
                                                <li key={j} className="flex items-start gap-4">
                                                    <div className="mt-1 flex-shrink-0">
                                                        <CheckCircle className="h-5 w-5 text-blue-500 stroke-[3]" />
                                                    </div>
                                                    <span className="text-sm md:text-base font-medium text-slate-600 leading-relaxed">{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
