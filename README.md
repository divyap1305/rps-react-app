🎮 Rock Paper Scissors – React Edition

A fully interactive, energetic Rock Paper Scissors game built using React + Vite, featuring smart AI difficulty levels, animated UI, routing, persistent statistics, and a modern game-style interface.

🚀 Live Demo:
👉 https://rps-react-app.vercel.app/

✨ Features

🎯 Easy, Medium & Hard AI Modes

🧠 Pattern-based AI prediction (Hard mode)

⚡ Energetic animated UI with dynamic gradients

📊 Statistics dashboard with:

Total matches

Win / Loss tracking

# 🎮 Rock Paper Scissors – React Edition

A fully interactive, energetic Rock Paper Scissors game built using React + Vite, featuring smart AI difficulty levels, animated UI, routing, persistent statistics, and a modern game-style interface.

## Live Demo

👉 https://rps-react-app.vercel.app/

## Table of Contents

- Features
- Tech Stack
- Architecture Overview
- Key Design Decisions
- AI Difficulty Logic
- Getting Started (Local Setup)
- What This Project Demonstrates
- Project Purpose
- Author

## Features

- 🎯 Easy, Medium & Hard AI Modes
- 🧠 Pattern-based AI prediction (Hard mode)
- ⚡ Energetic animated UI with dynamic gradients
- 📊 Statistics dashboard with:
	- Total matches
	- Win / Loss tracking
	- Current streak
	- Best streak
	- Win rate calculation
- 💾 Persistent game data using custom useLocalStorage hook
- 🌙 Fully styled Dark Mode
- 🧭 Multi-page routing using React Router
- 🎉 Confetti winner celebration
- 🔒 Confirmation modal before exiting match
- 📈 Animated score progress bars
- 🧱 Clean component-based architecture

## Tech Stack

- React (Vite)
- React Router DOM
- Custom Hooks
- Modular Game Logic (Utility-based AI)
- CSS Animations & Gradient Effects
- Canvas Confetti
- Vercel (Deployment)

## Architecture Overview

The application follows a clean and scalable structure:

```
src/
 ├── components/
 │    ├── StartScreen.jsx
 │    ├── GameScreen.jsx
 │    ├── StatsScreen.jsx
 │    └── Modal.jsx
 ├── hooks/
 │    └── useLocalStorage.js
 ├── utils/
 │    └── gameLogic.js
 ├── App.jsx
 └── main.jsx
```

## Key Design Decisions

- Separation of Concerns
	UI logic and game logic are separated using utility functions.
- Reusable Components
	Modal and screens are modular and reusable.
- Custom Hook
	useLocalStorage abstracts persistence logic for cleaner components.
- Derived State
	Win rate and streak tracking are calculated from existing state instead of being redundantly stored.
- Routing-Based Navigation
	Implemented using React Router instead of conditional rendering.

## AI Difficulty Logic

- Easy → Fully random choice
- Medium → 50% counter logic
- Hard → Pattern-based prediction using move history

Hard mode analyzes the player's previous moves and predicts the most frequent pattern before choosing a counter.

## Getting Started (Local Setup)

Clone the repository:

```bash
git clone https://github.com/your-username/rps-react-app.git
cd rps-react-app
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## What This Project Demonstrates

- React Hooks (useState, useEffect, useCallback)
- Custom Hooks
- Routing with React Router
- Conditional rendering
- State-driven UI
- LocalStorage persistence
- Component architecture
- UI/UX animation design
- Debugging and optimization
- Production deployment

## Project Purpose

This project was built to demonstrate scalable frontend architecture, interactive UI design, AI-based logic implementation, and production-ready deployment using modern React practices.

## Author

Built with ❤️ by Divya Palanisamy