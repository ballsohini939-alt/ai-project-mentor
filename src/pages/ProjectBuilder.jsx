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
  // CREATE BLUEPRINT FROM IDEA
  // =====================================================

  const createBlueprint = (cleanIdea) => {
    const lowerIdea = cleanIdea.toLowerCase();

    // ===================================================
    // DEFAULT PROJECT
    // ===================================================

    let title = "AI Project";

    let problem =
      "Beginner developers often struggle to turn project ideas into practical applications.";

    let solution =
      "Build a practical application that solves a real problem using modern web technologies.";

    let users = [
      "College Students",
      "Beginner Developers",
      "Self Learners",
    ];

    let features = [
      {
        number: "01",
        title: "Core Functionality",
        description:
          "Implement the main functionality required by the project.",
      },
      {
        number: "02",
        title: "User Interface",
        description:
          "Create a clean and responsive interface for users.",
      },
      {
        number: "03",
        title: "Smart Assistance",
        description:
          "Provide useful guidance and intelligent suggestions.",
      },
      {
        number: "04",
        title: "Progress Tracking",
        description:
          "Allow users to monitor important activity and progress.",
      },
      {
        number: "05",
        title: "Responsive Interface",
        description:
          "Make the application usable across different screen sizes.",
      },
    ];

    let roadmap = [
      {
        phase: "01",
        title: "Project Setup",
        description:
          "Initialize the project structure and development environment.",
      },
      {
        phase: "02",
        title: "Build Core Features",
        description:
          "Implement the main functionality of the project.",
      },
      {
        phase: "03",
        title: "Build AI Mentor",
        description:
          "Create project-aware development guidance.",
      },
      {
        phase: "04",
        title: "Add Progress Tracking",
        description:
          "Track completed features and project progress.",
      },
      {
        phase: "05",
        title: "Testing & Deployment",
        description:
          "Test the application, fix issues, improve the interface, and prepare it for deployment.",
      },
    ];

    let insights = [
      {
        number: "01",
        title: "Start Small",
        description:
          "Build the most important functionality first before adding advanced features.",
      },
      {
        number: "02",
        title: "Focus on Users",
        description:
          "Design every feature around solving a real user problem.",
      },
      {
        number: "03",
        title: "Test Continuously",
        description:
          "Test every feature while building instead of waiting until the end.",
      },
      {
        number: "04",
        title: "Build an MVP",
        description:
          "Start with a simple working version and gradually add advanced capabilities.",
      },
    ];

    // ===================================================
    // AI PERSONAL ASSISTANT
    // IMPORTANT:
    // This must be checked BEFORE STUDY ASSISTANT.
    // ===================================================

    if (
      lowerIdea.includes("personal assistant") ||
      lowerIdea.includes("ai assistant") ||
      lowerIdea.includes("virtual assistant") ||
      lowerIdea.includes("personal ai")
    ) {
      title = "AI Personal Assistant";

      problem =
        "Users often need help organizing tasks, finding information, planning activities, and managing everyday work.";

      solution =
        "Build an AI personal assistant that understands user requests and provides useful assistance through a simple conversational interface.";

      users = [
        "College Students",
        "Professionals",
        "Beginner Developers",
        "General Users",
      ];

      features = [
        {
          number: "01",
          title: "AI Conversation",
          description:
            "Allow users to communicate with the assistant using natural language.",
        },
        {
          number: "02",
          title: "Task Management",
          description:
            "Allow users to create, organize, and manage daily tasks.",
        },
        {
          number: "03",
          title: "Smart Suggestions",
          description:
            "Provide useful suggestions based on the user's requests.",
        },
        {
          number: "04",
          title: "Personalized Assistance",
          description:
            "Adapt assistance according to the user's goals and requirements.",
        },
        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Provide a clean interface that works across different screen sizes.",
        },
      ];

      roadmap = [
        {
          phase: "01",
          title: "Project Setup",
          description:
            "Initialize the React frontend and Node.js backend.",
        },
        {
          phase: "02",
          title: "Build AI Conversation",
          description:
            "Create the main conversational interface and project-aware assistant logic.",
        },
        {
          phase: "03",
          title: "Build Task Management",
          description:
            "Allow users to create, organize, update, and complete tasks.",
        },
        {
          phase: "04",
          title: "Add Smart Assistance",
          description:
            "Add personalized suggestions and useful assistant capabilities.",
        },
        {
          phase: "05",
          title: "Testing & Deployment",
          description:
            "Test the application, improve the interface, and prepare the project for deployment.",
        },
      ];

      insights = [
        {
          number: "01",
          title: "Build the Conversation First",
          description:
            "Make the assistant's main conversational experience work before adding advanced features.",
        },
        {
          number: "02",
          title: "Keep the MVP Simple",
          description:
            "Start with a few useful assistant capabilities instead of trying to build everything at once.",
        },
        {
          number: "03",
          title: "Add Tasks Next",
          description:
            "Task management gives the assistant a practical real-world use case.",
        },
        {
          number: "04",
          title: "Improve Intelligence Gradually",
          description:
            "Start with rule-based project-aware logic and add an external LLM later if needed.",
        },
      ];
    }

    // ===================================================
    // STUDY ASSISTANT
    // Checked AFTER AI PERSONAL ASSISTANT.
    // ===================================================

    else if (
      lowerIdea.includes("study assistant") ||
      lowerIdea.includes("study planner") ||
      lowerIdea.includes("study plan") ||
      lowerIdea.includes("learning assistant") ||
      lowerIdea.includes("learning planner") ||
      lowerIdea.includes("study app")
    ) {
      title = "AI Study Assistant";

      problem =
        "Students often struggle to organize their learning, understand difficult topics, and maintain a consistent study routine.";

      solution =
        "Build an intelligent study assistant that helps students create study plans, understand concepts, track progress, and stay organized.";

      users = [
        "College Students",
        "School Students",
        "Self Learners",
      ];

      features = [
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
            "Allow students to track completed topics and monitor learning progress.",
        },
        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Make the application accessible across desktop, tablet, and mobile devices.",
        },
      ];

      roadmap = [
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
      ];
    }

    // ===================================================
    // EXPENSE TRACKER / FINANCE
    // ===================================================

    else if (
      lowerIdea.includes("expense tracker") ||
      lowerIdea.includes("expense") ||
      lowerIdea.includes("finance") ||
      lowerIdea.includes("budget tracker") ||
      lowerIdea.includes("budget manager")
    ) {
      title = "Smart Personal Finance Tracker";

      problem =
        "Users often find it difficult to track spending and understand where their money is going.";

      solution =
        "Build a finance management application that helps users record transactions, monitor spending, and manage budgets.";

      users = [
        "College Students",
        "Young Professionals",
        "Families",
        "General Users",
      ];

      features = [
        {
          number: "01",
          title: "Transaction Tracking",
          description:
            "Allow users to record income and expenses.",
        },
        {
          number: "02",
          title: "Budget Management",
          description:
            "Allow users to create and monitor budgets.",
        },
        {
          number: "03",
          title: "Financial Summary",
          description:
            "Display income, expenses, savings, and balance.",
        },
        {
          number: "04",
          title: "Spending Insights",
          description:
            "Show useful information about spending patterns.",
        },
        {
          number: "05",
          title: "Responsive Dashboard",
          description:
            "Provide a clean dashboard for managing finances.",
        },
      ];
    }

    // ===================================================
    // TODO / TASK MANAGER
    // ===================================================

    else if (
      lowerIdea.includes("todo") ||
      lowerIdea.includes("to-do") ||
      lowerIdea.includes("task manager") ||
      lowerIdea.includes("task management")
    ) {
      title = "Smart Task Manager";

      problem =
        "People often struggle to organize tasks and remember what needs to be completed.";

      solution =
        "Build a task management application that helps users organize, prioritize, and track their work.";

      users = [
        "Students",
        "Professionals",
        "Teams",
        "General Users",
      ];

      features = [
        {
          number: "01",
          title: "Task Creation",
          description:
            "Allow users to create new tasks.",
        },
        {
          number: "02",
          title: "Task Organization",
          description:
            "Allow users to organize tasks by priority and category.",
        },
        {
          number: "03",
          title: "Progress Tracking",
          description:
            "Track completed and pending tasks.",
        },
        {
          number: "04",
          title: "Task Prioritization",
          description:
            "Help users identify important tasks.",
        },
        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Provide a simple interface across devices.",
        },
      ];
    }

    // ===================================================
    // CHATBOT
    // ===================================================

    else if (
      lowerIdea.includes("chatbot") ||
      lowerIdea.includes("chat bot") ||
      lowerIdea.includes("conversational ai")
    ) {
      title = "AI Chatbot";

      problem =
        "Users need a simple way to interact with an intelligent system and receive useful responses.";

      solution =
        "Build a conversational chatbot that understands user questions and provides helpful responses.";

      users = [
        "Students",
        "Customers",
        "Professionals",
        "General Users",
      ];

      features = [
        {
          number: "01",
          title: "AI Conversation",
          description:
            "Allow users to communicate with the chatbot using natural language.",
        },
        {
          number: "02",
          title: "Context Awareness",
          description:
            "Maintain useful context during conversations.",
        },
        {
          number: "03",
          title: "Smart Responses",
          description:
            "Provide relevant responses to user questions.",
        },
        {
          number: "04",
          title: "Conversation History",
          description:
            "Allow users to review previous messages.",
        },
        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Create a clean chat interface for different devices.",
        },
      ];
    }

    // ===================================================
    // PROJECT MENTOR
    // ===================================================

    else if (
      lowerIdea.includes("project mentor")
    ) {
      title = "AI Project Mentor";

      problem =
        "Beginner developers often have project ideas but do not know how to convert them into practical implementations.";

      solution =
        "Build an AI project mentor that transforms ideas into structured project plans and guides users through development.";

      users = [
        "Beginner Developers",
        "College Students",
        "Self Learners",
      ];

      features = [
        {
          number: "01",
          title: "Idea Analysis",
          description:
            "Analyze a project idea and understand its purpose.",
        },
        {
          number: "02",
          title: "Project Blueprint",
          description:
            "Generate a structured plan for building the project.",
        },
        {
          number: "03",
          title: "AI Mentor",
          description:
            "Provide project-specific development guidance.",
        },
        {
          number: "04",
          title: "Progress Tracking",
          description:
            "Track completed roadmap phases.",
        },
        {
          number: "05",
          title: "Responsive Interface",
          description:
            "Provide a clean workspace across devices.",
        },
      ];
    }

    // ===================================================
    // RETURN BLUEPRINT
    // ===================================================

    return {
      id: Date.now(),

      title,

      idea: cleanIdea,

      category,

      experience,

      problem,

      solution,

      users,

      targetUsers: users,

      features,

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
          "Rule-based AI Mentor",
          "Prompt Engineering",
          "LLM API (Future)",
        ],

        database: [
          "Local Storage",
          "MongoDB (Future)",
        ],
      },

      roadmap,

      difficulty:
        experience === "Advanced"
          ? "Intermediate → Advanced"
          : experience === "Intermediate"
            ? "Intermediate"
            : "Beginner → Intermediate",

      impact: "High",

      insights,
    };
  };

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

    const project =
      createBlueprint(cleanIdea);

    console.log(
      "GENERATED PROJECT:",
      project
    );

    // ===================================================
    // SAVE CURRENT PROJECT
    // ===================================================

    try {
      localStorage.setItem(
        "aiProjectMentorProject",
        JSON.stringify(project)
      );

      console.log(
        "CURRENT PROJECT SAVED:",
        project.title
      );
    } catch (error) {
      console.error(
        "Failed to save project:",
        error
      );
    }

    // ===================================================
    // SMALL LOADING EFFECT
    // ===================================================

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