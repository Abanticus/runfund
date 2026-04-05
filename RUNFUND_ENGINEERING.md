# RunFund Engineering Notes

## Summary

RunFund is a mobile-first React + TypeScript app for tracking runs, translating miles into savings, and measuring progress toward a shoe goal. The codebase has been tightened around consistent component usage, safer date handling, and reusable UI patterns.

This is production-quality front-end code in structure and consistency, but the product still has deliberate MVP constraints such as local-storage persistence and no backend sync.

## Component System

- Shared UI primitives live in `src/components/ui` and are used instead of one-off controls.
- Repeated metric styling is centralized in `src/components/MetricTile.tsx`.
- Inline editing for the earn rate and goal target is handled by `src/components/InlineMetricEditor.tsx`, which composes the existing shadcn-style `Input` and `Button`.
- Dashboard sections remain feature components with a consistent card surface and shared formatting helpers.

## State and Data

- Global app state lives in `src/store/use-runfund-store.ts`.
- Persistence is handled with Zustand `persist` and browser local storage.
- Formatting and date conversion helpers are centralized in `src/utils/format.ts`.
- Goal, savings, and lifecycle calculations are centralized in `src/utils/metrics.ts`.

## Production-Quality Improvements Completed

- Reused shared metric components instead of repeating tile markup.
- Normalized settings updates so partial updates do not need to resubmit unrelated values.
- Removed UTC-sensitive date defaults and sorting in favor of local date parsing helpers.
- Kept styling aligned across cards, controls, toasts, and inline editors.
- Verified the project with a clean production build after refactoring.

## Current MVP Limits

- Data is local to one browser and device.
- There is no authentication, server persistence, or conflict resolution.
- There is no automated test suite yet.
- External activity sync, imports, and monitoring are not implemented.

## Recommended Next Steps

1. Add unit tests for formatting, metrics, and store behavior.
2. Add component tests for inline editing, run logging, and settings updates.
3. Add an import flow for external run data before considering API sync.
4. Move persistence to a backend if multi-device support is needed.
5. Add analytics/error monitoring before a real public launch.
