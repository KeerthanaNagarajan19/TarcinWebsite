
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

import s_python from "@assets/syllabus/python.pdf";
import s_cloud_computing from "@assets/syllabus/Cloud Computing.pdf";
import s_data_science from "@assets/syllabus/data_science.pdf";
import s_cybersecurity from "@assets/syllabus/cybersecurity.pdf";
import s_ai_ml from "@assets/syllabus/AIML.pdf";
import s_app_dev from "@assets/syllabus/App Development.pdf";
import s_devops from "@assets/syllabus/DevOps.pdf";
import s_networking from "@assets/syllabus/Networking.pdf";
import s_pcb_design from "@assets/syllabus/PCB Designing.pdf";
import s_r_programming from "@assets/syllabus/R programming.pdf";
import s_robotics_iot from "@assets/syllabus/Robotics & IoT.pdf";  
import s_printing3d from "@assets/syllabus/3D Printing.pdf";
import s_web_dev from "@assets/syllabus/Web Development.pdf"; 
import s_data_analyst from "@assets/syllabus/Data Analyst.pdf"; 

// Extended course data with additional details for the course detail page

export interface Module {
  title: string;
  lessons: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  syllabus: any; // You can define a stricter type if needed
  fullDescription: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  image: string; // or `StaticImageData` if using Next.js
  price: string;
  category: string;
  highlights: string[];
  modules: Module[];
  faqs: FAQ[];
}

export const coursesData: Record<string, Course> = {
  "cloud-computing": {
    id: "cloud-computing",
    title: "Cloud Computing Essentials",
    description:
      "Foundational to advanced training on cloud infrastructure, deployment, and services using AWS, Azure, and Google Cloud.",
    syllabus: s_cloud_computing,
    fullDescription: `
      <p>
        <strong>Cloud Computing Essentials</strong> is a hands-on learning
        program tailored for students and professionals aspiring to build
        expertise in cloud technologies. The course begins with core concepts
        and gradually expands into real-world deployment and scaling using
        major platforms.
      </p>
      <p>
        Participants will engage with practical labs and projects involving
        cloud infrastructure setup, serverless architecture, and DevOps
        pipelines. The course also prepares learners for leading certification
        paths like AWS Certified Solutions Architect and Azure Fundamentals.
      </p>`,
    duration: "6–8 weeks (Customizable)",
    level: "Beginner to Intermediate",
    rating: 4.7,
    students: 3200,
    image: cloud_computing,
    price: "Contact for pricing",
    category: "Cloud & Infrastructure",
    highlights: [
      "Hands-on experience with AWS, Azure, and GCP",
      "Live cloud labs and deployment exercises",
      "Guidance for certification exams",
      "Real-world use case projects",
      "Role-based learning paths",
    ],
    modules: [
      {
        title: "Cloud Foundations",
        lessons: [
          "Cloud models (IaaS, PaaS, SaaS)",
          "Virtualization",
          "Storage & Compute services",
        ],
      },
      {
        title: "Service Providers & Tools",
        lessons: ["AWS core services", "Azure resource management", "GCP basics"],
      },
      {
        title: "Deployment & Automation",
        lessons: ["CI/CD pipelines", "Terraform basics", "Serverless architecture"],
      },
      {
        title: "Security & Cost Management",
        lessons: ["Cloud security", "IAM", "Cost optimization strategies"],
      },
    ],
    faqs: [
      {
        question: "Do I need prior experience to join this course?",
        answer:
          "No, the course starts with fundamentals and progresses step-by-step. Basic IT knowledge is helpful but not required.",
      },
      {
        question: "Will I receive a certification?",
        answer:
          "Yes, upon completion, you'll receive a course certificate and guidance for global certifications.",
      },
      {
        question: "Is this suitable for school and college students?",
        answer:
          "Yes, it's designed for learners from higher secondary to graduate level.",
      },
    ],
  },

  python: {
    id: "python",
    title: "Python Programming Mastery",
    description:
      "Comprehensive training from basics to advanced Python for automation, data analysis, and app development.",
    syllabus: s_python,
    fullDescription: `
      <p>
        <strong>Python Programming Mastery</strong> is a structured and engaging course that introduces learners to the world of Python, one of the most versatile and beginner-friendly programming languages.
      </p>
      <p>
        This course covers foundational syntax, control structures, and data types, and extends into real-world applications including automation, file handling, GUI building, and integration with APIs and databases. It’s ideal for students, educators, and professionals aiming to build practical programming skills.
      </p>`,
    duration: "4–6 weeks (Customizable)",
    level: "Beginner to Intermediate",
    rating: 4.9,
    students: 4700,
    image: python,
    price: "Contact for pricing",
    category: "Programming & Development",
    highlights: [
      "Beginner-friendly and interactive",
      "Covers real-world projects and automation tasks",
      "Strong foundation for data science and web dev",
      "Hands-on coding and assessments",
      "Prepares for industry certifications",
    ],
    modules: [
      {
        title: "Python Basics",
        lessons: ["Variables and data types", "Input/output operations", "Control flow (if, loops)"],
      },
      {
        title: "Functions and Structures",
        lessons: ["Functions and scope", "Lists, tuples, dictionaries", "File handling and exceptions"],
      },
      {
        title: "Working with Modules",
        lessons: ["Standard libraries", "Using pip and external packages", "Working with APIs"],
      },
      {
        title: "Advanced Applications",
        lessons: ["GUI development with Tkinter", "Database integration", "Mini projects and automation scripts"],
      },
    ],
    faqs: [
      {
        question: "Is this course beginner-friendly?",
        answer:
          "Yes, the course is designed for complete beginners with no prior coding experience.",
      },
      {
        question: "Will I build real Python projects?",
        answer:
          "Absolutely. The course includes mini projects, such as calculators, to-do apps, and file automation scripts.",
      },
      {
        question: "What career paths can this course help with?",
        answer:
          "Python is used in data science, web development, automation, and AI-this course lays the foundation for all these areas.",
      },
    ],
  },

  "data-science": {
    id: "data-science",
    title: "Data Science Explorer",
    description:
      "End-to-end training in data science covering Python, statistics, data analysis, machine learning, and visualization.",
    syllabus: s_data_science,
    fullDescription: `
      <p>
        <strong>Data Science Explorer</strong> is a practical and industry-aligned course designed to help learners master the tools and techniques of modern data science.
      </p>
      <p>
        This program guides students through Python for data analysis, statistics, data visualization, and introduces machine learning using libraries like Pandas, NumPy, Matplotlib, and Scikit-learn. Ideal for students and aspiring data analysts or engineers.
      </p>`,
    duration: "6–8 weeks (Customizable)",
    level: "Intermediate",
    rating: 4.8,
    students: 3900,
    image: data_science,
    price: "Contact for pricing",
    category: "Data & Analytics",
    highlights: [
      "Real-world data analysis projects",
      "Covers Python, Pandas, and machine learning",
      "Interactive assignments and visualizations",
      "Prepares for data analyst/ML roles",
      "Focus on statistical and business applications",
    ],
    modules: [
      {
        title: "Python for Data Science",
        lessons: ["Numpy and Pandas", "Data cleaning and transformation", "Exploratory data analysis"],
      },
      {
        title: "Statistics & Visualization",
        lessons: [
          "Descriptive statistics",
          "Probability and distributions",
          "Data visualization with Matplotlib and Seaborn",
        ],
      },
      {
        title: "Machine Learning Basics",
        lessons: ["Supervised vs unsupervised learning", "Model training and evaluation", "Scikit-learn intro"],
      },
      {
        title: "Capstone Project",
        lessons: [
          "Real-world dataset analysis",
          "Report generation and dashboarding",
          "Team-based final presentation",
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need programming experience for this course?",
        answer:
          "Basic Python knowledge is helpful, but we provide introductory materials for all enrolled learners.",
      },
      {
        question: "What kind of projects will I build?",
        answer:
          "You'll work on projects involving data cleaning, visualization, prediction models, and data storytelling.",
      },
      {
        question: "Does this course prepare me for data science jobs?",
        answer:
          "Yes, it gives a strong foundation for entry-level roles and further specialization in machine learning or analytics.",
      },
    ],
  },

  "cybersecurity": {
  id: "cybersecurity",
  title: "Cybersecurity Fundamentals",
  description: "Comprehensive training on cybersecurity principles, tools, and best practices to protect digital infrastructure and data.",
  syllabus: s_cybersecurity,
  fullDescription: `
      <p>
        <strong>Cybersecurity Fundamentals</strong> is designed to introduce learners to the essential aspects of securing networks, systems, and data from cyber threats.
      </p>
      <p>
        The course covers everything from basic security concepts and threat modeling to practical implementation of firewalls, encryption, and incident response strategies. It's ideal for students, IT professionals, and aspiring security analysts.
      </p>`,
  duration: "6–8 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.7,
  students: 2800,
  image: cybersecurity,
  price: "Contact for pricing",
  category: "Security & Networking",
  highlights: [
    "Covers core security tools and techniques",
    "Includes hands-on labs and simulations",
    "Introduces ethical hacking and threat analysis",
    "Prepares for certifications like CompTIA Security+",
    "Focus on real-world attack and defense scenarios"
  ],
  modules: [
    {
      title: "Cybersecurity Basics",
      lessons: [
        "Introduction to cybersecurity",
        "Types of cyber threats",
        "Security principles and concepts"
      ],
    },
    {
      title: "Network & System Security",
      lessons: [
        "Firewalls and intrusion detection",
        "Access control and authentication",
        "Operating system security"
      ],
    },
    {
      title: "Cryptography & Data Protection",
      lessons: [
        "Encryption techniques",
        "Hashing and digital signatures",
        "Secure communication protocols"
      ],
    },
    {
      title: "Incident Response & Ethics",
      lessons: [
        "Threat analysis and mitigation",
        "Incident response planning",
        "Cyber laws and ethical hacking"
      ],
    },
  ],
  faqs: [
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, it’s designed for beginners with a step-by-step approach to build cybersecurity knowledge.",
    },
    {
      question: "What tools will I learn to use?",
      answer:
        "You'll be introduced to firewalls, antivirus tools, Wireshark, and encryption software among others.",
    },
    {
      question: "Does this course prepare me for certifications?",
      answer:
        "Yes, it provides foundational knowledge useful for certifications like CompTIA Security+, CEH, and more.",
    },
  ],
},
"r-programming": {
  id: "r-programming",
  title: "R Programming for Data Analysis",
  description: "In-depth training on R language fundamentals, data wrangling, statistical analysis, and visualization for data science.",
  syllabus: s_r_programming,
  fullDescription: `
      <p>
        <strong>R Programming for Data Analysis</strong> is a comprehensive course focused on leveraging R for statistical computing and data science.
      </p>
      <p>
        This course helps learners understand data structures, data manipulation, and visualization techniques using libraries like dplyr, ggplot2, and tidyr. It is ideal for students, researchers, and data analysts aiming to use R for data exploration and reporting.
      </p>`,
  duration: "5–7 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.6,
  students: 2100,
  image: r_programming,
  price: "Contact for pricing",
  category: "Data & Analytics",
  highlights: [
    "Master R for data cleaning and transformation",
    "Use ggplot2 for stunning visualizations",
    "Build statistical models with ease",
    "Hands-on projects and case studies",
    "Ideal for academic and research professionals"
  ],
  modules: [
    {
      title: "Getting Started with R",
      lessons: [
        "Installing R and RStudio",
        "Basic syntax and data types",
        "Vectors, lists, and data frames"
      ],
    },
    {
      title: "Data Manipulation",
      lessons: [
        "Using dplyr for data wrangling",
        "Filtering and summarizing data",
        "Merging and reshaping datasets"
      ],
    },
    {
      title: "Data Visualization",
      lessons: [
        "Creating plots with ggplot2",
        "Customizing charts and themes",
        "Visual storytelling with data"
      ],
    },
    {
      title: "Statistical Analysis & Modeling",
      lessons: [
        "Descriptive and inferential statistics",
        "Linear regression and hypothesis testing",
        "Building and evaluating models"
      ],
    },
  ],
  faqs: [
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, it starts from the basics of R programming and builds up to advanced data analysis techniques.",
    },
    {
      question: "What kind of projects are included?",
      answer:
        "You’ll work on datasets for business analytics, scientific research, and public data visualization.",
    },
    {
      question: "How does this course differ from Python-based data science?",
      answer:
        "R is particularly strong in statistics and reporting; this course emphasizes academic, survey, and research applications.",
    },
  ],
},

"ai-ml": {
  id: "ai-ml",
  title: "AI & Machine Learning Innovator",
  description: "Hands-on course in artificial intelligence and machine learning covering core algorithms, neural networks, and real-world applications.",
  syllabus: s_ai_ml,
  fullDescription: `
      <p>
        <strong>AI & Machine Learning Innovator</strong> is an advanced, project-driven course that equips learners with the foundational theories and practical skills to build intelligent systems.
      </p>
      <p>
        The course covers machine learning algorithms, deep learning with neural networks, natural language processing, and AI deployment strategies. It is tailored for students and professionals aiming to work in data science, AI engineering, or research roles.
      </p>`,
  duration: "8–10 weeks (Customizable)",
  level: "Intermediate to Advanced",
  rating: 4.9,
  students: 3200,
  image: ai_ml,
  price: "Contact for pricing",
  category: "AI & Machine Learning",
  highlights: [
    "Build AI models with TensorFlow and Scikit-learn",
    "Hands-on with deep learning and neural networks",
    "Projects in computer vision and NLP",
    "Deployment of models into real applications",
    "Prepares for AI research and industry roles"
  ],
  modules: [
    {
      title: "Foundations of AI & ML",
      lessons: [
        "Introduction to AI and machine learning",
        "Types of learning: supervised, unsupervised, reinforcement",
        "Core algorithms: linear regression, k-NN, decision trees"
      ],
    },
    {
      title: "Deep Learning & Neural Networks",
      lessons: [
        "Understanding neural networks",
        "Working with TensorFlow/Keras",
        "Image classification and CNNs"
      ],
    },
    {
      title: "NLP & Advanced Topics",
      lessons: [
        "Natural language processing basics",
        "Text classification and sentiment analysis",
        "Intro to transformers and generative AI"
      ],
    },
    {
      title: "Capstone & Deployment",
      lessons: [
        "Building a full-stack ML project",
        "Model evaluation and optimization",
        "Deploying models using Flask and cloud platforms"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need coding experience for this course?",
      answer:
        "Yes, prior knowledge of Python and basic ML concepts is recommended for this course.",
    },
    {
      question: "What kind of projects will I build?",
      answer:
        "You’ll build image classifiers, chatbot prototypes, and deploy models using Flask or FastAPI.",
    },
    {
      question: "What careers can this course lead to?",
      answer:
        "This course prepares you for roles like Machine Learning Engineer, AI Researcher, and Data Scientist.",
    },
  ],
},

"printing3d": {
  id: "printing3d",
  title: "3D Printing Mastery",
  description: "Hands-on training in 3D printing technology covering design, prototyping, slicing, and printing across various materials.",
  syllabus: s_printing3d,
  fullDescription: `
      <p>
        <strong>3D Printing Mastery</strong> is a beginner-friendly, practical course designed to teach the fundamentals and real-world applications of 3D printing.
      </p>
      <p>
        This program walks learners through 3D modeling, slicing software, printer calibration, and production workflows. Ideal for students, makers, designers, and aspiring engineers who want to bring their ideas to life using additive manufacturing.
      </p>`,
  duration: "4–6 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.7,
  students: 2400,
  image: three_d,
  price: "Contact for pricing",
  category: "Design & Engineering",
  highlights: [
    "End-to-end 3D printing workflow training",
    "Covers slicing, materials, and calibration",
    "Hands-on with FDM/PLA printers",
    "Includes 3D modeling basics using TinkerCAD/Fusion 360",
    "Prototyping projects and print optimization techniques"
  ],
  modules: [
    {
      title: "Introduction to 3D Printing",
      lessons: [
        "What is 3D printing and how it works",
        "Applications in industry and prototyping",
        "Overview of different printing technologies"
      ],
    },
    {
      title: "Design & Modeling",
      lessons: [
        "3D modeling with TinkerCAD and Fusion 360",
        "Design principles for printability",
        "Exporting STL files"
      ],
    },
    {
      title: "Slicing & Printing",
      lessons: [
        "Using slicing software (e.g., Cura)",
        "Understanding layers, infill, and supports",
        "Calibrating the printer and starting a print"
      ],
    },
    {
      title: "Capstone Project",
      lessons: [
        "Create a custom 3D model",
        "Optimize, slice, and print the design",
        "Project showcase and review"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior experience with 3D modeling?",
      answer:
        "No, the course starts with beginner-friendly tools and gradually introduces advanced techniques.",
    },
    {
      question: "What kind of printer is used in the course?",
      answer:
        "We use FDM printers with PLA filament, which are affordable and ideal for beginners.",
    },
    {
      question: "Can I take this course without owning a printer?",
      answer:
        "Yes, we provide printer access during the training sessions or help you find local print labs.",
    },
  ],
},

"web-development": {
  id: "web-development",
  title: "Full Stack Web Development",
  description: "Comprehensive training in front-end and back-end web development using HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.",
  syllabus: s_web_dev,
  fullDescription: `
      <p>
        <strong>Full Stack Web Development</strong> is a complete, project-driven course designed to help learners build dynamic, responsive, and secure web applications from scratch.
      </p>
      <p>
        The program walks learners through the fundamentals of web design, client-side interactivity with JavaScript and React, and back-end development with Node.js, Express, and MongoDB. It’s ideal for students, aspiring developers, and entrepreneurs building web platforms.
      </p>`,
  duration: "8–12 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.9,
  students: 4700,
  image: web_dev,
  price: "Contact for pricing",
  category: "Web Development",
  highlights: [
    "Covers front-end and back-end development",
    "Build and deploy real-world full-stack projects",
    "Hands-on with React, Node.js, and MongoDB",
    "Responsive UI and RESTful API development",
    "Capstone project with hosting on cloud"
  ],
  modules: [
    {
      title: "Frontend Development",
      lessons: [
        "HTML5, CSS3, and JavaScript",
        "Responsive design with Bootstrap",
        "React basics and component-driven architecture"
      ],
    },
    {
      title: "Backend & APIs",
      lessons: [
        "Node.js and Express framework",
        "REST API creation and integration",
        "MongoDB for database handling"
      ],
    },
    {
      title: "Authentication & Deployment",
      lessons: [
        "User authentication with JWT",
        "Hosting with Netlify and Render",
        "Environment management and deployment best practices"
      ],
    },
    {
      title: "Capstone Project",
      lessons: [
        "Design and develop a full-stack web app",
        "Deploy to cloud with version control",
        "Live presentation and code review"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior experience in coding?",
      answer:
        "No, this course is suitable for beginners and includes foundational content to get you started.",
    },
    {
      question: "Will I be able to build a real-world project?",
      answer:
        "Yes, by the end of the course you will build and deploy a full-stack application using industry tools.",
    },
    {
      question: "Is this course enough to get a job as a developer?",
      answer:
        "Yes, it provides practical experience and a portfolio project, which are crucial for entry-level developer roles.",
    },
  ],
},
"app-development": {
  id: "app-development",
  title: "Mobile App Development",
  description: "Comprehensive training on building mobile apps for Android and iOS using React Native and Flutter frameworks.",
  syllabus: s_app_dev,
  fullDescription: `
      <p>
        <strong>Mobile App Development</strong> is a hands-on course focused on creating powerful and user-friendly mobile applications across platforms.
      </p>
      <p>
        This course covers the fundamentals of mobile app design, development with React Native and Flutter, integrating APIs, and deploying apps to Google Play and the Apple App Store. Perfect for beginners and developers wanting cross-platform skills.
      </p>`,
  duration: "8–10 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.7,
  students: 3200,
  image: app_dev,
  price: "Contact for pricing",
  category: "App Development",
  highlights: [
    "Build native-like cross-platform apps",
    "Hands-on with React Native and Flutter",
    "Integrate RESTful APIs and Firebase",
    "App deployment to Play Store and App Store",
    "Focus on UI/UX and performance optimization"
  ],
  modules: [
    {
      title: "Introduction to Mobile Development",
      lessons: [
        "Overview of mobile platforms and tools",
        "Setting up React Native environment",
        "Hello World app with React Native"
      ],
    },
    {
      title: "Core React Native & Flutter",
      lessons: [
        "React Native components and navigation",
        "Flutter widgets and layouts",
        "State management basics"
      ],
    },
    {
      title: "Backend & API Integration",
      lessons: [
        "Connecting apps to RESTful APIs",
        "Using Firebase for backend services",
        "Authentication and data storage"
      ],
    },
    {
      title: "Publishing & Maintenance",
      lessons: [
        "Testing and debugging apps",
        "Publishing apps on Google Play and App Store",
        "App maintenance and updates"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior programming experience?",
      answer:
        "Basic programming knowledge is helpful but not mandatory; we cover essentials during the course.",
    },
    {
      question: "Will I be able to publish my app on stores?",
      answer:
        "Yes, the course includes step-by-step guidance for deploying apps to both Google Play and the Apple App Store.",
    },
    {
      question: "Which platforms will I learn to develop for?",
      answer:
        "You will learn cross-platform app development targeting both Android and iOS devices.",
    },
  ],
},
"devops": {
  id: "devops",
  title: "DevOps Engineering",
  description: "Comprehensive training in DevOps principles, CI/CD pipelines, automation, containerization, and cloud infrastructure management.",
  syllabus: s_devops,
  fullDescription: `
      <p>
        <strong>DevOps Engineering</strong> is a hands-on course designed to equip learners with the skills to automate software delivery and infrastructure changes efficiently.
      </p>
      <p>
        This program covers continuous integration and delivery (CI/CD), container orchestration with Docker and Kubernetes, infrastructure as code (IaC) using Terraform, and cloud services management on AWS and Azure. Ideal for software engineers, system admins, and cloud professionals.
      </p>`,
  duration: "8–10 weeks (Customizable)",
  level: "Intermediate",
  rating: 4.7,
  students: 2800,
  image: devops,
  price: "Contact for pricing",
  category: "Cloud & DevOps",
  highlights: [
    "Hands-on CI/CD pipeline creation",
    "Master Docker & Kubernetes",
    "Infrastructure as Code with Terraform",
    "Cloud automation using AWS & Azure",
    "Focus on scalable and reliable deployments"
  ],
  modules: [
    {
      title: "Introduction to DevOps",
      lessons: [
        "DevOps culture and principles",
        "Version control with Git",
        "Overview of CI/CD pipelines"
      ],
    },
    {
      title: "Containerization & Orchestration",
      lessons: [
        "Docker fundamentals",
        "Creating and managing containers",
        "Kubernetes architecture and deployment"
      ],
    },
    {
      title: "Infrastructure Automation",
      lessons: [
        "Infrastructure as Code with Terraform",
        "Configuration management with Ansible",
        "Monitoring and logging"
      ],
    },
    {
      title: "Cloud DevOps Practices",
      lessons: [
        "AWS DevOps tools",
        "Azure DevOps services",
        "Security and compliance in DevOps"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior DevOps experience?",
      answer:
        "Basic knowledge of software development and IT operations is helpful but not required; the course covers fundamentals.",
    },
    {
      question: "Will I learn to deploy real applications?",
      answer:
        "Yes, you'll build and automate full CI/CD pipelines deploying sample applications to the cloud.",
    },
    {
      question: "Which cloud platforms are covered?",
      answer:
        "The course focuses on AWS and Azure, with practical labs on both platforms.",
    },
  ],
},

"networking": {
  id: "networking",
  title: "Networking Fundamentals",
  description: "Comprehensive course covering networking concepts, protocols, configurations, and security essentials.",
  syllabus: s_networking,
  fullDescription: `
      <p>
        <strong>Networking Fundamentals</strong> is a hands-on course designed to build a solid foundation in computer networking.
      </p>
      <p>
        This program covers core networking topics including TCP/IP protocols, network devices, subnetting, routing, switching, wireless technologies, and network security principles. Ideal for beginners and aspiring network engineers.
      </p>`,
  duration: "5–7 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.6,
  students: 3200,
  image: networking,
  price: "Contact for pricing",
  category: "Networking & Security",
  highlights: [
    "Understand network architectures and models",
    "Learn IP addressing and subnetting",
    "Hands-on with routers and switches",
    "Network troubleshooting techniques",
    "Introduction to network security"
  ],
  modules: [
    {
      title: "Networking Basics",
      lessons: [
        "OSI and TCP/IP models",
        "Types of networks (LAN, WAN, MAN)",
        "Network hardware overview"
      ],
    },
    {
      title: "IP Addressing & Routing",
      lessons: [
        "IPv4 and IPv6 addressing",
        "Subnetting and VLSM",
        "Routing protocols basics"
      ],
    },
    {
      title: "Switching & Wireless",
      lessons: [
        "Switch operations and VLANs",
        "Wireless networking concepts",
        "Network topologies"
      ],
    },
    {
      title: "Network Security & Troubleshooting",
      lessons: [
        "Basic firewall and VPN concepts",
        "Common network threats",
        "Troubleshooting tools and techniques"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior networking knowledge?",
      answer:
        "No prior experience is required; the course starts with foundational concepts.",
    },
    {
      question: "Will I get hands-on practice?",
      answer:
        "Yes, the course includes practical labs on configuring and troubleshooting networks.",
    },
    {
      question: "Is this course suitable for certification preparation?",
      answer:
        "It provides a solid base useful for certifications like CompTIA Network+ and Cisco CCNA.",
    },
  ],
},

"robotics-iot": {
  id: "robotics-iot",
  title: "Robotics & IoT Innovator",
  description: "Hands-on training in robotics and Internet of Things technologies, including sensors, automation, and embedded systems.",
  syllabus: s_robotics_iot,
  fullDescription: `
      <p>
        <strong>Robotics & IoT Innovator</strong> empowers learners to build intelligent connected devices and automated systems.
      </p>
      <p>
        This course covers fundamentals of robotics, microcontrollers like Arduino and Raspberry Pi, sensor integration, wireless communication, and IoT platforms. Perfect for students, hobbyists, and aspiring engineers eager to innovate.
      </p>`,
  duration: "8–10 weeks (Customizable)",
  level: "Intermediate",
  rating: 4.7,
  students: 2700,
  image: robotics_iot,
  price: "Contact for pricing",
  category: "Robotics & IoT",
  highlights: [
    "Build real-world robotics and IoT projects",
    "Hands-on with Arduino, Raspberry Pi, and sensors",
    "Learn automation and wireless communication",
    "Explore cloud integration for IoT devices",
    "Focus on embedded programming and system design"
  ],
  modules: [
    {
      title: "Introduction to Robotics",
      lessons: [
        "Robotics basics and applications",
        "Actuators and sensors overview",
        "Robot kinematics and control"
      ],
    },
    {
      title: "Microcontrollers & Embedded Systems",
      lessons: [
        "Arduino programming and circuits",
        "Raspberry Pi fundamentals",
        "Interfacing sensors and actuators"
      ],
    },
    {
      title: "IoT Systems and Communication",
      lessons: [
        "Wireless protocols: Wi-Fi, Bluetooth, Zigbee",
        "Cloud platforms for IoT",
        "Data collection and device management"
      ],
    },
    {
      title: "Capstone Project",
      lessons: [
        "Design and build a robotic or IoT system",
        "Integrate sensors, communication, and control",
        "Presentation and demonstration"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior electronics or programming knowledge?",
      answer:
        "Basic programming and electronics are helpful but not mandatory. We provide introductory resources.",
    },
    {
      question: "What projects will I work on?",
      answer:
        "Projects include building automated robots, sensor networks, and IoT-enabled devices.",
    },
    {
      question: "Is this course suitable for beginners?",
      answer:
        "Yes, it’s designed for beginners and intermediate learners aiming to enter robotics and IoT fields.",
    },
  ],
},

"pcb-designing": {
  id: "pcb-designing",
  title: "PCB Designing Mastery",
  description: "Comprehensive training in printed circuit board (PCB) design, layout, and manufacturing processes.",
  syllabus: s_pcb_design,
  fullDescription: `
      <p>
        <strong>PCB Designing Mastery</strong> offers a thorough understanding of designing efficient and manufacturable PCBs for various electronic projects.
      </p>
      <p>
        The course covers schematic capture, PCB layout techniques, design rules, signal integrity, and hands-on use of popular PCB design software like Eagle, KiCad, and Altium Designer. Ideal for electronics engineers, hobbyists, and product developers.
      </p>`,
  duration: "5–7 weeks (Customizable)",
  level: "Intermediate",
  rating: 4.7,
  students: 1800,
  image: pcb_design,
  price: "Contact for pricing",
  category: "Electronics & Design",
  highlights: [
    "Hands-on PCB layout and schematic design",
    "Learn industry-standard design tools",
    "Understanding design for manufacturability",
    "Signal integrity and grounding techniques",
    "Project-based learning with real PCB designs"
  ],
  modules: [
    {
      title: "Introduction to PCB Design",
      lessons: [
        "PCB basics and types",
        "Schematic capture fundamentals",
        "Design requirements and constraints"
      ],
    },
    {
      title: "PCB Layout Techniques",
      lessons: [
        "Component placement strategies",
        "Routing and trace design",
        "Design rules and checks"
      ],
    },
    {
      title: "Advanced PCB Design Concepts",
      lessons: [
        "Signal integrity and noise reduction",
        "Grounding and power distribution",
        "Multi-layer PCB design"
      ],
    },
    {
      title: "Manufacturing & Testing",
      lessons: [
        "Preparing manufacturing files (Gerber, BOM)",
        "Working with PCB manufacturers",
        "Testing and troubleshooting PCBs"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior electronics experience?",
      answer:
        "Basic electronics knowledge is helpful but not required; we provide foundational materials.",
    },
    {
      question: "Which PCB design software will I learn?",
      answer:
        "You'll work with Eagle, KiCad, and get introduced to Altium Designer tools.",
    },
    {
      question: "Will I design real PCBs?",
      answer:
        "Yes, you will complete projects that include schematic capture, layout, and preparing manufacturing files.",
    },
  ],
},

"data-analytics": {
  id: "data-analytics",
  title: "Data Analytics Professional",
  description: "Comprehensive training in data analytics focusing on data wrangling, visualization, and business insights.",
  syllabus: s_data_analyst,
  fullDescription: `
      <p>
        <strong>Data Analytics Professional</strong> is a hands-on course designed to equip learners with skills to extract meaningful insights from data using analytical tools and techniques.
      </p>
      <p>
        The program covers data cleaning, exploratory data analysis, dashboard creation, and business intelligence concepts using tools like Excel, SQL, Tableau, and Power BI. Suitable for aspiring data analysts and business professionals.
      </p>`,
  duration: "5–7 weeks (Customizable)",
  level: "Beginner to Intermediate",
  rating: 4.6,
  students: 3200,
  image: data_analyst,
  price: "Contact for pricing",
  category: "Data & Analytics",
  highlights: [
    "Data wrangling and transformation techniques",
    "Visualization with Tableau and Power BI",
    "SQL for data querying",
    "Business analytics and reporting",
    "Real-world case studies and projects"
  ],
  modules: [
    {
      title: "Data Wrangling and Preparation",
      lessons: [
        "Data cleaning with Excel and Python",
        "Data transformation and validation",
        "Handling missing and inconsistent data"
      ],
    },
    {
      title: "Exploratory Data Analysis",
      lessons: [
        "Statistical summary and trends",
        "Data visualization principles",
        "Creating charts and dashboards"
      ],
    },
    {
      title: "SQL for Data Analytics",
      lessons: [
        "Basic to advanced SQL queries",
        "Joining and aggregating data",
        "Database management fundamentals"
      ],
    },
    {
      title: "Business Intelligence Tools",
      lessons: [
        "Introduction to Tableau and Power BI",
        "Dashboard design and interactivity",
        "Reporting and presentation best practices"
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need prior programming experience?",
      answer:
        "No programming experience is required, but basic familiarity with Excel is helpful.",
    },
    {
      question: "What tools will I learn?",
      answer:
        "You'll learn Excel, SQL, Tableau, and Power BI for data analysis and visualization.",
    },
    {
      question: "Will this course prepare me for analytics roles?",
      answer:
        "Yes, this course prepares you for entry-level data analyst roles with practical skills and projects.",
    },
  ],
}
};
