import { useState } from "react";

import ProjectBuilder from "./pages/ProjectBuilder";
import ProjectBlueprint from "./pages/ProjectBlueprint";
import ProjectDashboard from "./pages/ProjectDashboard";
import AIMentor from "./pages/AIMentor";

function App() {
  // =====================================================
  // LOAD PROJECT FROM LOCAL STORAGE
  // =====================================================

  const loadSavedProject = () => {
    try {
      const savedProject = localStorage.getItem(
        "ai-project-current"
      );

      if (!savedProject) {
        return null;
      }

      return JSON.parse(savedProject);
    } catch (error) {
      console.error(
        "Failed to load saved project:",
        error
      );

      return null;
    }
  };

  // =====================================================
  // APP STATE
  // =====================================================

  const [currentPage, setCurrentPage] =
    useState("home");

  const [project, setProject] =
    useState(loadSavedProject);

  // =====================================================
  // OPEN PROJECT BUILDER
  // =====================================================

  const openBuilder = () => {
    setCurrentPage("builder");
  };

  // =====================================================
  // GENERATE BLUEPRINT
  // =====================================================

  const handleGenerateBlueprint = (newProject) => {
    console.log(
      "===================================="
    );

    console.log(
      "PROJECT RECEIVED BY APP:"
    );

    console.log(newProject);

    console.log(
      "===================================="
    );

    if (!newProject) {
      console.error(
        "No project was received."
      );

      return;
    }

    // Save in React state
    setProject(newProject);

    // Save permanently in browser
    try {
      localStorage.setItem(
        "ai-project-current",
        JSON.stringify(newProject)
      );

      console.log(
        "Project successfully saved to localStorage."
      );
    } catch (error) {
      console.error(
        "Failed to save project:",
        error
      );
    }

    // Navigate to blueprint
    setCurrentPage("blueprint");
  };

  // =====================================================
  // START BUILDING
  // =====================================================

  const handleStartBuilding = () => {
    console.log(
      "Starting project with:",
      project
    );

    if (!project) {
      console.error(
        "No project found while trying to start building."
      );

      setCurrentPage("builder");

      return;
    }

    setCurrentPage("dashboard");
  };

  // =====================================================
  // CREATE ANOTHER PROJECT
  // =====================================================

  const handleCreateAnother = () => {
    setCurrentPage("builder");
  };

  // =====================================================
  // BACK TO BLUEPRINT
  // =====================================================

  const handleBackToBlueprint = () => {
    if (project) {
      setCurrentPage("blueprint");
    } else {
      setCurrentPage("builder");
    }
  };

  // =====================================================
  // OPEN AI MENTOR
  // =====================================================

  const handleOpenMentor = () => {
    setCurrentPage("mentor");
  };

  // =====================================================
  // HOME PAGE
  // =====================================================

  if (currentPage === "home") {
    return (
      <div className="app">

        {/* ================= NAVBAR ================= */}

        <nav className="navbar">

          <div
            className="logo"
            onClick={() =>
              setCurrentPage("home")
            }
            style={{
              cursor: "pointer",
            }}
          >
            <div className="logo-icon">
              ✦
            </div>

            <span>
              AI Project Mentor
            </span>
          </div>

          <div className="nav-links">

            <a href="#features">
              Features
            </a>

            <a href="#how-it-works">
              How it works
            </a>

            <button
              type="button"
              className="nav-button"
              onClick={openBuilder}
            >
              Start Building
            </button>

          </div>

        </nav>

        {/* ================= HERO ================= */}

        <main>

          <section className="hero">

            <div className="hero-content">

              <span className="badge">
                ✦ AI-POWERED PROJECT MENTOR
              </span>

              <h1>
                Turn your idea into
                <span>
                  a real project.
                </span>
              </h1>

              <p className="hero-description">
                Build better projects with an AI
                mentor that helps you plan,
                understand, build, and track your
                progress.
              </p>

              <div className="hero-buttons">

                <button
                  type="button"
                  className="primary-button"
                  onClick={openBuilder}
                >
                  Start Building ✦
                </button>

                <a
                  href="#how-it-works"
                  className="secondary-button"
                >
                  See How It Works
                </a>

              </div>

              <div className="hero-stats">

                <div>
                  <strong>01</strong>

                  <span>
                    Enter your idea
                  </span>
                </div>

                <div>
                  <strong>02</strong>

                  <span>
                    Get your blueprint
                  </span>
                </div>

                <div>
                  <strong>03</strong>

                  <span>
                    Start building
                  </span>
                </div>

              </div>

            </div>

            {/* ================= AI PREVIEW ================= */}

            <div className="mentor-preview">

              <div className="preview-header">

                <span>
                  <span className="status-dot" />

                  AI Project Mentor
                </span>

                <span className="preview-label">
                  ONLINE
                </span>

              </div>

              <div className="preview-message">

                <div className="ai-avatar">
                  🤖
                </div>

                <div>

                  <small>
                    AI Mentor
                  </small>

                  <p>
                    What do you want to build?
                  </p>

                </div>

              </div>

              <div className="idea-box">
                💡

                <span>
                  Describe your project idea...
                </span>
              </div>

              <button
                type="button"
                className="generate-button"
                onClick={openBuilder}
              >
                Generate Project ✦
              </button>

            </div>

          </section>

          {/* ================= FEATURES ================= */}

          <section
            className="features"
            id="features"
          >

            <div className="section-heading">

              <span>
                FEATURES
              </span>

              <h2>
                Everything you need to
                build better projects.
              </h2>

              <p>
                From your first idea to a working
                project, your AI mentor guides you
                through every important step.
              </p>

            </div>

            <div className="feature-grid">

              <div className="feature-card">

                <div className="feature-icon">
                  💡
                </div>

                <h3>
                  Project Ideas
                </h3>

                <p>
                  Turn simple ideas into structured
                  and practical project concepts.
                </p>

              </div>

              <div className="feature-card">

                <div className="feature-icon">
                  🧩
                </div>

                <h3>
                  Smart Blueprint
                </h3>

                <p>
                  Get features, technology,
                  roadmap, and development guidance.
                </p>

              </div>

              <div className="feature-card">

                <div className="feature-icon">
                  🤖
                </div>

                <h3>
                  AI Mentor
                </h3>

                <p>
                  Ask questions and get help when
                  you are stuck during development.
                </p>

              </div>

              <div className="feature-card">

                <div className="feature-icon">
                  📊
                </div>

                <h3>
                  Progress Tracking
                </h3>

                <p>
                  Track completed roadmap phases
                  and see your project progress.
                </p>

              </div>

            </div>

          </section>

          {/* ================= HOW IT WORKS ================= */}

          <section
            className="how-it-works"
            id="how-it-works"
          >

            <div className="section-heading">

              <span>
                HOW IT WORKS
              </span>

              <h2>
                From idea to implementation.
              </h2>

            </div>

            <div className="steps">

              <div className="step">

                <div className="step-number">
                  01
                </div>

                <h3>
                  Describe your idea
                </h3>

                <p>
                  Tell the mentor what you want
                  to build in your own words.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  02
                </div>

                <h3>
                  Generate a blueprint
                </h3>

                <p>
                  Get a structured plan with
                  features, technology, and roadmap.
                </p>

              </div>

              <div className="step">

                <div className="step-number">
                  03
                </div>

                <h3>
                  Build and track
                </h3>

                <p>
                  Follow the roadmap and track
                  your progress as you build.
                </p>

              </div>

            </div>

          </section>

          {/* ================= CTA ================= */}

          <section className="cta">

            <h2>
              Ready to build?
            </h2>

            <p>
              Start with an idea. Your AI mentor
              will help with the rest.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={openBuilder}
            >
              Start Building ✦
            </button>

          </section>

        </main>

        {/* ================= FOOTER ================= */}

        <footer>

          <p>
            © 2026 AI Project Mentor
          </p>

          <p>
            Build. Learn. Create.
          </p>

        </footer>

      </div>
    );
  }

  // =====================================================
  // PROJECT BUILDER
  // =====================================================

  if (currentPage === "builder") {
    return (
      <ProjectBuilder
        onGenerateBlueprint={
          handleGenerateBlueprint
        }
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =====================================================
  // PROJECT BLUEPRINT
  // =====================================================

  if (currentPage === "blueprint") {
    return (
      <ProjectBlueprint
        project={project}
        onCreateAnother={
          handleCreateAnother
        }
        onStartBuilding={
          handleStartBuilding
        }
      />
    );
  }

  // =====================================================
  // PROJECT DASHBOARD
  // =====================================================

  if (currentPage === "dashboard") {
    return (
      <ProjectDashboard
        project={project}
        onBackToBlueprint={
          handleBackToBlueprint
        }
        onOpenMentor={
          handleOpenMentor
        }
      />
    );
  }

  // =====================================================
  // AI MENTOR
  // =====================================================

  if (currentPage === "mentor") {
    return (
      <AIMentor
        project={project}
        onBack={() => {
          if (project) {
            setCurrentPage("dashboard");
          } else {
            setCurrentPage("home");
          }
        }}
      />
    );
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return (
    <div className="app">

      <h1>
        Something went wrong.
      </h1>

      <button
        type="button"
        className="primary-button"
        onClick={() =>
          setCurrentPage("home")
        }
      >
        Go Home
      </button>

    </div>
  );
}

export default App;