# Quantchat

A sleek, lightweight, and modern Web User Interface tailored for local quantized Large Language Models (LLMs), like BitNet b1.58. Designed with an academic, clean, light-themed aesthetic, Quantchat provides an offline, privacy-first chatbot experience directly from your local machine.

## Features

- **Local Processing**: Completely offline inference. Your data never leaves your machine.
- **Response Generation Indicator**: Real-time visual feedback with a smooth, bouncing-dot "typing" indicator while the model generates a response.
- **Generation Time Tracking**: Automatically measures and displays the precise time taken for each response (e.g., `1.23s`), integrated directly into the message layout.
- **Premium Aesthetics**: A sophisticated, modern UI featuring the **Outfit** typeface from Google Fonts and a curated set of sharp, responsive icons from **Heroicons**.
- **Multiple Chat Sessions**: Effortlessly create, rename, delete, and switch between different conversation threads.
- **Persistent Storage**: Conversations are robustly synchronized directly to your browser's Local Storage.
- **Academic Aesthetic**: A clean, balanced light-theme UI built with React and Tailwind CSS for maximum readability and professional demonstrations.
- **Backend Ready**: Configured with a modular API wrapper to securely connect to standard local Python inferencing backends (like Uvicorn/FastAPI and quantized model runtimes).

## Technology Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Typography**: Outfit (Google Fonts)
- **Icons**: Heroicons (SVG)
- **State Management**: React Hooks & native browser `localStorage`
- **Networking**: Native `fetch` API

## Prerequisites

To run this application, you will need:
- Node.js (v18 or newer recommended)
- npm (Node Package Manager)

## Getting Started

### 1. Installation

Clone this repository to your local machine:
```bash
git clone https://github.com/GovindGopan/Web-UI-for-BitnetLLM.git
cd Web-UI-for-BitnetLLM
```

Install the dependencies:
```bash
npm install
```

### 2. Running for Development

To start the Vite development server:
```bash
npm run dev
```
Navigate to the local URL provided in your terminal (usually `http://localhost:5173`) to view the application in your browser.

### 3. Building for Production

To create an optimized production build:
```bash
npm run build
```
This will compile the application into the `dist` folder.

## Backend Integration

Quantchat is built to natively hook into an external local LLM runner. By default, it sends standard `POST` requests to `http://localhost:8000/v1/chat/completions`. You can alter this URL or modify the payload structure within `src/services/api.js`.

If the UI fails to connect to the backend, it will gracefully fall back to an integrated mock response for frontend UI testing purposes.

## License

MIT
