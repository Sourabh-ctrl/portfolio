// The entire site reads from this file. Replace the content below with your
// own — the components never hardcode copy, so a text/link/image change is
// always a data.js edit.
//
// Images live in `src/assets/` and are imported here (not referenced by path)
// so Vite rewrites them to correct hashed URLs under the `/portfolio/` base.

import portrait from './assets/portrait.png'
import project1 from './assets/project1.png'
import project3 from './assets/project3.png'

const data = {
  identity: {
    name: 'Sourabh Lathi',
    firstName: 'Sourabh',
    initial: 'S',
    role: 'Software Development Engineer',
    location: 'Indore, Madhya Pradesh, India',
    email: 'lathisaurav@gmail.com',
  },

  hero: {
    greeting: 'Hi, my name is',
    // Drop your own photo at `src/assets/portrait.png` (or update the import
    // above). ASCII conversion is lossy; high-contrast, head-and-shoulders
    // portraits work best.
    portrait,
    // Typewriter lines toggled on repeat by the Intro section.
    taglines: [
      'I build full-stack web applications with React and Node.js.',
      'I turn complex problems into fast, modular, scalable UIs.',
    ],
  },

  about: {
    heading: 'About',
    blurb:
      'Computer Science undergraduate at Medi-caps University, building full-stack web applications with React, Node.js, and MongoDB.',
    paragraphs: [
      'I focus on frontend architecture and user experience — I designed the frontend for a course-selling platform that now serves 1,000+ users, and engineered multiple responsive pages for an AI-powered resume builder supporting 500+ concurrent users.',
      'Beyond the web, I enjoy competitive programming on LeetCode, building real-time applications, and designing platforms that remove friction for everyday users — like a campus document management system that replaced manual print queues.',
    ],
    skills: [
      {
        category: 'Languages',
        items: ['C', 'C++', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
      },
      {
        category: 'Frameworks & Libraries',
        items: [
          'React.js',
          'Redux Toolkit',
          'Context API',
          'React Router',
          'Node.js',
          'Express.js',
          'Tailwind CSS',
        ],
      },
      {
        category: 'Web Technologies & APIs',
        items: [
          'RESTful APIs',
          'Socket.io',
          'JWT',
          'bcryptjs',
          'Cloudinary',
          'Multer',
          'Razorpay API',
        ],
      },
      {
        category: 'Databases & ORMs',
        items: ['MongoDB (Mongoose)', 'MySQL'],
      },
      {
        category: 'Tools & Infrastructure',
        items: ['Git (GitHub)', 'Postman', 'Docker'],
      },
    ],
  },

  jobs: [
    {
      role: 'Software Development Engineer Intern',
      org: 'IQPaths Technologies',
      period: 'Feb 2025 – May 2025',
      summary:
        'Contributed to a course-selling platform and an AI-powered resume builder, working across frontend architecture, API integration, and reusable component systems.',
      highlights: [
        'Devised the frontend architecture for a course-selling platform, handling 1,000+ users and reducing page load times by 25% through optimized component rendering.',
        'Integrated dynamic content via 15+ REST APIs using Axios, ensuring seamless data consistency and decreasing data fetch latency by 20%.',
        'Engineered responsive pages for an AI-powered resume builder using TypeScript and Redux, scaling the platform to 500+ concurrent users with centralized global state management.',
        'Constructed modular UIs with Tailwind CSS, increasing component reusability and reducing frontend development time by 30% for subsequent feature rollouts.',
      ],
    },
  ],

  projects: [
    {
      name: 'Quick Chat App',
      description:
        'A full-stack real-time chat application handling 100+ concurrent connections with sub-50ms message latency, secure JWT authentication, and media uploads.',
      image: project1,
      tech: ['ReactJS', 'Node.js', 'Socket.io', 'MongoDB', 'JWT', 'Cloudinary'],
      liveUrl: 'https://github.com/Sourabh-ctrl',
      repoUrl: 'https://github.com/Sourabh-ctrl',
    },
    {
      name: 'The Paypr Story',
      description:
        'Final-year project: a centralized document management platform serving 5,000+ campus students, eliminating manual print queues via a token-based verification system with automated Razorpay payments.',
      image: project3,
      tech: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB', 'Razorpay', 'Multer'],
      liveUrl: 'https://github.com/Sourabh-ctrl',
      repoUrl: 'https://github.com/Sourabh-ctrl',
    },
  ],

  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/Sourabh-ctrl',
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/sourabh-lathi-2ba950245',
    },
    {
      label: 'LeetCode',
      url: 'https://leetcode.com/u/sourabhlathi',
    },
    {
      label: 'Email',
      url: 'mailto:lathisaurav@gmail.com',
    },
  ],

  attribution: {
    label: 'Design inspired by gazijarin.com',
    url: 'https://github.com/gazijarin/Gazi-V2',
  },

  meta: {
    title: 'Sourabh Lathi - Software Development Engineer',
    description: 'Sourabh Lathi - Software Development Engineer',
  },
}

export default data