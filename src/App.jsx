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
// HOME PAGE — LIGHT FUTURISTIC REDESIGN
// =====================================================

if (currentPage === "home") {
  return (
    <div className="home-redesign">

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="home-nav">

        <div
          className="home-brand"
          onClick={handleGoHome}
          role="button"
          tabIndex={0}
        >
          <div className="home-brand-icon">
            ✦
          </div>

          <span>AI Project Mentor</span>
        </div>

        <div className="home-nav-links">

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How it works
          </a>

          <button
            type="button"
            className="home-nav-button"
            onClick={openBuilder}
          >
            Start Building ✦
          </button>

        </div>

      </nav>


      {/* =================================================
          HERO
      ================================================= */}

      <main>

        <section className="home-hero">

          {/* Decorative background elements */}

          <div className="hero-orb hero-orb-left" />
          <div className="hero-orb hero-orb-right" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-dots hero-dots-left">
            {Array.from({ length: 36 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="hero-dots hero-dots-right">
            {Array.from({ length: 36 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>


          {/* HERO CONTENT */}

          <div className="home-hero-content">

            <div className="home-eyebrow">
              <span className="eyebrow-dot" />
              AI-POWERED PROJECT MENTOR
            </div>

            <h1>
              Turn your idea into
              <span>
                a real project.
              </span>
            </h1>

            <p>
              Build better projects with an AI mentor
              that helps you plan, understand, build,
              and track your progress.
            </p>

            <div className="home-hero-buttons">

              <button
                type="button"
                className="home-primary-button"
                onClick={openBuilder}
              >
                Start Building ✦
              </button>

              <a
                href="#how-it-works"
                className="home-secondary-button"
              >
                <span>▷</span>
                See How It Works
              </a>

            </div>

          </div>


          {/* =================================================
              THREE STEP PROCESS
          ================================================= */}

          <div className="home-process">

            <div className="home-process-step">

              <div className="process-icon">
                ✎
              </div>

              <strong>01</strong>

              <span>
                Enter your idea
              </span>

            </div>


            <div className="process-line" />


            <div className="home-process-step">

              <div className="process-icon">
                ◫
              </div>

              <strong>02</strong>

              <span>
                Get your blueprint
              </span>

            </div>


            <div className="process-line" />


            <div className="home-process-step">

              <div className="process-icon">
                🚀
              </div>

              <strong>03</strong>

              <span>
                Start building
              </span>

            </div>

          </div>


          {/* =================================================
              AI MENTOR PREVIEW
          ================================================= */}

          <div className="home-preview-wrapper">

            <div className="home-preview">

              <div className="preview-top">

                <div className="preview-title">

                  <span className="preview-online-dot" />

                  <span>
                    AI Project Mentor
                  </span>

                </div>

                <span className="preview-online">
                  <span />
                  ONLINE
                </span>

              </div>


              <div className="preview-body">

                <div className="preview-avatar">
                  🤖
                </div>

                <div className="preview-question">

                  <span>
                    AI Mentor
                  </span>

                  <strong>
                    What do you want to build?
                  </strong>

                </div>

              </div>


              <div className="preview-input">

                <span className="preview-bulb">
                  💡
                </span>

                <span>
                  Describe your project idea...
                </span>

              </div>


              <button
                type="button"
                className="preview-generate"
                onClick={openBuilder}
              >
                Generate Project ✦
              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          className="home-features"
          id="features"
        >

          <div className="home-section-heading">

            <span>
              FEATURES
            </span>

            <h2>
              Everything you need to
              <span>build better projects.</span>
            </h2>

            <p>
              From your first idea to a working project,
              your AI mentor guides you through every
              important step.
            </p>

          </div>


          <div className="home-feature-grid">

            <div className="home-feature-card">

              <div className="home-feature-icon">
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


            <div className="home-feature-card">

              <div className="home-feature-icon">
                🧩
              </div>

              <h3>
                Smart Blueprint
              </h3>

              <p>
                Get features, technology, roadmap,
                and development guidance.
              </p>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                🤖
              </div>

              <h3>
                AI Mentor
              </h3>

              <p>
                Ask questions and get help whenever
                you are stuck during development.
              </p>

            </div>


            <div className="home-feature-card">

              <div className="home-feature-icon">
                📊
              </div>

              <h3>
                Progress Tracking
              </h3>

              <p>
                Track roadmap phases and see how
                your project is progressing.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <section
          className="home-how"
          id="how-it-works"
        >

          <div className="home-section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              From idea to implementation.
            </h2>

          </div>


          <div className="home-how-grid">

            <div className="home-how-card">

              <div className="how-number">
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


            <div className="home-how-card">

              <div className="how-number">
                02
              </div>

              <h3>
                Generate a blueprint
              </h3>

              <p>
                Get a structured plan with features,
                technology, and a roadmap.
              </p>

            </div>


            <div className="home-how-card">

              <div className="how-number">
                03
              </div>

              <h3>
                Build and track
              </h3>

              <p>
                Follow your roadmap and track
                your progress as you build.
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="home-cta">

          <div className="cta-glow" />

          <div className="cta-content">

            <span>
              READY TO BUILD?
            </span>

            <h2>
              Turn your idea into
              <strong>something real.</strong>
            </h2>

            <p>
              Start with an idea. Your AI mentor
              will help with the rest.
            </p>

            <button
              type="button"
              className="home-primary-button"
              onClick={openBuilder}
            >
              Start Building ✦
            </button>

          </div>

        </section>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="home-footer">

        <span>
          © 2026 AI Project Mentor
        </span>

        <span>
          Build. Learn. Create.
        </span>

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