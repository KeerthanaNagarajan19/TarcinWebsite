
export const MOCK_DATA: Record<string, any> = {
    '/api/cms/events': [
        {
            _id: '1',
            title: 'Global Deep-Tech Summit 2026',
            date: new Date(2026, 4, 15).toISOString(),
            location: 'Tarcin Innovation Center, Madurai',
            description: 'A gathering of the world\'s leading minds in robotics and AI. Join us for a day of futuristic demonstrations and engineering breakthroughs.',
            image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80&w=800',
            category: 'Conference',
            isUpcoming: true
        },
        {
            _id: '2',
            title: 'IoT Edge Workshop',
            date: new Date(2026, 3, 22).toISOString(),
            location: 'Virtual / Tamil Nadu Hub',
            description: 'Hands-on session on building low-latency IoT networks for industrial automation.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
            category: 'Workshop',
            isUpcoming: true
        },
        {
            _id: '3',
            title: 'Advanced ROS Masterclass',
            date: new Date(2025, 0, 10).toISOString(),
            location: 'TVS Engineering College',
            description: 'Hands-on training session on Robot Operating System (ROS) fundamentals and swarming algorithms. Over 50+ students built functional mobile robots.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
            category: 'Workshop',
            isUpcoming: false
        }
    ],
    '/api/cms/community-stories': [
        {
            id: 's1',
            name: 'Anirudh Raghavan',
            role: 'Hardware Engineer',
            institution: 'Madurai Institute of Tech',
            story: 'Tarcin\'s S2P program completely changed my perspective on robotics. I went from reading textbooks to building a functional autonomous drone in 3 months.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
            approved: true,
            submissionDate: new Date(2025, 11, 10).toISOString()
        }
    ],
    '/api/cms/courses': [
        {
            _id: 'c1',
            title: 'Advanced Robotics and Kinematics',
            category: 'Robotics',
            rating: 4.8,
            description: 'Deep dive into robotic arm movement, inverse kinematics, and real-time control systems.',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800'
        },
        {
            _id: 'c2',
            title: 'Industrial IoT & Edge Computing',
            category: 'IoT',
            rating: 5.0,
            description: 'Learn how to deploy scalable industrial networks and handle gateway communication protocols.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
        }
    ],
    '/api/gallery': {
        data: [
            {
                _id: 'g1',
                title: 'Deep-Tech Workshop at TVS School',
                description: 'Introducing 600+ students to the world of robotics and modular sensors. This session covered autonomous navigation and sensor fusion.',
                category: 'school',
                images: [
                    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1524178232363-1fb28f74b573?auto=format&fit=crop&q=80&w=800'
                ],
                createdAt: new Date(2026, 1, 10).toISOString()
            },
            {
                _id: 'g2',
                title: 'Office Collaboration Session',
                description: 'Internal brain-storming on the new IoT gateway architecture and hardware-level security.',
                category: 'office',
                images: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800'
                ],
                createdAt: new Date(2026, 0, 15).toISOString()
            },
            {
                _id: 'g3',
                title: 'Robotics Demo at Madurai College',
                description: 'Live demonstration of modular robots and swarming behavior to the computer science department.',
                category: 'college',
                images: [
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800'
                ],
                createdAt: new Date(2026, 1, 5).toISOString()
            }
        ]
    },
    '/api/cms/careers': [
        {
            id: 'job1',
            title: 'Robotics Control Systems Engineer',
            department: 'Engineering',
            location: 'Madurai (On-site)',
            type: 'Full-time',
            description: 'We are looking for an expert in ROS and motion control.'
        }
    ],
    '/api/contact': {
        success: true,
        message: 'Mock: Message received successfully!'
    },
    '/api/cms/blog': [
        {
            id: 'b1',
            title: 'The Future of Deep-Tech in Tamil Nadu',
            author: 'Founder, Tarcin Robotic',
            date: new Date(2026, 1, 20).toISOString(),
            excerpt: 'Madurai is becoming the next hardware hub...',
            slug: 'future-of-deep-tech-tn'
        }
    ]
};

export const resolveMockRequest = (url: string) => {
    const key = Object.keys(MOCK_DATA).find(k => url.includes(k));
    if (key) {
        console.log(`[Mock Server] Intercepted: ${url}`);
        return MOCK_DATA[key];
    }
    return null;
};
