# Ticket 01 — Delete unused components + clean data

Status: ready-for-agent
Blocked by: none

## Goal
Remove dead code: two unmounted components and their associated data entries.

## Files
- `src/components/LeetCode.jsx` — DELETE file
- `src/components/CyberSphere.jsx` — DELETE file
- `src/data.js` — Remove `leetcodeDaily` object (lines 204-245) and `terminalTyper` object (lines 247-278)

## Spec
1. Delete `src/components/LeetCode.jsx`
2. Delete `src/components/CyberSphere.jsx`
3. In `src/data.js`, remove the `leetcodeDaily` and `terminalTyper` keys entirely
4. Search codebase for any imports of `LeetCode` or `CyberSphere` — confirm zero references remain
5. Run `npm run lint` — confirm zero errors

## Acceptance Criteria
- [ ] Both component files deleted
- [ ] `data.js` no longer contains `leetcodeDaily` or `terminalTyper`
- [ ] No file in `src/` imports either deleted component
- [ ] `npm run lint` passes with 0 errors
