# Typeracer Next.js app

[Live Demo](https://typeracer-rivens-projects.vercel.app)

## Thoughts

Definitely not my proudest work. This definitely lacks polish and has a lot of flaws in terms of code structure, error handling, and overall architecture, but it was a fun project and I will definitely continue working on it (on a new branch).

### Tech Stack Choices

- Supabase: Database for storing round history and user stats. More importantly, Supabase Realtime (specifically the Presence feature) allowed me to sync live typing progress across multiple clients instantly without having to write and manage custom WebSocket infrastructure.
- Tailwind CSS: Used for rapid UI development.

### Features Implemented

- Real-time typing interface with standard Typeracer-style character validation.
- Live calculation of Words Per Minute (WPM) and Accuracy.
- Global game loop with fixed-time rounds synchronized across all connected clients.
- Live multiplayer leaderboard showing connected players, their current stats, and a preview of their live typing progress.

### Future Improvements

- Fixing all the issues with the current code structure, improving error handling, and overall architecture of the app.
- Adding unit, E2E, and integration tests to ensure the app's reliability and maintainability.
- Adding error logging and monitoring tools like Sentry to track and fix issues in production.
- Adding validation (Valibot/Zod), sanitization and moving more logic to the server.
- Adding ORM like Drizzle to improve database type safety and simplify database interactions.
- Improved UI/UX with mobile support.
- User Authentication: Allow users to create accounts and track their long-term stats and history.
- Adding more features like leaderboards, user profiles, and more complex game modes.
- And so on...

## Getting Started (local development)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
