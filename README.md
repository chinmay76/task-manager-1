# Task Manager App

A simple task management app with authentication, CRUD tasks, local persistence, and MSW-mocked APIs.

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+

Check versions:

```bash
node -v
npm -v
```

## Setup

```bash
npm install
```

### MSW (required)

Register the Mock Service Worker (one time):

```bash
npx msw init public/ --save
```

## Run (Development)

```bash
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Build & Preview

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

## Login Credentials

- username: `test`
- password: `test123`

## Mock API (MSW)

Endpoints:
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Tech Stack

- React + Vite
- TypeScript
- Redux Toolkit
- Axios
- Formik + Yup
- MSW
- Tailwind CSS
- Jest + React Testing Library

## Troubleshooting

### “Unexpected reserved word” when running `npm run dev`

Your Node.js version is too old for Vite 5. Install Node 18+ and try again.

### Login shows “invalid creds” for test/test123

The MSW worker is likely not installed. Run:

```bash
npx msw init public/ --save
```

Then restart `npm run dev`.

## Deployment (Vercel)

```bash
npm run build
vercel deploy
```

## Project Structure

```
src
 +-- api
 ¦   +-- axios.ts
 ¦   +-- taskApi.ts
 +-- app
 ¦   +-- hooks.ts
 ¦   +-- store.ts
 +-- features
 ¦   +-- auth
 ¦   ¦    +-- authSlice.ts
 ¦   ¦    +-- LoginPage.tsx
 ¦   ¦    +-- authSelectors.ts
 ¦   +-- tasks
 ¦        +-- taskSlice.ts
 ¦        +-- TaskList.tsx
 ¦        +-- TaskForm.tsx
 ¦        +-- TaskCard.tsx
 +-- mocks
 ¦   +-- handlers.ts
 ¦   +-- browser.ts
 +-- components
 ¦   +-- Navbar.tsx
 ¦   +-- ProtectedRoute.tsx
 ¦   +-- EmptyState.tsx
 ¦   +-- Loader.tsx
 ¦   +-- ErrorMessage.tsx
 +-- pages
 ¦   +-- Dashboard.tsx
 ¦   +-- Login.tsx
 +-- routes
 ¦   +-- AppRoutes.tsx
 +-- tests
 ¦   +-- auth.test.tsx
 ¦   +-- task.test.tsx
 +-- utils
 ¦   +-- storage.ts
 +-- main.tsx
```
