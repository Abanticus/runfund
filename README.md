# RunFund

RunFund is a mobile-first running savings tracker. Log the miles you run, assign a pound value to each mile, and watch your shoe fund grow toward your next pair.

## Features

- Manual run logging with optional dates
- Savings calculation based on a configurable `£ per mile` rate
- Progress tracking toward a running shoe goal
- Shoe lifecycle indicator across the 0 to 500 mile replacement window
- Local storage persistence for runs and settings
- Mobile-first dashboard built with React, Tailwind CSS, shadcn-style UI components, and Zustand

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Notes

- Default settings are `£1.00` per mile and a `£120.00` shoe goal.
- All data is stored in local storage under the `runfund-storage` key.
