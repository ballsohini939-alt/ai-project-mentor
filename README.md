# 🤖 AI Project Mentor

> **Turn your project idea into a clear plan — and start building with confidence.**

AI Project Mentor is a web application that helps students and beginner developers transform an unstructured project idea into a **structured project blueprint, development roadmap, and actionable mentoring guidance**.

The application guides users through the journey from **Idea → Blueprint → Mentor → Dashboard → Progress**.

---

## ✨ Features

* 📝 **Project Idea Builder** — Describe your project and define its goals.
* 🧠 **Project Blueprint Generator** — Converts an idea into a structured project plan.
* 🗺️ **Development Roadmap** — Breaks the project into actionable development steps.
* 🤖 **AI Project Mentor** — Provides project-aware guidance and suggestions.
* 📊 **Project Dashboard** — Track project information and development progress.
* 💾 **Persistent Storage** — Saves project data using browser Local Storage.
* ⚡ **Responsive Interface** — Clean and interactive user experience.

---

## 🎯 Problem

Many students and beginner developers have good project ideas but struggle with questions like:

* Where should I start?
* What features should I build first?
* Which technologies should I use?
* How should I divide the project into smaller tasks?
* How can I improve my project?

AI Project Mentor was built to provide a structured starting point and development guidance.

---

## 💡 Solution

The application takes a user's project idea and turns it into a structured blueprint containing information such as:

```text
Project Idea
      ↓
Project Analysis
      ↓
Blueprint
      ↓
Features & Technology
      ↓
Development Roadmap
      ↓
AI Mentor
      ↓
Project Dashboard
```

This helps users move from **thinking about a project** to **actually building one**.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Node.js
* Express.js
* REST APIs

### Data & Visualization

* Recharts
* Browser Local Storage

### Development Tools

* Git
* GitHub
* VS Code

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│          React Frontend       │
│                               │
│  Project Builder              │
│  Project Blueprint            │
│  AI Mentor                    │
│  Project Dashboard            │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│       Node.js + Express       │
│                               │
│  Blueprint Generation         │
│  Mentor Logic                 │
│  API Endpoints                │
└───────────────┬───────────────┘
                │
                ▼
        Browser Local Storage
```

---

## 📁 Project Structure

```text
ai-project-mentor/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── AIMentor.jsx
│   │   ├── ProjectBlueprint.jsx
│   │   ├── ProjectBuilder.jsx
│   │   └── ProjectDashboard.jsx
│   │
│   ├── App.jsx
│   ├── app.css
│   ├── index.css
│   └── main.jsx
│
├── server/
│   └── server.js
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### 1. Clone the repository

```bash
git clone https://github.com/ballsohini939-alt/ai-project-mentor.git
```

### 2. Move into the project directory

```bash
cd ai-project-mentor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the backend

```bash
npm run server
```

### 5. Start the frontend

Open another terminal and run:

```bash
npm run dev
```

### 6. Open the application

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

The backend provides API endpoints for application functionality.

| Method | Endpoint        | Purpose                    |
| ------ | --------------- | -------------------------- |
| GET    | `/`             | Backend status             |
| GET    | `/api/health`   | Health check               |
| POST   | `/api/generate` | Generate project blueprint |
| POST   | `/api/mentor`   | Get mentor guidance        |

---

## 🧠 AI Mentor

The current mentor uses **project-aware rule-based logic** to provide development guidance based on the user's project information.

It can help answer questions such as:

```text
How should I start this project?

What features should I build first?

Which technology should I use?

How can I improve this project?

What should I work on next?
```

The mentor receives project context such as the project's:

* Title
* Idea
* Features
* Technology stack
* Development roadmap

This allows responses to be relevant to the project rather than completely generic.

---

## 📸 Screenshots

Screenshots of the application will be added here.

### 🏠 Project Builder

*Add application screenshot here.*

### 📋 Project Blueprint

*Add application screenshot here.*

### 🤖 AI Mentor

*Add application screenshot here.*

### 📊 Project Dashboard

*Add application screenshot here.*

---

## 💻 What I Learned

Building AI Project Mentor helped me strengthen my practical understanding of:

* React component development
* State management
* REST API communication
* Node.js and Express
* Frontend-backend integration
* Local data persistence
* Responsive UI development
* Debugging
* Git and GitHub workflow
* Building a complete application from an idea

---

## 🚧 Current Limitations

The current version is intentionally lightweight and uses local storage and rule-based mentor logic.

It does not currently provide:

* User authentication
* Cloud database storage
* Multi-user project management
* Advanced conversational AI
* Cloud deployment

---

## 🔮 Future Improvements

Possible future improvements include:

* 🤖 Integration with a large language model
* 🔐 User authentication
* 🗄️ Database-backed project storage
* ☁️ Cloud deployment
* 📈 Advanced progress analytics
* 👥 Collaborative project workspaces
* 🎯 More personalized development recommendations

---

## 🎓 Project Context

This project was built as part of my journey to strengthen my skills in **software development, AI concepts, frontend development, backend development, and problem solving**.

It represents my approach of learning technology by building practical applications.

---

## 👩‍💻 Author

### Sohini Ball

**B.Tech Computer Science & Engineering Student**

Interested in:

`Software Engineering` `AI` `Data Science` `Problem Solving`

### Connect

* 💼 **LinkedIn:** https://www.linkedin.com/in/sohini-ball-698012381/
* 🐙 **GitHub:**  https://github.com/ballsohini939-alt

---

## ⭐ If you find this project interesting

Feel free to explore the repository, experiment with the project, and follow my development journey.

> **Learn by building. Improve by solving. Grow by sharing.**

