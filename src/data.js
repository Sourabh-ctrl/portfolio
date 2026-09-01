
// Central content configuration for the portfolio.
// Update text, links, and imported assets here.
// Components should consume content from this file instead of hardcoding values.

import logo from './assets/logo.jpeg'
import project1 from './assets/project1.png'
import project3 from './assets/project3.png'
import smtpMailersLogo from './assets/smtp-mailers-logo.png'
import iqpathsLogo from './assets/iqpaths-logo.png'
import iqpathsLogoWhite from './assets/iqpaths-logo-white.png'

const data = {
  identity: {
    name: 'Sourabh Lathi',
    firstName: 'Sourabh',
    role: 'Full-Stack Developer & Software Engineer',
    location: 'Indore, India',
    email: 'lathisaurav@gmail.com',
    isOpenToWork: true,
    logo,
  },

  hero: {
    greeting: "Hi, I'm",
    name: 'Sourabh Lathi',
    title: 'Software Engineer | Full Stack Developer',
    description:
      "I'm Sourabh Lathi, a software engineer and full-stack developer specializing in building scalable web applications. I craft responsive, user-centric web applications with modern technologies like React, Node.js, and TypeScript. Let's bring your ideas to life.",
    portrait: logo,

    // Typewriter lines toggled on repeat by the Intro section.
    taglines: [
      'Full-Stack Web Architect',
      'React & Node.js Engineer',
      'Open Source Contributor',
    ],
  },

  about: {
    heading: 'about',

    blurb:
      'Software Engineer with experience building scalable full-stack applications, designing responsive user interfaces, and developing solutions for real-world problems.',

    paragraphs: [
      'I specialize in modern web development with a strong focus on frontend architecture, user experience, and scalable application design. I enjoy building clean component systems, integrating APIs, managing application state, and creating responsive interfaces that deliver a seamless user experience.',

      'Through my internship and personal projects, I have worked on production-oriented platforms including course-selling applications, AI-powered tools, real-time chat systems, and document management platforms. I am passionate about writing maintainable code, solving challenging problems, and continuously improving my skills as a software engineer.',
    ],

    skills: [
      {
        category: 'Programming Languages',
        items: [
          'C',
          'C++',
          'JavaScript (ES6+)',
          'TypeScript',
          'HTML5',
          'CSS3',
        ],
      },

      {
        category: 'Frontend Development',
        items: [
          'React.js',
          'Redux Toolkit',
          'Context API',
          'React Router',
          'Tailwind CSS',
        ],
      },

      {
        category: 'Backend Development',
        items: [
          'Node.js',
          'Express.js',
          'REST APIs',
          'Socket.io',
          'JWT Authentication',
          'bcryptjs',
        ],
      },

      {
        category: 'Databases',
        items: [
          'MongoDB',
          'Mongoose',
          'MySQL',
        ],
      },

      {
        category: 'Tools & Technologies',
        items: [
          'Git',
          'GitHub',
          'Docker',
          'Postman',
          'Cloudinary',
          'Multer',
          'Razorpay API',
        ],
      },
    ],
  },

  jobs: [
    {
      role: 'Software Development Engineer Intern',
      org: 'IQPaths Technologies',
      period: 'Feb 2025 – May 2025',
      location: 'Indore, India',
      mode: 'On-site',
      logo: iqpathsLogo,
      logoWhite: iqpathsLogoWhite,
      logoUrl: 'https://www.google.com/s2/favicons?domain=iqpaths.com&sz=32',
      url: 'https://www.iqpaths.com/',

      tech: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Redux', 'REST APIs', 'Axios'],

      highlights: [
        'Devised the frontend architecture for a course-selling platform utilizing React.js, handling 1,000+ users and reducing page load times by 25% through optimized component rendering.',

        'Integrated dynamic content via 15+ REST APIs using Axios, ensuring seamless data consistency and decreasing data fetch latency by 20%.',

        'Engineered multiple responsive pages for an AI-powered resume builder utilizing TypeScript and Redux, scaling the platform to support 500+ concurrent users with centralized global state management.',

        'Constructed highly modular user interfaces utilizing Tailwind CSS, increasing component reusability and reducing frontend development time by 30% for subsequent feature rollouts.',
      ],
    },

    {
      role: 'Full Stack Developer Intern',
      org: 'SMTP Mailers',
      period: 'Jun 2025 - July 2025',
      location: 'Indore, India',
      mode: 'On-site',
      logo: smtpMailersLogo,
      logoUrl: 'https://www.google.com/s2/favicons?domain=smtpmailers.com&sz=32',
      url: 'https://smtpmailers.com/',

      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Node.js'],

      highlights: [
        'Secure Access Control: Engineered a robust authentication system with backend API integration and session persistence to ensure secure, authorized-only access.',
        'Data Visualization Dashboard: Developed an interactive admin interface featuring dynamic charts and tables to transform complex datasets into clear, actionable insights.',
        'Full-Lifecycle Development: Managed the project from architectural planning and repository structuring to final debugging, rigorous testing, and documentation.',
      ],
    },

    {
      role: 'Frontend Developer Intern',
      org: 'Track My Fleetix',
      period: 'Apr 2026 - May 2026',
      location: 'Indore, India',
      mode: 'Remote',
      url: 'https://www.trackmyfleetix.com/',
      logoUrl: 'https://www.google.com/s2/favicons?domain=trackmyfleetix.com&sz=32',

      tech: ['React', 'Redux', 'React Router', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Git'],

      highlights: [
        'Dashboard Development: Developed and enhanced responsive dashboards for fleet and logistics management, presenting key operational data in a clear and user-friendly interface.',
        'FASTag Management: Built frontend interfaces for FASTag-related management workflows, helping users efficiently view, manage, and track vehicle and transaction-related information.',
        'Multiple Frontend Pages: Developed and maintained multiple responsive web pages and UI components across the platform, ensuring consistent design and smooth user experience.',
        'Frontend Optimization: Improved application usability by creating reusable components, handling dynamic data, and implementing responsive layouts for different screen sizes.',
      ],
    },
  ],

  projects: [
    {
      name: 'Quick Chat App',

      description:
        'A full-stack real-time chat application built with React, Node.js, Socket.io, and MongoDB. The platform supports real-time messaging, secure JWT authentication, media sharing, and concurrent user connections.',

      image: project1,

      tech: [
        'React',
        'Node.js',
        'Express.js',
        'Socket.io',
        'MongoDB',
        'JWT',
        'Cloudinary',
      ],

      // Replace these with the actual project deployment and repository URLs.
      liveUrl: 'https://quick-chat-teal.vercel.app/',
      repoUrl: 'https://github.com/Sourabh-ctrl',
    },

    {
      name: 'The Paypr Story',

      description:
        'A centralized campus document management platform designed to simplify document submission and printing workflows. The system uses token-based verification and automated payment processing to reduce manual queues and improve operational efficiency.',

      image: project3,

      tech: [
        'React',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Razorpay',
        'Multer',
      ],

      // Replace these with the actual project deployment and repository URLs.
      liveUrl: 'https://github.com/Sourabh-ctrl',
      repoUrl: 'https://github.com/Sourabh-ctrl',
    },
  ],

  testimonials: [
    {
      name: 'Hricha Sharma',
      quote:
        'Working with Sourabh was a seamless experience. His professionalism, eye for detail, and commitment to delivering quality work truly set him apart.',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HrichaSharma&gender=female',
    },
    {
      name: 'Vanisha Arora',
      quote:
        'Sourabh consistently delivered top-notch work within deadlines and showed genuine dedication to every aspect of the project. Highly recommended!',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=VanishaArora&gender=female',
    },
    {
      name: 'Yash Ladha',
      quote:
        'Sourabh combines deep technical expertise with outstanding teamwork. He is always eager to collaborate and tackle challenges head-on.',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=YashLadha&gender=male',
    },
    {
      name: 'Sanket Gupta',
      quote:
        'Sourabh has a sharp eye for design and a knack for turning ideas into functional, polished products. His attention to detail really stands out.',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=SanketGupta&gender=male',
    },
    {
      name: 'Vishesh Verma',
      quote:
        'Sourabh is a skilled and passionate developer with a strong problem-solving mindset. Reliable, creative, and always focused on building high-quality products.',
      avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=VisheshVerma&gender=male',
    },
  ],

  blog: [
    {
      title: 'Building Real-Time Chat with Socket.io',
      date: '2026-08-15',
      description:
        'A practical deep-dive into architecting a scalable real-time chat application with Socket.io, covering rooms, typing indicators, and JWT authentication.',
      tags: ['React', 'Node.js', 'WebSocket'],
      readTime: '7 min read',
      url: '#',
    },
    {
      title: '5 React Performance Patterns I Swear By',
      date: '2026-07-28',
      description:
        'From memoization to code splitting, here are the React performance techniques that cut our page load times by 25% and keep the UI buttery smooth.',
      tags: ['React', 'Performance'],
      readTime: '5 min read',
      url: '#',
    },
    {
      title: 'Scaling Node.js APIs for Concurrent Users',
      date: '2026-07-10',
      description:
        'Lessons from supporting 500+ concurrent users: connection pooling, caching strategies, and the database indexes that made the difference.',
      tags: ['Node.js', 'MongoDB', 'System Design'],
      readTime: '9 min read',
      url: '#',
    },
    {
      title: 'Writing Idiomatic TypeScript: Types That Fight For You',
      date: '2026-06-22',
      description:
        'How to leverage TypeScript\'s type system to eliminate entire classes of bugs before they reach production, with real-world examples.',
      tags: ['TypeScript', 'JavaScript'],
      readTime: '6 min read',
      url: '#',
    },
  ],

  github: {
    username: 'Sourabh-ctrl',
    profileUrl: 'https://github.com/Sourabh-ctrl',
    apiUrl: 'https://github-contributions-api.jogruber.de/v4/Sourabh-ctrl?y=last',
  },

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

  wakatime: {
    username: '67ecb5b0-b4d6-4900-950e-62baa85753f5',
    profileUrl: 'https://wakatime.com/@67ecb5b0-b4d6-4900-950e-62baa85753f5',
    editor: 'VS Code',
    project: 'portfolio',
    todayWorked: '2 hrs 20 mins',
    yesterdayWorked: '56 mins',

    // Embeddable JSON widget URLs, created at https://wakatime.com/share/embed (paste the .json link):
    // 1. Create a "Coding Activity" (or totals) widget, pick the range (Today / All Time), choose JSON format.
    // 2. Copy the URL like https://wakatime.com/share/@<username>/<uuid>.json into one field below.
    todayEmbedUrl: '', // widget with range "Today"
    totalEmbedUrl: '', // widget with range "All Time"

    // How often (ms) the live stats refresh.
    refreshMs: 5 * 60 * 1000,
  },

  attribution: {
    label: 'Design inspired by Gazi Jarin',
    url: 'https://github.com/gazijarin/Gazi-V2',
  },

  meta: {
    title: 'Sourabh Lathi | Software Engineer',

    description:
      'Portfolio of Sourabh Lathi, a Software Engineer and Full-Stack Developer focused on building scalable web applications using React, Node.js, MongoDB, and modern web technologies.',
  },
}

export default data
