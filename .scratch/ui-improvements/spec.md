# UI Improvements — Portfolio

## Goal
Overhaul the portfolio UI: delete unused components, polish existing sections, add new features (Contact form, Testimonials, Blog), and do a final accessibility/responsiveness pass.

## Tickets

| # | Slug | Status | Description |
|---|------|--------|-------------|
| 01 | delete-unused | done | Delete LeetCode.jsx, CyberSphere.jsx, remove stale data from data.js |
| 02 | polish-existing | done | Unify spacing, animations, responsive breakpoints across all existing components |
| 03 | add-placeholder-data | done | Add testimonials + blog placeholder entries to data.js |
| 04 | contact-form | done | Build mailto-based contact form component |
| 05 | testimonials | done | Build testimonials section component |
| 06 | blog | done | Build blog section component |
| 07 | integrate-sections | done | Wire new components into App.jsx + NavBar |
| 08 | final-polish | done | Accessibility, keyboard nav, scroll offsets, lint + build verification |

## Execution Order
Sequential: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08. Each ticket runs in a fresh session.
