// data.ts
import python from "@assets/courses/python.jpg";

import cloud_computing from "@assets/courses/cloud-computing.jpg";
import data_science from "@assets/courses/dataScience.jpg";
import cybersecurity from "@assets/courses/cybersecurity.jpg";
import ai_ml from "@assets/courses/ai-ml.jpg";
import app_dev from "@assets/courses/app-dev.jpg";
import data_analyst from "@assets/courses/dataAnalyst.jpg";
import devops from "@assets/courses/devops.jpg";
import networking from "@assets/courses/networking.jpg";
import pcb_design from "@assets/courses/pcb-designing.jpg";
import r_programming from "@assets/courses/r-programming.jpg";
import robotics_iot from "@assets/courses/robotics-iot.jpg";
import three_d from "@assets/courses/threeD.jpg";
import web_dev from "@assets/courses/web-development.jpg";

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  image: string;
  price: string;
  category: string;
}

export const upcomingCourses: Course[] = [
  {
    id: "python",
    title: "Python Programming",
    description: "Master Python through real-world projects and logic-building for software development, data analysis, and automation workflows.",
    duration: "90 Hours",
    level: "Beginner",
    rating: 4.8,
    students: 6500,
    image: python,
    price: "₹1,999",
    category: "Programming",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn data analysis, machine learning, and visualization using Python, Pandas, and real datasets in hands-on modules.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.9,
    students: 4200,
    image: data_science,
    price: "₹1,999",
    category: "Data Analytics",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Understand networks, threats, firewalls, and ethical hacking techniques for secure systems and responsible cyber defense roles.",
    duration: "90 Hours",
    level: "Advanced",
    rating: 4.7,
    students: 3500,
    image: cybersecurity,
    price: "₹1,999",
    category: "Security",
  },
  {
    id: "r-programming",
    title: "R Programming",
    description: "Explore statistical analysis, visualization, and predictive modeling using R language with practical applications in research.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.6,
    students: 2800,
    image: r_programming,
    price: "₹1,999",
    category: "Data Analytics",
  },
  {
    id: "ai-ml",
    title: "AI/ML",
    description: "Hands-on training in AI, machine learning algorithms, model building, and intelligent systems using Python and TensorFlow.",
    duration: "90 Hours",
    level: "Advanced",
    rating: 4.9,
    students: 5600,
    image: ai_ml,
    price: "₹1,999",
    category: "Artificial Intelligence",
  },
  {
    id: "printing3d",
    title: "3D Printing",
    description: "Design, prototype, and print models using CAD software and 3D printers for practical applications and innovations.",
    duration: "90 Hours",
    level: "Beginner",
    rating: 4.5,
    students: 2300,
    image: three_d,
    price: "₹1,999",
    category: "Hardware",
  },
  {
    id: "web-development",
    title: "Web Development (Full Stack)",
    description: "Build dynamic web applications using HTML, CSS, JavaScript, React, Node.js, and MongoDB with real-time deployment.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.8,
    students: 6700,
    image: web_dev,
    price: "₹1,999",
    category: "Programming",
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Learn Android/iOS mobile app development using Flutter and React Native, including backend integration and publishing apps.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.7,
    students: 3900,
    image: app_dev,
    price: "₹1,999",
    category: "Mobile Development",
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Master CI/CD pipelines, containerization with Docker, Kubernetes orchestration, and cloud deployment using DevOps tools.",
    duration: "90 Hours",
    level: "Advanced",
    rating: 4.6,
    students: 3100,
    image: devops,
    price: "₹1,999",
    category: "Cloud",
  },
  {
    id: "networking",
    title: "Networking",
    description: "Understand LAN, WAN, protocols, devices, IP addressing, and configure routers and switches with real-world simulations.",
    duration: "90 Hours",
    level: "Beginner",
    rating: 4.5,
    students: 2700,
    image: networking,
    price: "₹1,999",
    category: "Infrastructure",
  },
  {
    id: "robotics-iot",
    title: "Robotics & IoT",
    description: "Design robots, work with microcontrollers, sensors, and IoT connectivity using Python and Arduino-based kits.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.8,
    students: 3300,
    image: robotics_iot,
    price: "₹1,999",
    category: "Hardware",
  },
  {
    id: "pcb-designing",
    title: "PCB Designing",
    description: "Learn PCB layout design, circuit simulation, and prototyping using tools like KiCAD and Eagle with fabrication basics.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.5,
    students: 2100,
    image: pcb_design,
    price: "₹1,999",
    category: "Electronics",
  },
  {
    id: "data-analytics",
    title: "Data Analyst",
    description: "Analyze business data, build dashboards, and create insights using SQL, Excel, and BI tools like Power BI.",
    duration: "90 Hours",
    level: "Intermediate",
    rating: 4.7,
    students: 4700,
    image: data_analyst,
    price: "₹1,999",
    category: "Business Intelligence",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing",
    description: "Get hands-on experience with AWS, Azure, and GCP services covering cloud storage, computing, networking, and security.",
    duration: "90 Hours",
    level: "Advanced",
    rating: 4.8,
    students: 4900,
    image: cloud_computing,
    price: "₹1,999",
    category: "Cloud",
  }
];
