import dog from "@assets/products/dog.png";
import book from "@assets/products/book.png";
import head from "@assets/products/head.png";
import charge from "@assets/products/charge-final.png"
import code_asthram from "@assets/products/code-asthram.png";
import spouted from "@assets/products/sprouted.png";
import home from "@assets/products/home_kit.jpeg";



// Data for all products from ProductsSection
export const productsData: Record<string, any> = {
  // Educational Products
  "sprouted-lms": {
    id: "sprouted-lms",
    title: "SproutED LMS",
    description: "A lightweight, modular learning management system built for schools and training institutions, with classroom tracking and integration features.",
    fullDescription: `<p>SproutED LMS is our lightweight, modular learning management system designed specifically for the needs of Indian educational institutions. It provides a comprehensive platform for course delivery, student management, and learning assessment.</p>
    <p>Unlike bulky international platforms, SproutED is optimized for varying internet connectivity conditions and is designed with local educational practices in mind. It supports multiple Indian languages and integrates seamlessly with existing school management systems.</p>
    <p>The platform emphasizes ease of use for both teachers and students, with an intuitive interface that requires minimal training to master.</p>`,
    image: spouted,
    category: "Educational",
    tier: "Standard",
    price: "Starting at ₹1,50,000 per year",
    features: [
      "Intuitive course creation tools",
      "Student progress tracking",
      "Assignment management",
      "Online assessment tools",
      "Multimedia content support",
      "Mobile-responsive design",
      "Multilingual interface",
      "Parent portal access"
    ],
    technicalSpecs: {
      deployment: "Cloud-based or on-premises",
      accessibility: "Browser-based with mobile apps",
      dataSecurity: "Compliant with educational data protection standards",
      languages: "Support for Tamil, English, Hindi, and other Indian languages",
      compatibility: "Integration with popular school management systems",
      reporting: "Comprehensive reporting for administrators and teachers"
    },
    caseStudies: [
      {
        title: "District-Wide Implementation",
        description: "A school district with 12 institutions implemented SproutED LMS, resulting in streamlined administration, improved communication between teachers and students, and 30% higher assignment completion rates.",
        industry: "Education"
      },
      {
        title: "Vocational Training Center",
        description: "A vocational training center used SproutED to deliver blended learning courses, combining online content with in-person practical sessions, resulting in broader reach and improved student outcomes.",
        industry: "Education"
      }
    ],
    testimonials: [
      {
        quote: "SproutED has transformed how we deliver courses. The intuitive interface means our teachers spend less time on technology and more time on actual teaching.",
        author: "Manjula Krishnan",
        position: "Academic Director, Chennai Academy"
      },
      {
        quote: "The multilingual support and offline capabilities make this perfect for our context. Our students can access content even with limited connectivity.",
        author: "Anand Raghavan",
        position: "Principal, Rural Educational Trust"
      }
    ],
    faqs: [
      {
        question: "Can SproutED integrate with our existing student information system?",
        answer: "Yes, SproutED is designed with integration capabilities for most common SIS platforms used in Indian schools. We provide API access and custom integration services as needed."
      },
      {
        question: "How does SproutED handle assessment and grading?",
        answer: "The platform includes various assessment types from multiple-choice tests to essay submissions and project uploads. Grading tools include rubrics, automated scoring for objective questions, and comprehensive grade book functionality."
      },
      {
        question: "Is training provided for teachers and administrators?",
        answer: "Yes, all SproutED implementations include comprehensive training programs customized to your institution's needs. We also provide ongoing support and advanced training options."
      }
    ]
  },
  "tarcin-crm": {
  id: "tarcin-crm",
  title: "CHARGE – Institutional CRM Redefined",
  description: "Integrated ERP/CRM for education, designed to streamline operations from admissions to alumni engagement with secure, customizable modules.",
  fullDescription: `<p>CHARGE is an integrated CRM platform purpose-built for educational institutions, training centers, and organizations to manage their operations efficiently-from admissions to alumni engagement.</p> 
  <p>Designed with flexibility and scalability in mind, CHARGE simplifies complex administrative workflows and ensures every touchpoint of the student and institutional journey is organized, optimized, and outcome-driven.</p>
  <p>With powerful customization options, CHARGE adapts seamlessly to the unique needs of schools, colleges, preschools, training centers, and corporate learning divisions.</p>`,
  image: charge,
  category: "Software",
  tier: "Enterprise",
  price: "Starting at ₹4,00,000 per year",
  features: [
    "Student Lifecycle Management",
    "Customizable Workflows",
    "Centralized Communication",
    "Real-Time Dashboards & Reports",
    "Secure Cloud Access",
    "Career Planning Integration",
    "Multi-Institution Management"
  ],
  technicalSpecs: {
    deployment: "Cloud-based | On-Premise (upon request)",
    security: "Role-based access control, SSL encryption, daily backups",
    integration: "Email, SMS, WhatsApp, Payment Gateway, LMS",
    customization: "Fully modular and customizable",
    localization: "Multi-language support and responsive design",
    support: "Onboarding assistance, training modules, and dedicated support"
  },
  caseStudies: [
    {
      title: "Buzzing Bees Preschool",
      description: "CHARGE was implemented with customized modules to manage preschool-specific workflows. Resulted in 60% reduction in manual work and improved parent satisfaction.",
      industry: "Preschool Education"
    }
  ],
  testimonials: [
    {
      quote: "CHARGE has helped us bring structure to our operations. It’s easy to use and completely tailored to our needs.",
      author: "Administrator",
      position: "Buzzing Bees Preschool"
    }
  ],
  faqs: [
    {
      question: "Who can use CHARGE?",
      answer: "CHARGE is designed for preschools, K-12 schools, colleges, coaching centers, training institutions, and corporate learning departments."
    },
    {
      question: "Can CHARGE be customized for our institution's unique processes?",
      answer: "Yes, CHARGE is fully modular and can be tailored to suit your workflows, terminology, and functional needs."
    },
    {
      question: "Is CHARGE secure?",
      answer: "Absolutely. We implement advanced encryption protocols, secure logins, and regular backups to ensure data integrity and privacy."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation time varies based on customization requirements, but a standard setup can be completed in 1–2 weeks."
    },
    {
      question: "Does CHARGE offer support and training?",
      answer: "Yes, we provide complete onboarding, training sessions for users, and continuous technical support through email, chat, and call."
    },
    {
      question: "Can I manage multiple branches or institutions?",
      answer: "Yes, CHARGE supports multi-institution management from a single dashboard."
    }
  ]
},

  "smart-home-kit": {
    id: "smart-home-kit",
    title: "Smart Home Mini Kit",
    description: "A deployable, IoT-driven demonstration unit for end-to-end home automation with data visualization and control dashboards.",
    fullDescription: "The SmartSync EcoSystem is an advanced, all-in-one platform designed to transform homes and industrial environments into intelligent, interconnected spaces. By seamlessly integrating proprietary devices, third-party IoT products, and cutting-edge AI, SmartSync delivers effortless automation, voice-activated control, and predictive intelligence to enhance convenience, efficiency, and security. Whether you're managing a smart home or optimizing industrial operations, SmartSync provides a scalable, secure, and user-friendly solution that adapts to your needs.",
    image: home,
    category: "IoT Devices",
    tier: "Standard",
    price: "Starting at ₹50,000",
    features: [
      "Universal Device Integration",
      "Voice-Activated Automation",
      "Futuristic AI Integration",
      "Energy Efficiency and Sustainability",
      "Seamless Connectivity",
      "Enhanced Security",
      "Customizable automation rules"
    ],
    technicalSpecs: {
      connectivity: "WiFi, Bluetooth, Zigbee mesh network",
      powerBackup: "UPS integration for critical components",
      controlInterface: "Web dashboard and mobile applications",
      security: "End-to-end encryption for device communication",
      compatibility: "Works with major voice assistants",
      expandability: "Modular design for additional sensors/devices"
    },
    caseStudies: [
      {
        title: "Smart Home",
        description: "A family automates their home with SmartSync, using voice commands to control lighting, HVAC, and entertainment systems. The AI learns their routines, adjusting settings for comfort and efficiency, while smart locks and cameras enhance security.",
        industry: "Residential"
      },
      {
        title: "Elderly Care",
        description: "Motion sensors and voice reminders assist elderly users, monitoring for falls and ensuring medication adherence, with alerts sent to caregivers.",
        industry: "Health Care"
      },
      {
        title: "Industrial Automation",
        description: "A factory integrates SmartSync to connect sensors, machinery, and third-party IoT devices, enabling AI-driven predictive maintenance and real-time process optimization.",
        industry: "Industrial"
      },
      {
        title: "Smart Agriculture",
        description: "A farm uses SmartSync to integrate soil moisture sensors, weather stations, and automated irrigation systems. The AI analyzes real-time weather data and soil conditions to optimize watering schedules, while voice commands allow farmers to check crop status or adjust settings hands-free. Predictive maintenance ensures irrigation pumps operate reliably.",
        industry: "Industrial"
      }
    ],
    testimonials: [
      {
        quote: "The Smart Home Mini Kit transformed our apartment into a truly modern living space. The energy monitoring features alone have saved us thousands in electricity bills.",
        author: "Ravi Menon",
        position: "Homeowner, Bangalore"
      },
      {
        quote: "As an educational tool, this kit is unparalleled. Our students can work with real IoT hardware and understand how different components interact in a complete system.",
        author: "Dr. Priya Venkatesh",
        position: "Professor, Chennai Institute of Technology"
      }
    ],
    faqs: [
      {
        question: "Does the kit require professional installation?",
        answer: "While professional installation is recommended for optimal performance, the kit is designed to be installed by anyone with basic technical skills. We provide comprehensive installation guides and remote support."
      },
      {
        question: "Can the system operate if internet connectivity is lost?",
        answer: "Yes, the local control hub allows for continued operation of essential functions even without internet connectivity. Remote access features would be temporarily unavailable until connectivity is restored."
      },
      {
        question: "How difficult is it to add more devices to the system?",
        answer: "The system is designed for easy expansion. Additional compatible devices can be added through the mobile app or web dashboard with a simple pairing process."
      }
    ]
  },
  "stem-kits": {
  id: "stem-kits",
  title: "Velammal STEM Curriculum – Tarcin Robotic LLP",
  description: "Hands-on STEM program with progressive kits and AI/IoT integration for Grades 3–9, empowering future-ready students.",
  fullDescription: `<p>The curriculum proposed by Tarcin Robotic LLP is a hands-on, progressive STEM learning program tailored for Velammal Group of Schools, spanning Grades 3 to 9. It integrates Robotics, Python Programming, IoT, Web Development, and AI/ML, empowering students with industry-relevant skills in automation, coding, and electronics.</p>`,
  image: book,
  category: "Educational",
  tier: "Standard",
  price: "Starting at ₹3,500 per kit",
  features: [
    "Project-based learning for each grade",
    "Progressive difficulty from basic mechanisms to AI & IoT",
    "Python introduced in Grade 3 and advanced by Grade 9",
    "Integration of electronics, programming, automation, and health safety systems",
    "Emphasis on creativity, problem-solving, and real-world impact"
  ],
  technicalSpecs: {
    kitsAndBuilds: "Grades 3 to 9: From basic mechanical kits and block-based coding to smart automation, wireless robotics, IoT, and AI-enabled full-stack development, each kit progressively builds real-world tech skills year by year.",
    curriculum: "Grade 3 to 9: Basics to AI - simple circuits & Turtle → block coding & sensors → functions & IoT → wireless & Bluetooth → embedded systems → smart home & fire detection → full-stack web & AI.",
    components: "Sensors, actuators, microcontrollers, comm modules, and parts; projects: smart trash can & AI book recommender."

  },
  caseStudies: [
    {
      title: "Smart Trash Can",
      description: "Students built a motion-activated smart trash can using ultrasonic sensors and microcontrollers, combining automation and environmental awareness.",
      industry: "Education"
    },
    {
      title: "AI Book Recommender",
      description: "Grade 9 students implemented a machine learning model using Python and TensorFlow to recommend books based on reading history.",
      industry: "Education"
    }
  ],
  testimonials: [
          {
        quote: "The surveillance robot has significantly enhanced our security operations. The mobility aspect provides coverage that would be impossible with fixed cameras alone.",
        author: "Rajesh Singh",
        position: "Security Director, Industrial Manufacturing Ltd."
      },
      {
        quote: "What impressed us most was the robot's ability to identify unusual activity patterns and alert our security team before incidents escalated.",
        author: "Maya Krishnan",
        position: "Facilities Manager, Chennai Tech Park"
      }
  ],
  faqs: [
    {
      question: "Who is this for?",
      answer: "This program is designed for students from Grade 3 to Grade 9, progressively increasing in complexity with each grade."
    },
    {
      question: "Do students need prior knowledge?",
      answer: "No, the curriculum begins at the basics and builds up gradually to advanced topics like AI and full-stack development."
    },
    {
      question: "What will students learn?",
      answer: "They’ll learn coding, electronics, automation, AI/ML, IoT, and web development through real projects."
    },
    {
      question: "Is this hands-on?",
      answer: "Yes, all modules are project-driven with real hardware kits and development tools."
    }
  ]
},

"surveillance-robot": {
  id: "surveillance-robot",
  title: "Bolt – The Smart Security Dog",
  description: "AI-powered surveillance companion robot with 360° vision and smart intruder detection. Ideal for homes, schools, and industrial spaces.",
  fullDescription: `<p>Bolt is an advanced surveillance companion inspired by the agility and loyalty of a dog. Designed for smart security, Bolt combines real-time monitoring, AI-driven insights, and high mobility in a single, compact robotic unit.</p>
  <p>Whether patrolling a home, office, or school, Bolt ensures safety and awareness 24/7 with its intuitive controls and intelligent features.</p>`,
  image: dog,
  category: "Robotics",
  tier: "Enterprise",
  price: "Contact for pricing and partnerships",
  features: [
    "360° HD panoramic vision with night surveillance",
    "All-terrain 4-wheel mobility system",
    "LIDAR, ultrasonic, and infrared sensor integration",
    "AI-powered object and intruder detection",
    "Real-time communication via Wi-Fi, LTE, and Bluetooth",
    "Voice and app-based control system",
    "Durable and weather-resistant IP67 body"
  ],
  technicalSpecs: {
    modelName: "Dog (Nickname: Bolt)",
    type: "Surveillance & Security Companion",
    mobility: "4-Wheel Drive with All-Terrain Handling",
    speed: "Up to 12 km/h",
    cameraSystem: "360° HD Panoramic Vision + Night Vision",
    sensors: "LIDAR, Ultrasonic, IR, Motion Detection",
    batteryLife: "Up to 8 hours (Swappable Battery Packs)",
    aiCapabilities: "Intruder Detection, Object Recognition",
    communication: "Wi-Fi / LTE / Bluetooth Connectivity",
    controlOptions: "Mobile App, Remote Desktop, Voice Control",
    buildMaterial: "Reinforced Carbon Composite Frame",
    weatherResistance: "IP67 Rated (Dustproof & Waterproof)",
    dimensions: "50 x 30 x 35 cm",
    weight: "12.5 kg"
  },
  caseStudies: [
    {
      title: "School Campus Monitoring",
      description: "Bolt was deployed at a private school to patrol premises after hours. It detected motion near the science block at midnight, triggering a silent alert to the admin. Footage helped identify and prevent unauthorized access.",
      industry: "Education"
    },
    {
      title: "Warehouse Surveillance",
      description: "A logistics company used Bolt for real-time monitoring of high-value inventory zones. Its AI detected abnormal movement patterns and alerted the security desk, averting a potential theft.",
      industry: "Logistics"
    },
    {
      title: "Home Automation Companion",
      description: "Bolt assisted elderly residents by notifying family members when motion was detected near doors, ensuring safety without being intrusive.",
      industry: "Home Automation"
    }
  ],
  testimonials: [
          {
        quote: "The surveillance robot has significantly enhanced our security operations. The mobility aspect provides coverage that would be impossible with fixed cameras alone.",
        author: "Rajesh Singh",
        position: "Security Director, Industrial Manufacturing Ltd."
      },
      {
        quote: "What impressed us most was the robot's ability to identify unusual activity patterns and alert our security team before incidents escalated.",
        author: "Maya Krishnan",
        position: "Facilities Manager, Chennai Tech Park"
      }
  ],
  faqs: [
    {
      question: "Is Bolt suitable for outdoor use?",
      answer: "Yes, Bolt is IP67 rated, meaning it’s resistant to water and dust, making it ideal for outdoor environments."
    },
    {
      question: "Can Bolt be controlled remotely?",
      answer: "Absolutely. Bolt supports mobile app, remote desktop, and voice control options."
    },
    {
      question: "What happens when the battery runs out?",
      answer: "Bolt uses swappable battery packs that can be easily replaced for uninterrupted service."
    },
    {
      question: "Can Bolt integrate with existing security systems?",
      answer: "Yes, it can connect via Wi-Fi or LTE and be integrated with smart home or enterprise security systems."
    },
    {
      question: "Is it suitable for schools and public institutions?",
      answer: "Definitely. Bolt is already in use in educational and industrial environments as a reliable surveillance companion."
    }
  ]
},

  "code-asthram": {
    id: "code-asthram",
    title: "Code Asthram",
    description: "A logic-based, gamified coding education platform aimed at schools and colleges. Focuses on algorithmic thinking, syntax-free learning, and interactive curriculum experiences.",
    fullDescription: `<p>Code Asthram is our flagship educational platform designed to make coding accessible and engaging for students across Tamil Nadu and beyond. The platform uses gamification and interactive elements to teach computational thinking and programming concepts without the initial barrier of syntax.</p>
    <p>Developed in consultation with educators and computer science experts, Code Asthram follows a progressive learning path that builds logical reasoning and problem-solving skills first, then gradually introduces programming languages once core concepts are understood.</p>
    <p>The platform has been successfully implemented in over 50 schools across Tamil Nadu, with measurable improvements in student engagement and performance in STEM subjects.</p>`,
    image: code_asthram,
    category: "Educational",
    tier: "Premium",
    price: "Starting at ₹2,50,000 per year",
    features: [
      "Gamified learning experience",
      "Logic-first approach to coding",
      "Progressive skill development",
      "Teacher dashboard and analytics",
      "Student performance tracking",
      "Customizable curriculum",
      // "Multilingual support (Tamil & English)",
      "Offline functionality for schools with limited connectivity"
    ],
    technicalSpecs: {
      deployment: "Cloud-based with offline caching capability",
      accessibility: "Web-based, compatible with all modern browsers",
      dataSecurity: "End-to-end encryption with student data protection",
      languages: "Bilingual support (Tamil and English)",
      compatibility: "Works on desktops, tablets, and mobile devices",
      reporting: "Comprehensive analytics with export functionality"
    },
    caseStudies: [
      {
        title: "Urban School District Implementation",
        description: "A network of 15 schools in Chennai integrated Code Asthram into their curriculum, resulting in a 27% increase in student participation in STEM subjects and significantly higher test scores in logical reasoning.",
        industry: "Education"
      },
      {
        title: "Rural Education Initiative",
        description: "Code Asthram was deployed in 8 rural schools with limited technological resources, using the offline functionality to provide quality coding education despite connectivity challenges. Student retention improved by 22%.",
        industry: "Education"
      }
    ],
    testimonials: [
      {
        quote: "Code Asthram has transformed our computer science program. Students who previously struggled with traditional programming are now thriving with the gamified approach.",
        author: "Dr. Jayashree Ramesh",
        position: "Principal, Chennai International School"
      },
      {
        quote: "The platform's bilingual support has been crucial for our students. The analytics dashboard helps us identify learning gaps and personalize our teaching approach.",
        author: "Karthik Subramaniam",
        position: "Computer Science Coordinator, Madurai STEM Academy"
      }
    ],
    faqs: [
      {
        question: "How long does it take to implement Code Asthram in a school?",
        answer: "Typical implementation takes 2-4 weeks, including platform setup, teacher training, and curriculum integration. We work closely with schools to ensure a smooth transition."
      },
      {
        question: "Does Code Asthram require high-end computers or internet?",
        answer: "No, Code Asthram is designed to work on standard computers and can function with limited internet connectivity through its offline mode. The platform is optimized for various hardware configurations common in Indian schools."
      },
      {
        question: "What kind of support and training is included?",
        answer: "All Code Asthram implementations include comprehensive teacher training, technical support during school hours, and regular curriculum updates. We also provide ongoing professional development for teachers throughout the academic year."
      }
    ]
  },

 "harvester-agricultural-robot": {
  id: "harvester-agricultural-robot",
  title: "HEMAN – The Next-Gen Humanoid Robot",
  description: "Interactive humanoid robot for education, research, and public engagement. Features voice AI, facial recognition, and programmable movement.",
  fullDescription: `<p>HEMAN is a next-generation humanoid robot developed for education, interaction, and automation. With human-like movement, voice interaction, and AI processing, HEMAN is built to engage users in meaningful ways-be it in classrooms, exhibitions, or R&D environments. It empowers users with real-world robotics and AI experience.</p>`,
  image: head,
  category: "Robotics",
  tier: "Premium",
  price: "Contact for pricing and customization",
  features: [
    "16+ degrees of freedom for realistic human-like motion",
    "HD vision system with facial recognition",
    "Voice interaction via stereo microphones and AI speech recognition",
    "Programmable behavior using Python and block-based coding",
    "Connectivity via Wi-Fi and Bluetooth",
    "Interactive touchscreen interface (optional upgrade)",
    "Durable, child-safe ABS build with soft-edge joints"
  ],
  technicalSpecs: {
    modelName: "HEMAN",
    type: "Humanoid Robot",
    height: "135 cm",
    weight: "35 kg",
    degreesOfFreedom: "16+",
    mobility: "Bipedal Walking, Dance, Sitting, Gestures",
    visionSystem: "HD Camera with Facial Recognition",
    sensors: "IMU, Touch, Infrared, Force Sensors",
    audio: "Stereo Microphones and Speakers",
    aiCapabilities: "Speech Recognition, Object Detection, Behavior Scripting",
    connectivity: "Wi-Fi / Bluetooth",
    controlOptions: "Remote App, Voice Commands, Python API",
    buildMaterial: "ABS Plastic + Reinforced Joints",
    powerSupply: "Rechargeable Li-Ion Battery (2-3 hours)",
    useCases: "STEM Education, Human-Robot Interaction Research, Entertainment"
  },
  caseStudies: [
    {
      title: "STEM Learning in Schools",
      description: "HEMAN was deployed in a STEM-focused institution where it assisted students in learning coding and robotics by acting out the programs written by students, fostering engagement and innovation.",
      industry: "Education"
    },
    {
      title: "Public Interaction Events",
      description: "Used in exhibitions, HEMAN engaged with visitors using pre-programmed scripts, gestures, and facial recognition to demonstrate the future of AI-powered human interaction.",
      industry: "Events & Exhibitions"
    },
    {
      title: "Elder Care Research",
      description: "A university used HEMAN to explore social interaction with elderly patients, conducting experiments on response times and emotional cues.",
      industry: "Healthcare Research"
    }
  ],
  testimonials: [
        {
        quote: "The surveillance robot has significantly enhanced our security operations. The mobility aspect provides coverage that would be impossible with fixed cameras alone.",
        author: "Rajesh Singh",
        position: "Security Director, Industrial Manufacturing Ltd."
      },
      {
        quote: "What impressed us most was the robot's ability to identify unusual activity patterns and alert our security team before incidents escalated.",
        author: "Maya Krishnan",
        position: "Facilities Manager, Chennai Tech Park"
      }
  ],
  faqs: [
    {
      question: "Can HEMAN be programmed by beginners?",
      answer: "Yes, HEMAN supports both block-based and Python programming, making it ideal for all skill levels."
    },
    {
      question: "Is HEMAN safe for children?",
      answer: "Absolutely. It’s built with ABS plastic and rounded joints for safety in educational environments."
    },
    {
      question: "Does HEMAN support AI features?",
      answer: "Yes. It supports facial recognition, speech detection, and programmable behavior logic."
    },
    {
      question: "How is HEMAN powered?",
      answer: "It runs on a rechargeable Li-Ion battery that lasts 2–3 hours depending on usage."
    },
    {
      question: "Can HEMAN be used in live demonstrations?",
      answer: "Yes, it's designed for interaction-heavy environments like expos and stage demos."
    }
  ]
},



// extra contant

  "edubot-teaching-assistant": {
    id: "edubot-teaching-assistant",
    title: "EduBot: AI Teaching Assistant",
    description: "Interactive educational robot designed to support teachers in the classroom with personalized student assistance and basic administrative tasks.",
    fullDescription: `<p>EduBot is our educational robot assistant designed to enhance classroom experiences in Indian schools. It serves as an interactive teaching aide that helps teachers manage classroom activities and provides personalized support to students.</p>
    <p>Developed in consultation with educators across Tamil Nadu, EduBot addresses specific challenges in the Indian educational system such as diverse learning levels, large class sizes, and the need for multilingual support including regional languages.</p>
    <p>The robot combines a friendly, approachable design with sophisticated AI that can assess student progress, adjust difficulty levels, and provide immediate feedback. It's particularly effective for STEM subjects where it can demonstrate concepts through interactive visuals and activities.</p>`,
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
    category: "Educational",
    tier: "Standard",
    price: "Starting at ₹2,95,000",
    features: [
      "Interactive lesson delivery",
      "Personalized learning support",
      "Multilingual capabilities (English, Tamil, Hindi)",
      "Progress tracking and reporting",
      "Quiz and assessment facilitation",
      "Voice and touch interface",
      "Remote management portal for teachers",
      "Content library with NCERT alignment"
    ],
    technicalSpecs: {
      battery: "8-10 hours of continuous use",
      display: "10-inch HD touchscreen",
      audio: "360° microphone array and stereo speakers",
      connectivity: "WiFi with offline capability",
      security: "COPPA compliant, no external data sharing",
      durability: "Child-friendly design with drop resistance"
    },
    caseStudies: [
      {
        title: "Rural School Implementation",
        description: "A rural school with limited teaching resources deployed EduBot in mathematics classes for grades 5-8, resulting in 28% improvement in student engagement and 18% higher test scores.",
        industry: "Education"
      },
      {
        title: "Special Education Support",
        description: "Special education center used EduBot to provide personalized attention to students with learning differences, allowing teachers to better distribute their time across all students.",
        industry: "Education"
      }
    ],
    testimonials: [
      {
        quote: "EduBot has transformed my classroom management. I can now ensure that all students receive attention, even in a class of 40 students.",
        author: "Meena Rajan",
        position: "Science Teacher, Chennai Public School"
      },
      {
        quote: "The multilingual support has been invaluable for our diverse student population. Students can learn in their preferred language while still developing English skills.",
        author: "Dr. Joseph Thomas",
        position: "Principal, Future Ready Academy"
      }
    ],
    faqs: [
      {
        question: "Does EduBot require internet connectivity to function?",
        answer: "While internet connectivity enables all features, EduBot has substantial offline functionality. Core educational content is stored locally, and activity data syncs when connection is available."
      },
      {
        question: "How does EduBot integrate with existing school curriculum?",
        answer: "EduBot comes pre-loaded with content aligned to NCERT guidelines and state board curricula. Teachers can also upload custom content through the management portal."
      },
      {
        question: "What kind of training is provided for teachers?",
        answer: "We provide comprehensive initial training and follow-up sessions for all teachers. Our education specialists help develop implementation strategies specific to each school's needs."
      }
    ]
  },
  "streamline-process-automation": {
    id: "streamline-process-automation",
    title: "StreamLine: Process Automation Suite",
    description: "Comprehensive software solution for automating business processes with visual workflow creation, integration capabilities, and real-time monitoring.",
    fullDescription: `<p>StreamLine is our flagship process automation platform designed specifically for Indian businesses. It enables organizations to automate repetitive tasks, streamline workflows, and integrate disparate systems without extensive programming knowledge.</p>
    <p>The platform features a visual workflow designer that allows users to create automation processes using a drag-and-drop interface. These workflows can range from simple document approvals to complex multi-system business processes that previously required manual intervention.</p>
    <p>StreamLine has been successfully implemented across various industries including manufacturing, financial services, healthcare, and government agencies, consistently delivering significant efficiency improvements and cost savings.</p>`,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80",
    category: "Software",
    tier: "Enterprise",
    price: "Starting at ₹6,50,000 per year",
    features: [
      "Visual workflow designer",
      "Ready-to-use activity templates",
      "System integration capabilities",
      "Process monitoring dashboards",
      "Exception handling framework",
      "Role-based access control",
      "Audit logging and compliance reporting",
      "Mobile approval applications"
    ],
    technicalSpecs: {
      deployment: "On-premises or cloud-based (AWS/Azure)",
      scalability: "Handles 100,000+ transactions daily",
      integrations: "REST API, SOAP, Database connectors, SAP, MS Office",
      security: "Role-based access, encryption, audit trails",
      compliance: "GDPR, ISO 27001, SOC 2 compatibility",
      languages: "Multi-language support including Indian languages"
    },
    caseStudies: [
      {
        title: "Banking Operation Transformation",
        description: "A mid-sized bank automated 35 back-office processes, reducing processing time by 65% and eliminating over 12,000 hours of manual work annually.",
        industry: "Financial Services"
      },
      {
        title: "Manufacturing Supply Chain Optimization",
        description: "Automotive parts manufacturer automated vendor management and inventory processes, reducing order processing time from 2 days to 4 hours and improving accuracy by 98%.",
        industry: "Manufacturing"
      }
    ],
    testimonials: [
      {
        quote: "StreamLine has enabled us to automate complex compliance processes that previously required significant manual effort. Our team can now focus on value-added activities.",
        author: "Vikram Mehta",
        position: "CIO, United Financial Services"
      },
      {
        quote: "The visual workflow designer makes it possible for business users to create and modify automations without IT involvement. This has dramatically improved our operational agility.",
        author: "Priya Sharma",
        position: "Operations Director, Chennai Manufacturing"
      }
    ],
    faqs: [
      {
        question: "Does StreamLine require programming knowledge to use?",
        answer: "No, the visual workflow designer and pre-built templates allow business users without programming knowledge to create and maintain automation workflows. For more complex integrations, technical skills may be beneficial but are not required."
      },
      {
        question: "How long does it take to implement StreamLine?",
        answer: "Initial implementation typically takes 4-8 weeks, depending on complexity and number of processes being automated. Simple automation workflows can be created and deployed within days once the platform is established."
      },
      {
        question: "Can StreamLine integrate with our legacy systems?",
        answer: "Yes, StreamLine is designed to integrate with a wide range of systems, including legacy applications. We provide custom connectors for systems without standard APIs, ensuring comprehensive integration capabilities."
      }
    ]
  }
};