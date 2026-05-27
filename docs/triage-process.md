# Maintainer Issue Triage Process

This document outlines the weekly issue triage workflow for the StellarYield maintainers, particularly for the Stellar Wave program.

## Saved Search Queries / Triage States

To maintain visibility over community contributions, use the following GitHub search queries:

1. **Unclaimed Issues (Ready for Community)**
   `is:issue is:open label:"Stellar Wave" label:"help wanted" no:assignee`
   *Action:* Review for clarity, add 'good first issue' if applicable.

2. **Claimed Issues (In Progress)**
   `is:issue is:open label:"Stellar Wave" has:assignee no:linked-pr`
   *Action:* Ping assignees if there has been no activity for >7 days.

3. **Ready for Review (PR Submitted)**
   `is:pr is:open label:"Stellar Wave" review:required`
   *Action:* Assign a maintainer to review.

4. **Blocked / Needs Input**
   `is:issue is:open label:"blocked" OR label:"needs info"`
   *Action:* Follow up on requested information.

## Weekly Triage Workflow

Every Monday, maintainers should follow this process:

1. **Review New Issues**: Scan all new issues created in the past week. Apply appropriate labels (`Stellar Wave`, `bug`, `enhancement`, `points: xxx`).
2. **Check Stale Claims**: Unassign contributors who have not responded for over a week to free up issues for others.
3. **Unblock Contributors**: Answer questions on issues labeled `needs info` or `blocked`.
4. **Run Issue Triage Script**: Run the `scripts/issue-triage.js` to get an overview of the issue counts.

## Public Contributor Considerations
Ensure that labels are clear, and that any "claimed" state is visibly marked by assigning the user. If the user cannot be assigned due to GitHub permissions, add a comment explicitly stating: `@username has claimed this issue.`
