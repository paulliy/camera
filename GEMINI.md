# GEMINI.md - Project Context and Guidelines

This file is intended to provide the Gemini AI with essential context, architectural understanding, and coding standards for this project. Use this information to generate more accurate, relevant, and effective code suggestions.

## 1. Project Overview

This is an **Electron desktop application** built with **Vue 3** and **TypeScript**, focused on camera functionality. The application supports two primary modes: **Photo** and **Video**, which toggle UI styling and behavior.

*   **Primary Purpose**: Capture photos and videos using the user's webcam.
*   **Key Features**:
    *   Dynamic UI theming based on mode (Photo/Video).
    *   Permissions handling for Microphone and Camera via IPC.
    *   Electron-based window management.

## 2. Tech Stack & Dependencies

*   **Framework**: [Electron](https://www.electronjs.org/) (v28+)
*   **Frontend**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
*   **Build Tool**: [electron-vite](https://electron-vite.org/) (Vite for Electron)
*   **Utilities**: `@electron-toolkit/utils` (simplifies IPC, window creation)
*   **Linting/Formatting**: ESLint, Prettier

## 3. Architecture

The project follows the standard Electron process separation:

### Directory Structure
*   `src/main/`: **Main Process** code. Handles window creation, native APIs, and IPC listeners (`ipcMain`).
    *   `index.ts`: Entry point for the main process.
*   `src/preload/`: **Preload Scripts**. Bridges the Main and Renderer processes securely. Exposes APIs to the renderer via `contextBridge`.
    *   `index.ts`: Default preload script.
*   `src/renderer/`: **Renderer Process** (Frontend). Contains the Vue application.
    *   `index.html`: Entry HTML file.
    *   `src/`: Vue source code.
        *   `App.vue`: Root component managing application state (Photo/Video mode).
        *   `components/`: Vue components (`Options.vue`, `Permissions.vue`, `Versions.vue`).
        *   `assets/`: Static assets (SVGs, images).

### IPC Communication (Inter-Process Communication)
*   **Pattern**: Use `ipcRenderer.invoke` (in Renderer) and `ipcMain.handle` (in Main) for request-response communication.
*   **Example**:
    *   Renderer: `await window.electron.ipcRenderer.invoke('reqmicperms')`
    *   Main: `ipcMain.handle('reqmicperms', () => { ... })`

## 4. Coding Guidelines & Standards

### General
*   **TypeScript**: Always use TypeScript. Prefer explicit types over `any`.
*   **Async/Await**: Use `async/await` for asynchronous operations, especially IPC calls.

### Vue (Renderer)
*   **Composition API**: Use `<script setup lang="ts">`.
*   **Reactivity**: Use `ref` for primitive values and `reactive` for objects. Use `computed` for derived state (like theming).
*   **Styling**: Use Scoped CSS (`<style scoped>`) within Vue components.
*   **Theming**: The application relies heavily on CSS variables for theming (e.g., `var(--photo-bg)`, `var(--video-bg)`). Ensure logic correctly toggles these based on the current mode (`bgcolor` ref in `App.vue`).

### Electron (Main)
*   **Security**: Do not enable `nodeIntegration` in the renderer. Use the `preload` script to expose safe APIs.
*   **Window Management**: Use `@electron-toolkit/utils` helper functions where applicable (e.g., `optimizer`, `is`).

## 5. Key Files & State

*   **`src/renderer/src/App.vue`**:
    *   `bgcolor` (ref<boolean>): Controls the mode (True = Photo, False = Video).
    *   `campermstatus`, `micpermstatus`: Tracks permission states.
    *   Contains logic for toggling UI styles via `computed` properties based on `bgcolor`.

*   **`src/main/index.ts`**:
    *   Registers IPC handlers (`reqmicperms`, `reqcamperms`).
    *   Configures the main `BrowserWindow`.

## 6. Common Commands

*   `npm install`: Install dependencies.
*   `npm run dev`: Start the development server (hot-reload for renderer, auto-restart for main).
*   `npm run build`: Build the application for production.
*   `npm run typecheck`: Run TypeScript type checking for both main and renderer processes.
*   `npm run lint`: Run ESLint.
*   `npm run format`: Format code with Prettier.

## 7. How to Add a New Feature

1.  **Renderer**: Add the UI element in the appropriate Vue component.
2.  **IPC (if needed)**:
    *   Define the channel name (e.g., `'my-new-feature'`).
    *   Call `window.electron.ipcRenderer.invoke('my-new-feature', data)` in the Vue component.
3.  **Main**:
    *   Add `ipcMain.handle('my-new-feature', async (event, data) => { ... })` in `src/main/index.ts`.
4.  **Verification**: ensure types are correct and the feature works in both development and production build.
