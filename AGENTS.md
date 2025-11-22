# Agent Guidelines for FloorPlan Render AI

## Project Overview
FloorPlan Render AI is a lead magnet web app that converts 2D floor plans into 3D visualizations using Google Cloud Vertex AI.
The goal is to demonstrate AI capabilities to potential consulting clients in architecture and real estate.

## Tech Stack
- **Frontend**: React Router v7, React 19, Tailwind CSS v4.
- **Backend**: React Router v7 Server Actions/Loaders (Node.js adapter).
- **AI**: Google Cloud Vertex AI (Gemini / Nano Banana Pro).
- **Language**: TypeScript.

## Key Directives
1. **Focus on Aesthetics**: The app must look premium, clean, and professional. Use whitespace, grids, and subtle animations.
2. **Lead Magnet First**: The primary goal is to collect emails for consulting. The flow is designed to encourage this.
3. **Simplicity**: Keep the code simple and idiomatic.
4. **Routing**: Use file-based routing in `app/routes`.

## Directory Structure
- `app/routes`: Route modules.
- `app/components`: Shared UI components.
- `app/server`: Server-side logic (Vertex AI, DB).
- `app/styles`: Global styles.

## Development
- Run `npm run dev` to start the development server.
