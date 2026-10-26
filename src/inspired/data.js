
// Central content configuration for the portfolio.
// Update text, links, and imported assets here.
// Components should consume content from this file instead of hardcoding values.

import quickChat from './assets/quick-chat.png'
import tubeRoast from './assets/tube-roast.webp'

const data = {
  identity: {
    name: 'Sourabh Lathi',
    firstName: 'Sourabh',
    role: 'Full-Stack Developer',
    location: 'Indore, India',
    email: 'lathisaurav@gmail.com',
    isOpenToWork: true,
  },

  hero: {
    description:
      'I build web products end to end — React in the browser, Node behind it, and a stubborn focus on the parts people actually feel.',
  },

  about: {
    heading: 'about',

    blurb:
      'Software engineer in Indore, building full-stack products with React, TypeScript and Node. I care about interfaces that feel obvious and systems that stay boring under load.',

    paragraphs: [
      'Most of what I know came from shipping with three teams — course platforms, admin dashboards, fleet tooling — then fixing things after real people used them. I am happiest at the seam between the interface and the API, and I am slowly working my way into distributed systems.',
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

    // Advanced topics currently being explored (shown as a distinct strip).
    currentlyLearning: [
      'Kafka',
      'Kubernetes',
      'System Design',
      'Docker / K8s',
      'Message Queues',
    ],
  },

  jobs: [
    {
      role: 'Software Development Engineer Intern',
      org: 'IQPaths Technologies',
      period: 'Feb 2025 – May 2025',
      location: 'Indore, India',
      mode: 'On-site',
      logoUrl: 'https://www.google.com/s2/favicons?domain=iqpaths.com&sz=32',
      url: 'https://www.iqpaths.com/',

      summary: 'Frontend architecture for a course platform and an AI résumé builder.',

      tech: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Redux', 'REST APIs', 'Axios'],

      highlights: [
        'Built the frontend architecture for a course-selling platform used by 1,000+ people, cutting page-load time by 25% through smarter component rendering.',

        'Wired 15+ REST endpoints with Axios, keeping data consistent across views and shaving 20% off fetch latency.',

        'Shipped responsive pages for an AI-powered résumé builder with TypeScript and Redux, supporting 500+ concurrent users from one shared state layer.',

        'Turned repeated UI into reusable Tailwind components, cutting frontend development time by 30% on later rollouts.',
      ],
    },

    {
      role: 'Full Stack Developer Intern',
      org: 'SMTP Mailers',
      period: 'Jun 2025 – Jul 2025',
      location: 'Indore, India',
      mode: 'On-site',
      logoUrl: 'https://www.google.com/s2/favicons?domain=smtpmailers.com&sz=32',
      url: 'https://smtpmailers.com/',

      summary: 'Auth, admin dashboards and a build shipped end to end.',

      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Node.js'],

      highlights: [
        'Built authentication with backend API integration and session persistence, so only authorized users get through.',
        'Designed an admin dashboard with live charts and tables that turns dense data into something readable at a glance.',
        'Took the project from architecture and repo setup through debugging, testing and documentation.',
      ],
    },

    {
      role: 'Frontend Developer Intern',
      org: 'Track My Fleetix',
      period: 'Apr 2026 – May 2026',
      location: 'Indore, India',
      mode: 'Remote',
      url: 'https://www.trackmyfleetix.com/',
      logoUrl: 'https://www.google.com/s2/favicons?domain=trackmyfleetix.com&sz=32',

      summary: 'Fleet dashboards and FASTag workflows for a logistics platform.',

      tech: ['React', 'Redux', 'React Router', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Git'],

      highlights: [
        'Built responsive fleet and logistics dashboards that surface the numbers operators check every day.',
        'Shipped FASTag workflows for viewing, managing and tracking vehicles and transactions.',
        'Maintained shared UI across the platform, keeping pages consistent as the product grew.',
        'Cut repeated work with reusable components, dynamic data handling and layouts that hold up on every screen size.',
      ],
    },
  ],

  projects: [
    {
      name: 'Quick Chat',

      // The project the hero story puts front and centre.
      featured: true,

      description:
        'A MERN chat application with real-time messaging over Socket.io, JWT authentication, image sharing through Cloudinary, and conversations that persist in MongoDB.',

      image: quickChat,
      imageWidth: 1440,
      imageHeight: 900,

      // Short labels used by the filter row on the work section.
      tags: ['Full-stack', 'Real-time'],

      status: 'live',
      liveUrl: 'https://quick-chat-teal.vercel.app/',
      repoUrl: 'https://github.com/Sourabh-ctrl/Quick-Chat',
    },

    {
      name: 'Tube Roast',

      description:
        'Signs in with Google, reads your own YouTube data with your permission, and generates a structured roast report from it — with live progress stages, report history, and strict per-user ownership checks.',

      image: tubeRoast,
      imageWidth: 1440,
      imageHeight: 1080,

      tags: ['Full-stack', 'AI'],

      status: 'live',
      liveUrl: 'https://tube-roast.vercel.app/',
      repoUrl: 'https://github.com/Sourabh-ctrl/youtube-roast',
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
    repositoriesUrl: 'https://github.com/Sourabh-ctrl?tab=repositories',
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
      label: 'X',
      url: 'https://x.com/lathisaurav',
    },

    {
      label: 'Email',
      url: 'mailto:lathisaurav@gmail.com',
    },
  ],

  wakatime: {
    username: '67ecb5b0-b4d6-4900-950e-62baa85753f5',
    profileUrl: 'https://wakatime.com/@67ecb5b0-b4d6-4900-950e-62baa85753f5',
    refreshMs: 5 * 60 * 1000,
  },

  meta: {
    title: 'Sourabh Lathi | Software Engineer',

    description:
      'Portfolio of Sourabh Lathi, a Software Engineer and Full-Stack Developer focused on building scalable web applications using React, Node.js, MongoDB, and modern web technologies.',
  },
}

export default data
