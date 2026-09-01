# Ticket 03 — Add placeholder data to data.js

Status: needs-triage
Blocked by: 01

## Goal
Populate `data.js` with realistic placeholder content for the new Testimonials and Blog sections.

## Files
- `src/data.js`

## Spec

### Testimonials Data
Add a `testimonials` array with 4 entries. Each entry:
```js
{
  name: string,       // e.g. "Priya Sharma"
  role: string,       // e.g. "Senior Frontend Engineer"
  company: string,    // e.g. "TechCorp India"
  quote: string,      // 1-2 sentence recommendation (realistic, specific)
  avatarUrl: string,  // Use `https://api.dicebear.com/7.x/avataaars/svg?seed=<name>` for placeholder avatars
}
```

Use diverse names, roles (frontend lead, backend engineer, product manager, internship mentor), and companies. Quotes should mention specific skills (React, Node.js, problem-solving, etc.).

### Blog Data
Add a `blog` array with 4 entries. Each entry:
```js
{
  title: string,      // e.g. "Building Real-Time Chat with Socket.io"
  date: string,       // e.g. "2026-08-15"
  description: string, // 1-2 sentence summary
  tags: string[],     // e.g. ["React", "Node.js", "WebSocket"]
  readTime: string,   // e.g. "5 min read"
  url: string,        // Use "#" as placeholder URL
}
```

Topics: React patterns, Node.js performance, TypeScript tips, system design. Titles should sound like real blog posts.

### Contact Data
Add a `contact` object:
```js
contact: {
  heading: 'Get In Touch',
  description: "I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
}
```

## Acceptance Criteria
- [ ] `data.testimonials` array exists with 4 entries
- [ ] `data.blog` array exists with 4 entries
- [ ] `data.contact` object exists with heading + description
- [ ] All entries have realistic, diverse placeholder content
- [ ] `npm run lint` passes
