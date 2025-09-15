# Tarcin Robotic LLP - Frontend

This is the frontend application for Tarcin Robotic LLP website built with React, TypeScript, and Vite.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

## Backend Communication

The frontend is configured to communicate with the backend API running on http://localhost:5000

Make sure the backend server is running before starting the frontend.

## Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with TypeScript

## Technology Stack

- React 18 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Shadcn/ui component library
- TanStack Query for API state management
- Wouter for routing
- Framer Motion for animations

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and configurations
└── data/          # Static data files
```



backgroundImage: "url('/certificateAssets/BGF.png')",