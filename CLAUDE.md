# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Lee Weisberger's personal website built with Astro, React, and Tailwind CSS. The site features an AI-powered chatbot that impersonates Lee using Groq's free LLMs.

## Development Commands

| Command           | Description                                              |
| :---------------- | :------------------------------------------------------- |
| `npm install`     | Install dependencies                                     |
| `npm run dev`     | Start dev server at `localhost:4321` (runs linter first) |
| `npm run build`   | Build production site to `./dist/` (runs linter first)   |
| `npm run preview` | Preview production build locally                         |
| `npm run lint`    | Run ESLint on src directory                              |

Note: Both `dev` and `build` commands automatically run the linter before execution.

Ensure that you run `npm run lint` after making changes to ensure that the linter passes. Also ensure that the website
does not return errors by checking the dev server at `localhost:4321` if it's already running, or spinning it up with `npm run dev`, checking, and tearing it down if it isn't already running.

## Architecture

### Tech Stack

- **Framework**: Astro 5.x with SSR enabled (`output: 'server'`)
- **Deployment**: Cloudflare adapter for edge deployment
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **UI Components**: React 19 with Material Tailwind
- **AI Integration**: Vercel AI SDK with Groq provider (Llama-3.3-70b-versatile)

### Key Configuration Notes

#### Tailwind CSS

This project uses the **new Tailwind CSS v4 installation method** with `@tailwindcss/vite`:

- Import Tailwind via `@import "tailwindcss"` in `src/styles/global.css`
- Configured as a Vite plugin in `astro.config.mjs`, NOT as an Astro integration
- Do NOT use the deprecated `@astrojs/tailwind` integration

#### React 19 + Cloudflare Compatibility

The `astro.config.mjs` includes a critical Vite alias to prevent React 19 build errors:

```javascript
alias: import.meta.env.PROD
    ? { 'react-dom/server': 'react-dom/server.edge' }
    : undefined;
```

This resolves MessageChannel polyfill issues when deploying to Cloudflare. See: https://github.com/withastro/astro/issues/12824

### Project Structure

```
src/
├── components/      # React and Astro components
├── layouts/         # Astro layout templates
├── pages/           # Astro pages and API routes
│   ├── api/        # API endpoints (e.g., /api/chat)
│   └── index.astro # Homepage
├── styles/          # Global CSS (Tailwind imports)
└── prompts.ts       # LLM system prompts
```

### AI Chatbot Architecture

The chatbot uses an **API Route** (`src/pages/api/chat.ts`):

- Standard POST endpoint at `/api/chat`
- Uses Vercel AI SDK's `streamText()` with message history
- System prompt from `prompts.ts` defines Lee's persona
- Used by React components via `useChat()` hook

**Main Chat Component**: `LlmChat.tsx` orchestrates the chat UI:

- Uses `useChat()` hook from `ai/react` for message state and streaming
- Manages input, submission, and message rendering
- Integrates with `LlmInput`, `LlmButton`, and `LlmResponse` sub-components

### Environment Variables

Required in `.env`:

- `GROQ_API_KEY`: API key for Groq

### Linting & Code Style

- ESLint with TypeScript, React, and Astro plugins
- Prettier integration via `eslint-config-prettier`
- React-in-JSX-scope rule disabled (React 19 automatic JSX runtime)
- Configuration: `eslint.config.js` (flat config format)

## Deployment

Site is deployed to Cloudflare using the `@astrojs/cloudflare` adapter. The Vite configuration includes special handling for production builds to ensure React 19 compatibility with Cloudflare's edge runtime.

A deployment occurs automatically when the main branch is pushed.
