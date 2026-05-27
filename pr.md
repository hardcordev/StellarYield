# PR Description

This PR implements fixes and features for four issues in the StellarYield platform:

## 1. Fix API base URL fallback behavior - #435
Implemented a robust API base URL fallback strategy to handle deployed preview environments.
- **Frontend**: `client/src/lib/api.ts`, `client/src/lib/api.test.ts`, `client/src/auth/session.ts`
- **Features**: Avoids defaulting to localhost on Vercel preview environments unless configured. Handles missing `VITE_API_BASE_URL` with a graceful failure state.
- **Fixes: #435**

## 2. Create maintainer dashboard issue triage view - #448
Created documentation and tooling for maintainers to effectively triage community issues.
- **Docs**: `docs/triage-process.md`, `scripts/issue-triage.js`
- **Features**: Saved search queries for Unclaimed, Claimed, PR Ready, and Blocked states. Added a weekly triage workflow guide.
- **Fixes: #448**

## 3. Add UI snapshot checklist for visual contribution reviews - #444
Added guidelines to ensure frontend PRs include necessary UI snapshots.
- **Docs**: `CONTRIBUTING.md`, `.github/pull_request_template.md`
- **Features**: Defined when screenshots are required (Desktop and Mobile), and added a checklist directly to the PR template.
- **Fixes: #444**

## 4. Add release readiness checklist for Wave submissions - #443
Added a structured checklist to ensure all Stellar Wave submissions meet the project's quality standards before review.
- **Docs**: `docs/release-checklist.md`, `README.md`
- **Features**: Outlined requirements for CI/CD, testing, UI snapshots, and documentation updates.
- **Fixes: #443**

---
All features and documentation have been implemented and validated against the repository's guidelines.
