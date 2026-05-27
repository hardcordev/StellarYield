# Recommendation Timeline Fixtures

This directory contains deterministic fixtures used by recommendation timeline tests.

## Current fixture matrix

`recommendationTimelineFixtures.ts` defines:

- Profiles: `conservative`, `balanced`, `aggressive`
- Market states: `normal`, `volatile`, `stale`
- Expected reason-code transitions for each profile across market shifts

## How to extend

1. Add or update a scenario in `RECOMMENDATION_FIXTURE_CASES`.
2. Keep transitions deterministic (no `Math.random` or runtime timestamps in fixture data).
3. For every new transition, specify `expectedReasonCodes` explicitly.
4. If you add a new reason code in `recommendationTimelineService.ts`, update at least one fixture transition to assert it.
5. Run `npm test -- recommendationTimelineService.test.ts` from `server/` to verify the matrix.

## Notes

- The timeline test suite pins time and randomness, so fixture assertions are stable across CI runs.
- Target vault assertions are part of the fixture matrix and should remain part of acceptance checks.
