# ✦ AI Project Mentor

> **Turn a simple idea into a structured project — and turn the plan into a real project.**

AI Project Mentor is an AI-powered project planning platform that helps students and beginner developers transform an unstructured project idea into a clear, actionable development plan.

Instead of starting with a blank code editor, AI Project Mentor guides developers through a structured journey:

```
💡 Project Idea
      ↓
🧠 AI Understanding
      ↓
📋 Project Blueprint
      ↓
🗺️ Development Roadmap
      ↓
🚀 Project Dashboard
      ↓
🛠️ Development Workspace
```

**The goal is simple:** help developers understand what to build, how to build it, and what to build next.

---

## 📑 Table of Contents

1. [Introduction](#1-introduction)
2. [Problem Statement](#2-problem-statement)
3. [Motivation](#3-motivation)
4. [Objectives](#4-objectives)
5. [Key Features](#5-key-features)
6. [How It Works](#6-how-it-works)
7. [Project Workflow](#7-project-workflow)
8. [System Architecture](#8-system-architecture)
9. [Technology Stack](#9-technology-stack)
10. [Project Structure](#10-project-structure)
11. [Core Modules](#11-core-modules)
12. [Data Persistence](#12-data-persistence)
13. [API Architecture](#13-api-architecture)
14. [UI/UX Design](#14-uiux-design)
15. [Current Project Status](#15-current-project-status)
16. [Limitations](#16-limitations)
17. [Future Scope](#17-future-scope)
18. [Installation](#18-installation)
19. [Running the Project](#19-running-the-project)
20. [Screenshots](#20-screenshots)
21. [Development Philosophy](#21-development-philosophy)
22. [Conclusion](#22-conclusion)
23. [Project Vision](#23-project-vision)

---

## 1. Introduction

Starting a software project is often easier than understanding how to build it.

Many students and beginner developers have ideas such as:

- *"I want to build an AI assistant."*
- *"I want to create a student management system."*
- *"I want to build a finance application."*

But having an idea does not automatically provide a development strategy. A successful software project requires developers to understand:

- What problem the project solves
- Who will use it
- Which features are required
- Which technologies should be used
- What should be built first
- How the project should be divided into phases
- What should be implemented next

**AI Project Mentor was created to close this planning gap** — transforming an unstructured project idea into a structured development blueprint, and providing a workspace where users can continue developing their project.

---

## 2. Problem Statement

Many beginner developers struggle to convert a simple idea into an actionable software project. This creates several challenges:

- Lack of project planning
- Unclear feature priorities
- Poor technology selection
- Difficulty breaking large projects into smaller tasks
- Lack of development direction
- Difficulty understanding what to build next
- High chances of abandoning the project

AI Project Mentor addresses this by providing a guided workflow:

```
Project Idea → Project Blueprint → Development Roadmap → Project Dashboard → Development Workspace
```

---

## 3. Motivation

Many learning platforms teach developers *how to code*. But beginners often struggle with a different question: ***what*** should I build, and in what order?

AI Project Mentor is not designed to replace developers — it's designed to help them:

- Think clearly
- Plan effectively
- Understand their project
- Break complex problems into manageable phases
- Choose suitable technologies
- Start development with confidence

---

## 4. Objectives

| # | Objective | Description |
|---|-----------|-------------|
| 4.1 | **Idea Transformation** | Convert a natural-language project idea into a structured project concept |
| 4.2 | **Project Planning** | Generate a detailed blueprint covering purpose, users, features, technologies, roadmap, and insights |
| 4.3 | **Technology Guidance** | Recommend suitable technologies based on project requirements |
| 4.4 | **Development Roadmap** | Divide the project into logical development phases |
| 4.5 | **Beginner-Friendly Development** | Present complex planning information simply and clearly |
| 4.6 | **Project Persistence** | Preserve project information using browser-based storage |
| 4.7 | **Project Workspace** | Provide a centralized environment for continued development |
| 4.8 | **AI-Assisted Guidance** | Offer an AI Mentor interface for project-aware Q&A |

---

## 5. Key Features

### ✦ 5.1 Project Idea Builder
Users describe their project idea in natural language (e.g. *"I want to build an AI assistant for students"*), which becomes the foundation for the generated plan.

### ✦ 5.2 AI-Generated Project Blueprint
Transforms the idea into a structured blueprint containing:
- Project title & original idea
- Problem statement
- Proposed solution
- Target users
- Key features
- Technology stack
- Development roadmap
- Project insights

### ✦ 5.3 Technology Stack Planning
Recommends technologies across:
- Frontend
- Backend
- Database
- AI / Machine Learning
- Tools
- Deployment

### ✦ 5.4 Development Roadmap
Breaks large projects into manageable phases, e.g.:

```
Phase 01 → Project Setup
Phase 02 → Core Features
Phase 03 → Backend Integration
Phase 04 → User Interface
Phase 05 → Testing & Improvement
```

### ✦ 5.5 Project Dashboard
The central workspace users enter after the blueprint is generated.

### ✦ 5.6 Phase Workspace
Lets users focus on the current development stage instead of the entire project at once.

### ✦ 5.7 Local Project Persistence
Uses browser storage so users can refresh the app without losing project state.

### ✦ 5.8 Structured Project Navigation

```
Landing Page → Project Builder → Project Blueprint → Project Dashboard → Phase Workspace
```

### ✦ 5.9 Responsive UI/UX
- Clear visual hierarchy
- Large, readable headings
- Soft colors with lavender/purple accents
- Card-based layouts
- Consistent spacing
- Clear call-to-action buttons
- Fully responsive, beginner-friendly navigation

### ✦ 5.10 AI Mentor
A project-aware guidance interface that can receive user questions, current project data, features, roadmap, and technology info via the mentor API.

> The AI Mentor is currently an additional module — the core project-generation workflow does not depend on it.

---

## 6. How It Works

```
┌─────────────────────────┐
│     1. PROJECT IDEA     │
│  User describes their   │
│  project idea           │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│    2. AI BLUEPRINT      │
│  Idea becomes a         │
│  structured project plan│
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ 3. PROJECT WORKSPACE    │
│  User enters the        │
│  project dashboard      │
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│   4. BUILD & IMPROVE    │
│  Follow roadmap and     │
│  develop incrementally  │
└─────────────────────────┘
```

---

## 7. Project Workflow

**Phase 1 — Idea Submission**
The user opens the app, selects **Start Building**, and describes the project idea in their own words.

**Phase 2 — Blueprint Generation**
The frontend sends the project information to the backend, which generates structured project data.

**Phase 3 — Blueprint Review**
The user reviews the generated blueprint:

```
Project Overview → Problem Statement → Proposed Solution → Target Users
→ Features → Technology Stack → Roadmap → Insights
```

**Phase 4 — Project Workspace**
After reviewing the blueprint, the user selects **Start Building**, opening the project dashboard.

**Phase 5 — Development**
The user follows the roadmap and builds incrementally:

```
Small Phase → Small Feature → Implement → Test → Improve → Next Feature
```

---

## 8. System Architecture

AI Project Mentor follows a client-server architecture:

```
                          USER
                           │
                           ▼
              ┌────────────────────────┐
              │     React Frontend     │
              │                        │
              │  Project Builder       │
              │  Project Blueprint     │
              │  Project Dashboard     │
              │  Phase Workspace       │
              │  AI Mentor             │
              └───────────┬────────────┘
                          │
                          │ HTTP / JSON
                          ▼
              ┌────────────────────────┐
              │    Node.js + Express   │
              │        Backend         │
              │      REST APIs         │
              └───────────┬────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │    AI Generation       │
              │        Layer           │
              └────────────────────────┘
```

**Frontend responsibilities:** user interaction, page rendering, project state, navigation, blueprint/dashboard/workspace display, local persistence.

**Backend responsibilities:** API requests, project generation, AI-related processing, mentor communication, server-side application logic.

---

## 9. Technology Stack

**Frontend**

| Technology | Purpose |
|------------|---------|
| React | User interface |
| Vite | Development and build environment |
| JavaScript | Application logic |
| CSS | UI/UX styling |
| HTML | Application structure |

**Backend**

| Technology | Purpose |
|------------|---------|
| Node.js | Server runtime |
| Express.js | REST API server |
| JavaScript | Backend logic |
| dotenv | Environment configuration |

**Storage**

The application currently uses `localStorage` and `sessionStorage` for browser-based project and session persistence.

**Development Tools**

VS Code · Git · GitHub · PowerShell · npm · Node.js

---

## 10. Project Structure

```
ai-project-mentor/
│
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── ProjectBuilder.jsx
│   │   ├── ProjectBlueprint.jsx
│   │   ├── ProjectBlueprint.css
│   │   ├── ProjectDashboard.jsx
│   │   ├── PhaseWorkspace.jsx
│   │   └── AIMentor.jsx
│   │
│   ├── App.jsx
│   ├── app.css
│   ├── index.css
│   ├── ui-overrides.css
│   └── main.jsx
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## 11. Core Modules

| Module | Description |
|--------|-------------|
| **1. Landing Page** | Introduces the platform — actions: *Start Building*, *See How It Works* |
| **2. Project Builder** | Collects the user's project idea → generation request |
| **3. Project Blueprint** | Displays the generated project plan (overview, problem, solution, users, features, stack, roadmap, insights) |
| **4. Project Dashboard** | Main workspace after blueprint generation |
| **5. Phase Workspace** | Focused environment for working through individual project phases |
| **6. AI Mentor** | Conversational interface via `POST /api/mentor` |

---

## 12. Data Persistence

The application currently uses browser storage to preserve project information.

```js
// Store the current project
localStorage.setItem(
  "ai-project-current",
  JSON.stringify(project)
);

// Persist the current page
localStorage.setItem(
  "ai-project-page",
  currentPage
);

// Maintain a session marker
sessionStorage.setItem(
  "ai-project-session",
  "active"
);
```

This allows the app to maintain project state during normal browser usage without requiring a database.

---

## 13. API Architecture

The Node.js backend exposes REST-style APIs. One key endpoint:

```
POST /api/mentor
```

Example request payload:

```json
{
  "question": "What should I build first?",
  "project": {
    "title": "AI Project",
    "idea": "AI assistant for students"
  }
}
```

**Communication flow:**

```
User Question → React Frontend → HTTP POST Request → Node.js Backend
→ AI Processing → Response → React Interface
```

---

## 14. UI/UX Design

Because the target audience includes students and beginner developers, the design focuses on reducing cognitive overload.

| Principle | Description |
|-----------|--------------|
| **Visual Hierarchy** | Large headings and clear section labels highlight important information |
| **Card-Based Information** | Complex project info is split into visually separated cards |
| **Soft Color Palette** | Soft backgrounds with lavender/purple accents for a modern, approachable feel |
| **Clear Actions** | Key actions (*Start Building*, *Generate Blueprint*, *Start Project*) are visually emphasized |
| **Responsive Layout** | Adapts cleanly to different screen sizes |
| **Beginner-Friendly Experience** | Avoids overwhelming users with unnecessary technical detail early on |

---

## 15. Current Project Status

The core AI Project Mentor workflow is **functional**.

**✅ Completed**

- [x] Landing Page
- [x] Project Idea Input
- [x] Project Generation
- [x] AI-Generated Blueprint
- [x] Project Overview
- [x] Problem Statement
- [x] Proposed Solution
- [x] Target Users
- [x] Feature Planning
- [x] Technology Recommendations
- [x] Development Roadmap
- [x] Project Insights
- [x] Project Dashboard
- [x] Phase Workspace
- [x] Local Project Persistence
- [x] Page Persistence
- [x] Responsive UI
- [x] Modern UI/UX
- [x] Node.js Backend
- [x] Project Generation API
- [x] AI Mentor API Structure

**Current core workflow:**

```
Landing Page → Project Builder → AI Blueprint → Project Dashboard → Development Workspace
```

---

## 16. Limitations

- **Local Storage** — project data is not synchronized across multiple devices
- **No User Authentication** — no account-based auth in the current version
- **No Cloud Synchronization** — projects remain local to the browser
- **AI Dependency** — recommendation quality depends on the underlying AI system and the input description
- **AI Mentor Enhancement** — the Mentor module is still evolving and isn't the primary focus of the core workflow

---

## 17. Future Scope

AI Project Mentor has significant potential to evolve from a project planning platform into a complete AI-powered development companion.

- **17.1 Advanced AI Mentor** — code explanations, debugging assistance, architecture recommendations, feature suggestions, error analysis, project-specific Q&A
- **17.2 User Authentication** — Sign Up → Login → Profile → Project History, enabling cross-device access
- **17.3 Cloud Project Storage** — move from browser storage to a database (React → Node.js/Express → Database)
- **17.4 Intelligent Progress Tracking** — task/phase completion, milestones, deadlines, activity history
- **17.5 GitHub Integration** — connect a repo, analyze it, and track commits/development progress
- **17.6 AI Codebase Analysis** — understand structure, technologies, existing/missing features, and code quality
- **17.7 Automated Task Generation** — convert roadmap phases into actionable checklists
- **17.8 Project Collaboration** — team members, shared projects, task assignments, comments
- **17.9 Project Templates** — ready-made starting points for AI/ML, Web, Mobile, Data Science, and more
- **17.10 Personalized Learning Paths** — recommend a learning path based on the project's tech requirements

> These are documented as directions for the project, not current implementation requirements.

---

## 18. Installation

**Prerequisites**

Make sure the following are installed:
- Node.js
- npm
- Git
- VS Code

```bash
# Check versions
node --version
npm --version
```

**Clone the repository**

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd ai-project-mentor
npm install
```

---

## 19. Running the Project

The application has a frontend and a backend.

**Start the backend**

```bash
node server.js
```

Runs on: `http://localhost:5000`

**Start the frontend**

```bash
npm run dev
```

Vite will provide a local address similar to: `http://localhost:5173`

Open the address shown in your terminal.

---

## 20. Screenshots

### Landing Page
The entry point — introduces the platform and starts the *Project Idea → Blueprint → Dashboard* journey.

![Landing Page](https://raw.githubusercontent.com/ballsohini939-alt/ai-project-mentor/ui-redesign/LandingPage.png)

### Project Builder
Where users describe their idea, pick a category, and set their experience level.

![Project Builder](ProjectBuilder.png)

### AI-Generated Blueprint — Development Roadmap
The AI breaks the idea into a clear, numbered set of build phases.

![AI Blueprint](AIBlueprint.png)

### Project Dashboard
The central workspace showing project overview, tags, and live progress.

![Project Dashboard](ProjectDashboard.png)

### Phase Workspace
Focused, checklist-driven views for working through the roadmap one phase at a time — including smart "what to do next" suggestions.

![Phase Workspace](PhaseWorkspace.png)

### AI Mentor
The AI Mentor interface for project-aware development guidance.

![AI Mentor](AIMentor.png)

---

## 21. Development Philosophy

> **Don't try to build everything at once.**

```
Understand → Plan → Break Down → Build → Test → Improve
```

A large project becomes much easier when divided into smaller, manageable stages. AI Project Mentor moves developers from:

*"What should I build?"* → *"Here is my plan."* → *"Here is what I should build next."*

---

## 22. Conclusion

AI Project Mentor demonstrates how AI-assisted planning can simplify the early stages of software development. Instead of leaving developers with a blank editor, it provides a structured path:

```
IDEA → UNDERSTAND → PLAN → BUILD → IMPROVE
```

The project combines a modern React frontend with a Node.js backend to create an interactive project-planning environment.

> **Turn an idea into a plan, and turn the plan into a project.**

This implementation lays the foundation for a larger vision: an intelligent development companion capable of understanding requirements, guiding development, tracking progress, analyzing codebases, and helping developers continuously improve.

---

## 23. Project Vision

AI Project Mentor is not intended to remain only a project generator. The long-term vision is an AI-powered development companion that stays with a developer through the entire project lifecycle.

```
💡 IDEA
   ↓
🧠 UNDERSTAND
   ↓
📋 PLAN & BLUEPRINT
   ↓
🛠️ BUILD
   ↓
📊 TRACK PROGRESS
   ↓
🤖 AI GUIDANCE
   ↓
🔍 ANALYZE & IMPROVE
   ↓
🚀 BETTER PROJECT
```

**The ultimate goal:** from a simple idea to a structured project — and eventually, from a project plan to a complete development journey.

---

<div align="center">

### ⭐ AI Project Mentor
**Plan smarter. Build better. Learn while building.**

</div>

