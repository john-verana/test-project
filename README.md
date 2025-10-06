# 🏆 Kampilan FC Dashboard

## 📋 Overview

**Kampilan FC Dashboard** is a responsive front-end web application
designed to manage and display football training sessions, open-play
schedules, and live weather updates for Las Piñas, PH.

It serves as the foundation for the future Kampilan FC platform ---
integrating with a **Java (Spring Boot)** backend and database for
player registrations, admin control, and payment tracking.

------------------------------------------------------------------------

## ✨ Features

✅ **Live Weather Widget** - Displays real-time temperature and
condition for Las Piñas using the OpenWeather API. - Forecast support
for *today*, *tomorrow*, and *day-after tomorrow*. - API key secured via
`.gitignore`.

✅ **Session Information** - Shows training/open-play details: title,
time, and location. - Dynamic *Join / Cancel* button with color
transition. - Rest-day mode hides button and shows motivational message.

✅ **Agenda Section** - Displays drills and scrimmage plans for the
day. - Automatically hidden on rest days. - Future-ready for admin
editing from backend.

✅ **3-Card Slider** - Card 0 → Today\
- Card 1 → Tomorrow\
- Card 2 → Day-after Tomorrow\
- Navigation via: - Dots (click) - Keyboard arrows ← → - Mouse drag
(desktop) - Swipe gestures (mobile)

✅ **Fully Responsive** - Works on desktop, tablet, and mobile layouts.

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer               Technology
  ------------------- --------------------------------------
  Frontend            HTML5, CSS3, JavaScript (Vanilla JS)
  API                 OpenWeatherMap API
  Development Tools   VS Code, Git & GitHub
  Future Backend      Spring Boot (Java)
  Deployment Target   GitHub Pages / Custom Hosting

------------------------------------------------------------------------

## ⚙️ Project Structure

    test-project/
    │
    ├── css/
    │   └── style.css          # UI styling and layout
    │
    ├── js/
    │   └── script.js          # Main logic (weather, slider, sessions)
    │
    ├── config/
    │   └── config.js          # (Optional) API key reference - excluded via .gitignore
    │
    ├── .gitignore             # Hides sensitive keys and configs
    ├── dashboard.html         # Main HTML structure
    └── README.md              # Documentation

------------------------------------------------------------------------

## 🚀 How to Run Locally

1.  Clone the repository

    ``` bash
    git clone https://github.com/john-verana/test-project.git
    cd test-project
    ```

2.  Open the `dashboard.html` file directly in your browser\
    *(or use VS Code Live Server for auto reloads)*

3.  Add your **OpenWeather API key** in your local `config.js` (excluded
    from Git).

    ``` js
    const apiKey = "YOUR_API_KEY_HERE";
    ```

4.  Enjoy the live weather and session updates!

------------------------------------------------------------------------

## 🔒 Security & Best Practices

-   API keys and configs are **never committed** (protected by
    `.gitignore`).

-   Each feature branch follows naming convention:

        feature/<feature-name>
        fix/<issue>
        chore/<maintenance-task>

-   Commits use **conventional commit messages** (`feat:`, `fix:`,
    `chore:`).

------------------------------------------------------------------------

## 🧩 Next Steps (Roadmap)

  Phase        Goal
  ------------ --------------------------------------------------------
  ✅ Phase 1   Static dashboard with real-time weather and local data
  🚧 Phase 2   Backend integration (Spring Boot + MySQL)
  🔒 Phase 3   User authentication and admin portal
  🌍 Phase 4   Deploy live (Netlify / GitHub Pages / AWS S3)

------------------------------------------------------------------------
