
// Central content configuration for the portfolio.
// Update text, links, and imported assets here.
// Components should consume content from this file instead of hardcoding values.

import portrait from './assets/portrait.png'
import project1 from './assets/project1.png'
import project3 from './assets/project3.png'

const data = {
  identity: {
    name: 'Sourabh Lathi',
    firstName: 'Sourabh',
    role: 'Software Engineer | Full-Stack Developer',
    location: 'Indore, Madhya Pradesh, India',
    email: 'lathisaurav@gmail.com',
  },

  hero: {
    greeting: 'Hi, my name is',

    description:
      'Software Engineer and Full-Stack Developer focused on building scalable, high-performance web applications using React, Node.js, and modern web technologies.',

    portrait,

    // Typewriter lines toggled on repeat by the Intro section.
    taglines: [
      'I build scalable full-stack applications with React and Node.js.',
      'I turn complex problems into clean, fast, and intuitive user experiences.',
      'I build products that solve real-world problems.',
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

      summary:
        'Contributed to the development of production-oriented web applications, working across frontend architecture, API integration, state management, and reusable component systems.',

      highlights: [
        'Designed and implemented frontend architecture for a course-selling platform serving 1,000+ users, improving component rendering and reducing page load times by approximately 25%.',

        'Integrated and managed dynamic application data through 15+ REST APIs using Axios, improving data consistency and reducing API response handling latency.',

        'Developed responsive interfaces for an AI-powered resume builder using TypeScript and Redux, supporting centralized state management and scalable application workflows for 500+ concurrent users.',

        'Built modular and reusable UI components using React and Tailwind CSS, improving development efficiency and reducing implementation time for subsequent features.',
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
      liveUrl: 'https://github.com/Sourabh-ctrl',
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

  leetcodeDaily: {
    heading: 'daily grind',
    profileUrl: 'https://leetcode.com/u/sourabhlathi',

    description:
      'I solve the LeetCode daily question and document my approach, keeping my problem-solving skills sharp. Each entry links to my solution on LeetCode.',

    // Add your solved daily questions here.
    // `date` can be any string (e.g. '2026-08-30'), `difficulty` is one of
    // Easy / Medium / Hard, and `solutionUrl` can point to your LeetCode
    // submission or a repo/gist with the code.
    problems: [
      {
        date: '2026-08-29',
        title: 'Two Sum',
        difficulty: 'Easy',
        topics: ['Array', 'Hash Map'],
        solutionUrl: 'https://leetcode.com/problems/two-sum/',
      },
      {
        date: '2026-08-28',
        title: 'Contains Duplicate',
        difficulty: 'Easy',
        topics: ['Array', 'Hash Set'],
        solutionUrl: 'https://leetcode.com/problems/contains-duplicate/',
      },
      {
        date: '2026-08-27',
        title: 'Valid Anagram',
        difficulty: 'Easy',
        topics: ['String', 'Hash Map'],
        solutionUrl: 'https://leetcode.com/problems/valid-anagram/',
      },
      {
        date: '2026-08-26',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        topics: ['Array', 'Sliding Window'],
        solutionUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      },
    ],
  },

  terminalTyper: {
    // Code snippets typed in the terminal game, ordered short -> long.
    // The game draws from an ever-later window as time passes.
    snippets: [
      'npm install',
      'git pull',
      'npm run dev',
      'yarn add react',
      'git commit -m "fix"',
      'await fetch()',
      'console.log(x)',
      'export default App',
      'const ok = true',
      'npm run build',
      'git push origin main',
      'app.listen(3000)',
      'await db.connect()',
      'const data = await ajax()',
      'setInterval(loop, 16)',
      'import { useState } from "react"',
      'return response.json()',
      'if (err) console.error(err)',
      'socket.emit("typing", msg)',
      'const user = await User.findById(id)',
      'fetch("/api/users").then(r => r.json())',
      'useEffect(() => { loop() }, [])',
      'password = await bcrypt.hash(pw, 10)',
      'router.post("/auth", authController.login)',
      'socket.on("message", (msg) => broadcast(msg))',
      'export default function App() { return null }',
    ],
  },

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
    todayWorked: '3 hrs 40 mins',
    yesterdayWorked: '4 hrs 15 mins',

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
