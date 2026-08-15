import { useState } from "react";

function ProjectBuilder({
  onGenerateBlueprint,
  onBack,
}) {
  const [idea, setIdea] = useState("");

  const [experience, setExperience] =
    useState("Beginner");

  const [category, setCategory] =
    useState("AI / Machine Learning");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const examples = [
    "I want to build an AI assistant for students",
    "I want to build a student expense tracker",
    "I want to build an AI resume analyzer",
    "I want to build a study planner",
  ];

  // =====================================================
  // GENERATE PROJECT
  // =====================================================

  const handleGenerate = () => {
    const cleanIdea = idea.trim();

    if (!cleanIdea) {
      alert(
        "Please enter your project idea first."
      );

      return;
    }

    setIsGenerating(true);

    // ===================================================
    // PROJECT BLUEPRINT DATA
    // ===================================================

    const project = {
      id: Date.now(),

      title:
        cleanIdea.length > 45
          ? cleanIdea.substring(0, 45) + "..."
          : cleanIdea,

      idea: cleanIdea,

      category,

      experience,

      // =================================================
      // PROBLEM
      // =================================================

      problem:
        "Students often struggle to organize their learning, understand difficult topics, and maintain a consistent study routine.",

      // =================================================
      // SOLUTION
      // =================================================

      solution:
        "Build an intelligent study assistant that helps students create study plans, understand concepts, track progress, and stay organized.",

      // =================================================
      // TARGET USERS
      // =================================================

      users: [
        "College Students",
        "School Students",
        "Beginner Developers",
        "Self Learners",
      ],

      // Keep this too for compatibility
      targetUsers: [
        "College Students",
        "School Students",
        "Beginner Developers",
        "Self Learners",
      ],

      // =================================================
      // FEATURES
      // =================================================

      features: [
        {
          number: "01",
          title: "AI Conversation",
          description:
            "Allow students to ask questions and interact with the study assistant using natural language.",
        },

        {
          number: "02",
          title: "Personalized Study Plans",
          description:
            "Create study plans based on subjects, available time, and learning goals.",
        },

        {
          number: "03",
          title: "Smart Explanations",
          description:
            "Explain difficult concepts in simple and beginner-friendly language.",
        },

        {
          number: "04",
          title: "Progress Tracking",
          description:
            "Allow students to track completed topics and monitor their learning progress.",
        },

        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Make the application accessible on desktop, tablet, and mobile devices.",
        },
      ],

      // =================================================
      // TECH STACK
      // =================================================

      techStack: {
        frontend: [
          "React",
          "JavaScript",
          "CSS",
        ],

        backend: [
          "Node.js",
          "Express.js",
        ],

        ai: [
          "AI Mentor Logic",
          "Prompt Engineering",
        ],

        database: [
          "Local Storage",
        ],
      },

      // =================================================
      // ROADMAP
      // =================================================

      roadmap: [
        {
          phase: "01",
          title: "Project Setup",
          description:
            "Initialize the React frontend and Node.js backend.",
        },

        {
          phase: "02",
          title: "Build Study Dashboard",
          description:
            "Create the main dashboard for subjects, study plans, and progress.",
        },

        {
          phase: "03",
          title: "Build AI Mentor",
          description:
            "Create the mentor system that can understand student questions and provide useful guidance.",
        },

        {
          phase: "04",
          title: "Add Progress Tracking",
          description:
            "Track completed topics, study sessions, and learning progress.",
        },

        {
          phase: "05",
          title: "Testing & Deployment",
          description:
            "Test the application, improve the interface, and prepare the project for deployment.",
        },
      ],

      // =================================================
      // PROJECT STATS
      // =================================================

      difficulty:
        "Beginner → Intermediate",

      impact: "High",

      // =================================================
      // INSIGHTS
      // =================================================

      insights: [
        {
          number: "01",
          title: "Start Small",
          description:
            "Build the study planner and dashboard first before adding advanced AI functionality.",
        },

        {
          number: "02",
          title: "Focus on Students",
          description:
            "Design every feature around solving real problems faced by students.",
        },

        {
          number: "03",
          title: "Test Continuously",
          description:
            "Test every feature as you build instead of waiting until the end.",
        },

        {
          number: "04",
          title: "Build an MVP",
          description:
            "Start with a simple working version and gradually add advanced features.",
        },
      ],
    };

    console.log(
      "GENERATED PROJECT:",
      project
    );

    // Small loading effect
    setTimeout(() => {
      setIsGenerating(false);

      if (
        typeof onGenerateBlueprint ===
        "function"
      ) {
        onGenerateBlueprint(project);
      } else {
        console.error(
          "onGenerateBlueprint function is missing."
        );
      }
    }, 500);
  };

  // =====================================================
  // EXAMPLE CLICK
  // =====================================================

  const handleExampleClick = (example) => {
    setIdea(example);
  };

  // =====================================================
  // KEYBOARD SHORTCUT
  // =====================================================

  const handleKeyDown = (event) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "Enter"
    ) {
      event.preventDefault();

      handleGenerate();
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="builder-page">

      <div className="builder-container">

        {/* ================= HEADER ================= */}

        <header className="builder-header">

          <span className="builder-badge">
            ✦ AI PROJECT BUILDER
          </span>

          <h1>
            Turn your idea into
            <span>
              {" "}a project.
            </span>
          </h1>

          <p>
            Describe what you want to build and
            let your AI Project Mentor create a
            structured project blueprint for you.
          </p>

        </header>

        {/* ================= BUILDER CARD ================= */}

        <section className="builder-card">

          {/* PROJECT IDEA */}

          <div className="builder-field">

            <label htmlFor="project-idea">
              WHAT DO YOU WANT TO BUILD?
            </label>

            <textarea
              id="project-idea"
              value={idea}
              onChange={(event) =>
                setIdea(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Example: I want to build an AI assistant that helps students organize their studies..."
              rows={8}
              disabled={isGenerating}
              autoFocus
            />

            <div className="character-count">
              {idea.length} characters
            </div>

          </div>

          {/* CATEGORY */}

          <div className="builder-field">

            <label htmlFor="project-category">
              PROJECT CATEGORY
            </label>

            <select
              id="project-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              disabled={isGenerating}
            >
              <option value="AI / Machine Learning">
                AI / Machine Learning
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Data Science">
                Data Science
              </option>

              <option value="Mobile Development">
                Mobile Development
              </option>

              <option value="Software Development">
                Software Development
              </option>

            </select>

          </div>

          {/* EXPERIENCE */}

          <div className="builder-field">

            <label>
              YOUR EXPERIENCE LEVEL
            </label>

            <div className="experience-options">

              {[
                "Beginner",
                "Intermediate",
                "Advanced",
              ].map((level) => (

                <button
                  key={level}
                  type="button"
                  className={
                    experience === level
                      ? "experience-option active"
                      : "experience-option"
                  }
                  onClick={() =>
                    setExperience(level)
                  }
                  disabled={isGenerating}
                >
                  {level}
                </button>

              ))}

            </div>

          </div>

          {/* GENERATE BUTTON */}

          <button
            type="button"
            className="generate-plan-button"
            onClick={handleGenerate}
            disabled={
              !idea.trim() ||
              isGenerating
            }
          >
            {isGenerating
              ? "Creating Your Blueprint..."
              : "Generate Project Blueprint ✦"}
          </button>

          <p
            style={{
              marginTop: "12px",
              textAlign: "center",
              fontSize: "11px",
              color: "#999aa6",
            }}
          >
            Press Ctrl + Enter to generate
          </p>

        </section>

        {/* ================= EXAMPLES ================= */}

        <div className="builder-examples">

          <p>
            Not sure what to build?
            Try one of these:
          </p>

          <div className="example-list">

            {examples.map(
              (example, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    handleExampleClick(
                      example
                    )
                  }
                  disabled={isGenerating}
                >
                  {example}
                </button>

              )
            )}

          </div>

        </div>

        {/* ================= BACK ================= */}

        {onBack && (

          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
          >

            <button
              type="button"
              className="secondary-button"
              onClick={onBack}
              disabled={isGenerating}
            >
              ← Back
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProjectBuilder;