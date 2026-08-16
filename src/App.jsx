import { useEffect, useState } from "react";

import ProjectBuilder from "./pages/ProjectBuilder";
import ProjectBlueprint from "./pages/ProjectBlueprint";
import ProjectDashboard from "./pages/ProjectDashboard";
import AIMentor from "./pages/AIMentor";

function App() {
  // =====================================================
  // LOAD SAVED PROJECT
  // =====================================================

  const loadSavedProject = () => {
    try {
      const savedProject = localStorage.getItem(
        "ai-project-current"
      );

      if (!savedProject) {
        return null;
      }

      const parsedProject = JSON.parse(savedProject);

      return parsedProject;
    } catch (error) {
      console.error(
        "Failed to load saved project:",
        error
      );

      return null;
    }
  };

  // =====================================================
  // LOAD SAVED PAGE
  // =====================================================

  const loadSavedPage = () => {
    try {
      const savedPage = localStorage.getItem(
        "ai-project-page"
      );

      const savedProject =
        localStorage.getItem(
          "ai-project-current"
        );

      // -------------------------------------------------
      // NO PROJECT
      // -------------------------------------------------

      if (!savedProject) {
        return "home";
      }

      // -------------------------------------------------
      // IMPORTANT:
      // AI MENTOR IS PAUSED FOR NOW.
      //
      // If an old session saved "mentor",
      // do NOT reopen it.
      // Open the project dashboard instead.
      // -------------------------------------------------

      if (savedPage === "mentor") {
        return "dashboard";
      }

      // -------------------------------------------------
      // VALID PAGES
      // -------------------------------------------------

      const validPages = [
        "home",
        "builder",
        "blueprint",
        "dashboard",
        "mentor",
      ];

      if (
        savedPage &&
        validPages.includes(savedPage)
      ) {
        return savedPage;
      }

      // -------------------------------------------------
      // DEFAULT
      // -------------------------------------------------

      return "dashboard";
    } catch (error) {
      console.error(
        "Failed to load saved page:",
        error
      );

      return "home";
    }
  };

  // =====================================================
  // APP STATE
  // =====================================================

  
    const [project, setProject] =
  useState(loadSavedProject);

const [currentPage, setCurrentPage] =
  useState(() => {
    const isExistingSession =
      sessionStorage.getItem("ai-project-session");

    if (!isExistingSession) {
      sessionStorage.setItem(
        "ai-project-session",
        "active"
      );

      return "home";
    }

    return loadSavedPage();
  });

  // =====================================================
  // SAVE CURRENT PAGE
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "ai-project-page",
        currentPage
      );

      console.log(
        "Current page saved:",
        currentPage
      );
    } catch (error) {
      console.error(
        "Failed to save current page:",
        error
      );
    }
  }, [currentPage]);

  // =====================================================
  // SAVE PROJECT
  // =====================================================

  useEffect(() => {
    if (!project) {
      return;
    }

    try {
      localStorage.setItem(
        "ai-project-current",
        JSON.stringify(project)
      );

      console.log(
        "Current project saved."
      );
    } catch (error) {
      console.error(
        "Failed to save project:",
        error
      );
    }
  }, [project]);

  // =====================================================
  // OPEN BUILDER
  // =====================================================

  const openBuilder = () => {
    setCurrentPage("builder");
  };

  // =====================================================
  // GENERATE BLUEPRINT
  // =====================================================

  const handleGenerateBlueprint = (
    newProject
  ) => {
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

    // Save project in React state
    setProject(newProject);

    // Save project permanently
    try {
      localStorage.setItem(
        "ai-project-current",
        JSON.stringify(newProject)
      );

      console.log(
        "Project successfully saved."
      );
    } catch (error) {
      console.error(
        "Failed to save project:",
        error
      );
    }

    // Go to blueprint
    setCurrentPage("blueprint");
  };

  // =====================================================
  // START BUILDING
  // =====================================================

  const handleStartBuilding = () => {
    console.log(
      "Starting project:"
    );

    console.log(project);

    if (!project) {
      console.error(
        "Cannot open dashboard because no project exists."
      );

      setCurrentPage("builder");

      return;
    }

    // -------------------------------------------------
    // IMPORTANT:
    // The main project workspace is now the dashboard.
    // -------------------------------------------------

    setCurrentPage("dashboard");
  };

  // =====================================================
  // CREATE ANOTHER PROJECT
  // =====================================================

  const handleCreateAnother = () => {
    setCurrentPage("builder");
  };

  // =====================================================
  // BACK TO HOME
  // =====================================================

  const handleGoHome = () => {
    setCurrentPage("home");
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
  // OPEN DASHBOARD
  // =====================================================

  const handleOpenDashboard = () => {
    if (!project) {
      setCurrentPage("builder");
      return;
    }

    setCurrentPage("dashboard");
  };

  // =====================================================
  // AI MENTOR
  //
  // TEMPORARILY KEPT AVAILABLE.
  // It is NOT the default page anymore.
  // =====================================================

  const handleOpenMentor = () => {
    if (!project) {
      setCurrentPage("home");
      return;
    }

    setCurrentPage("mentor");
  };

  // =====================================================
  // HOME PAGE
  // =====================================================

  if (currentPage === "home") {
    return (
      <div className="app">

        {/* =================================================
            NAVBAR
        ================================================= */}

        <nav className="navbar">

          <div
            className="logo"
            onClick={handleGoHome}
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

        {/* =================================================
            HERO
        ================================================= */}

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

            {/* =================================================
                AI PREVIEW
            ================================================= */}

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

          {/* =================================================
              FEATURES
          ================================================= */}

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

          {/* =================================================
              HOW IT WORKS
          ================================================= */}

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

          {/* =================================================
              CTA
          ================================================= */}

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

        {/* =================================================
            FOOTER
        ================================================= */}

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
        onBack={handleGoHome}
      />
    );
  }

  // =====================================================
  // PROJECT BLUEPRINT
  // =====================================================

  if (currentPage === "blueprint") {

    if (!project) {
      setCurrentPage("builder");

      return null;
    }

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
  // PROJECT DASHBOARD / WORKSPACE
  // =====================================================

  if (currentPage === "dashboard") {

    if (!project) {
      return (
        <div className="app">

          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >

            <h1>
              No project found
            </h1>

            <p>
              Create a project first.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={openBuilder}
            >
              Create Project
            </button>

          </div>

        </div>
      );
    }

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
  //
  // TEMPORARY:
  // This page is still accessible from the dashboard,
  // but it will NEVER be restored automatically after
  // refresh while the feature is paused.
  // =====================================================

  if (currentPage === "mentor") {

    if (!project) {
      setCurrentPage("home");

      return null;
    }

    return (
      <AIMentor
        project={project}
        onBack={() => {
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  // =====================================================
  // FALLBACK
  // =====================================================

  return (
    <div className="app">

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          textAlign: "center",
        }}
      >

        <h1>
          Something went wrong.
        </h1>

        <p>
          Let's return to your project workspace.
        </p>

        <button
          type="button"
          className="primary-button"
          onClick={() => {
            if (project) {
              setCurrentPage("dashboard");
            } else {
              setCurrentPage("home");
            }
          }}
        >
          {project
            ? "Open Project Workspace"
            : "Go Home"}
        </button>

      </div>

    </div>
  );
}

export default App;