# Stellar Wave Release Readiness Checklist

Before submitting a PR for the Stellar Wave program, please ensure your contribution meets the following release readiness standards:

## 1. Issue Linking
- [ ] Your PR description includes `Fixes #ISSUE_NUMBER` to automatically close the relevant issue.

## 2. Build & CI
- [ ] All GitHub Actions CI checks pass (linting, testing, format).
- [ ] The Vercel preview deployment builds successfully without errors.

## 3. Testing & Validation
- [ ] **Smoke Test:** You have manually verified the core happy path for your feature in the preview environment.
- [ ] **Smart Contracts:** Fuzzing and unit tests pass locally (`cargo test`).
- [ ] **Frontend:** Relevant `npm run test` checks pass.

## 4. Documentation & Visuals
- [ ] Any new or modified UI components include screenshots (Desktop & Mobile) in the PR description.
- [ ] If this is a new feature or smart contract, appropriate documentation and NatSpec comments have been added.
- [ ] (If applicable) The `README.md` or contributor guides have been updated to reflect new environment variables or architectural changes.

Keep your submission concise and ensure all checklist items are met prior to requesting a review.
