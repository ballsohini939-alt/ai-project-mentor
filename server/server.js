/*
==================================================
AI PROJECT MENTOR
BACKEND SERVER
==================================================

Stack:
- Node.js
- Express.js
- CORS
- Dotenv

Features:
- Project Blueprint Generator
- Project-aware AI Mentor
- Health Check
- No paid API required

Server:
http://localhost:5000
==================================================
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

/*
==================================================
APP CONFIGURATION
==================================================
*/

const app = express();

const PORT = process.env.PORT || 5000;

/*
==================================================
MIDDLEWARE
==================================================
*/

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

/*
==================================================
ROOT ROUTE
==================================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    message: "AI Project Mentor backend is running!",
    status: "online",
    endpoints: {
      generate: "POST /api/generate",
      mentor: "POST /api/mentor",
      health: "GET /api/health",
    },
  });
});

/*
==================================================
HEALTH CHECK
==================================================
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "online",
    message: "AI Project Mentor backend is healthy.",
    port: PORT,
  });
});

/*
==================================================
PROJECT BLUEPRINT GENERATOR
==================================================
*/

app.post("/api/generate", (req, res) => {
  try {
    /*
    ================================================
    REQUEST DATA
    ================================================
    */

    const {
      idea,
      category,
      experience,
    } = req.body;

    /*
    ================================================
    VALIDATION
    ================================================
    */

    if (
      !idea ||
      typeof idea !== "string" ||
      !idea.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Project idea is required.",
      });
    }

    /*
    ================================================
    CLEAN IDEA
    ================================================
    */

    const cleanIdea = idea.trim();

    /*
    ================================================
    DETECT PROJECT TYPE
    ================================================
    */

    const lowerIdea =
      cleanIdea.toLowerCase();

    /*
    ================================================
    DEFAULT VALUES
    ================================================
    */

    let title = "AI Project";

    let problem =
      "Users need a simple and useful application to solve their problem.";

    let solution =
      "Build a focused application that provides useful functionality through a simple user experience.";

    let users =
      "Students and beginner users";

    let features = [];

    let techStack = {
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
    };

    /*
    ================================================
    AI PERSONAL ASSISTANT
    ================================================
    */

    if (
      lowerIdea.includes("ai assistant") ||
      lowerIdea.includes("personal assistant") ||
      lowerIdea.includes("student assistant") ||
      lowerIdea.includes("ai mentor")
    ) {
      title = "AI Personal Assistant";

      problem =
        "Students often struggle to organize their tasks, understand what to work on next, and get useful guidance while working on projects.";

      solution =
        "Build an AI-powered personal assistant that helps students organize tasks, receive project-aware guidance, get smart suggestions, and track their progress.";

      users =
        "Students, learners, and beginner developers";

      features = [
        {
          title: "AI Conversation",
          description:
            "Create a conversational interface where students can interact with their assistant.",
        },

        {
          title: "Task Management",
          description:
            "Allow students to create, organize, update, and complete tasks.",
        },

        {
          title: "Smart Suggestions",
          description:
            "Provide useful suggestions based on the student's current project and progress.",
        },

        {
          title: "Personalized Assistance",
          description:
            "Give project-aware and personalized guidance to the user.",
        },

        {
          title: "Responsive Interface",
          description:
            "Create a clean interface that works across different screen sizes.",
        },
      ];

      techStack = {
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
      };
    }

    /*
    ================================================
    STUDY ASSISTANT
    ================================================
    */

    else if (
      lowerIdea.includes("study") ||
      lowerIdea.includes("learning") ||
      lowerIdea.includes("education")
    ) {
      title = "AI Study Assistant";

      problem =
        "Students can struggle with organizing their study activities and understanding difficult topics.";

      solution =
        "Build an assistant that helps students organize learning tasks and receive useful study guidance.";

      users =
        "Students and learners";

      features = [
        {
          title: "Study Chat",
          description:
            "Allow students to ask questions and receive guidance.",
        },

        {
          title: "Task Management",
          description:
            "Create and manage study tasks.",
        },

        {
          title: "Study Planner",
          description:
            "Organize learning activities and priorities.",
        },

        {
          title: "Smart Suggestions",
          description:
            "Recommend useful study actions.",
        },

        {
          title: "Progress Tracking",
          description:
            "Track completed learning activities.",
        },
      ];
    }

    /*
    ================================================
    TODO / TASK PROJECT
    ================================================
    */

    else if (
      lowerIdea.includes("todo") ||
      lowerIdea.includes("task manager") ||
      lowerIdea.includes("task management")
    ) {
      title = "Smart Task Manager";

      problem =
        "Users need a simple way to organize and track their tasks.";

      solution =
        "Build a task management application with organization and progress tracking.";

      users =
        "Students and general users";

      features = [
        {
          title: "Create Tasks",
          description:
            "Allow users to create new tasks.",
        },

        {
          title: "Edit Tasks",
          description:
            "Allow users to update existing tasks.",
        },

        {
          title: "Complete Tasks",
          description:
            "Allow users to mark tasks as completed.",
        },

        {
          title: "Task Organization",
          description:
            "Organize tasks by priority or category.",
        },

        {
          title: "Progress Tracking",
          description:
            "Track completed and remaining tasks.",
        },
      ];
    }

    /*
    ================================================
    FINANCE PROJECT
    ================================================
    */

    else if (
      lowerIdea.includes("finance") ||
      lowerIdea.includes("expense") ||
      lowerIdea.includes("money")
    ) {
      title = "Personal Finance Assistant";

      problem =
        "Users may find it difficult to track and understand their spending.";

      solution =
        "Build an application that helps users record expenses and understand their financial activity.";

      users =
        "Students and young adults";

      features = [
        {
          title: "Expense Tracking",
          description:
            "Record daily expenses.",
        },

        {
          title: "Categories",
          description:
            "Organize expenses into categories.",
        },

        {
          title: "Budget Tracking",
          description:
            "Track spending against a budget.",
        },

        {
          title: "Insights",
          description:
            "Provide useful spending insights.",
        },

        {
          title: "Progress Dashboard",
          description:
            "Display financial information clearly.",
        },
      ];
    }

    /*
    ================================================
    CHATBOT PROJECT
    ================================================
    */

    else if (
      lowerIdea.includes("chatbot") ||
      lowerIdea.includes("chat bot")
    ) {
      title = "AI Chatbot";

      problem =
        "Users need an accessible conversational interface for interacting with an application.";

      solution =
        "Build a chatbot interface with project-aware conversational logic.";

      users =
        "Students and general users";

      features = [
        {
          title: "Chat Interface",
          description:
            "Create the main conversational interface.",
        },

        {
          title: "Message Handling",
          description:
            "Allow users to send and receive messages.",
        },

        {
          title: "Conversation History",
          description:
            "Keep track of previous messages.",
        },

        {
          title: "Smart Responses",
          description:
            "Generate useful context-aware responses.",
        },

        {
          title: "Responsive Interface",
          description:
            "Make the chatbot usable across screen sizes.",
        },
      ];
    }

    /*
    ================================================
    GENERIC PROJECT
    ================================================
    */

    else {
      title = "AI Project";

      features = [
        {
          title: "Project Setup",
          description:
            "Set up the basic application structure.",
        },

        {
          title: "Core Functionality",
          description:
            `Implement the main functionality of ${title}.`,
        },

        {
          title: "User Interface",
          description:
            "Build a clear and usable interface.",
        },

        {
          title: "Smart Assistance",
          description:
            "Add useful intelligent functionality.",
        },

        {
          title: "Progress Tracking",
          description:
            "Track project progress and completed work.",
        },
      ];
    }

    /*
    ================================================
    DYNAMIC ROADMAP
    ================================================
    */

    let roadmap;

    if (title === "AI Personal Assistant") {
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
            "Test the application, improve the interface, fix errors, and prepare it for deployment.",
        },
      ];
    } else {
      roadmap = [
        {
          phase: "01",
          title: "Project Setup",
          description:
            "Initialize the React frontend and Node.js backend.",
        },

        {
          phase: "02",
          title: "Build Core Features",
          description:
            `Implement the main functionality of ${title}.`,
        },

        {
          phase: "03",
          title: "Build AI Mentor",
          description:
            "Create project-aware mentor guidance.",
        },

        {
          phase: "04",
          title: "Add Progress Tracking",
          description:
            "Track completed tasks, features, and project progress.",
        },

        {
          phase: "05",
          title: "Testing & Deployment",
          description:
            "Test the application, fix errors, improve the interface, and prepare it for deployment.",
        },
      ];
    }

    /*
    ================================================
    DIFFICULTY
    ================================================
    */

    let difficulty =
      "Beginner → Intermediate";

    if (experience === "Advanced") {
      difficulty =
        "Intermediate → Advanced";
    } else if (
      experience === "Intermediate"
    ) {
      difficulty = "Intermediate";
    }

    /*
    ================================================
    INSIGHTS
    ================================================
    */

    const insights = [
      {
        title: "Start Small",
        description:
          "Build the core functionality first before adding advanced features.",
      },

      {
        title: "Focus on Users",
        description:
          "Design every feature around solving a real problem.",
      },

      {
        title: "Test Continuously",
        description:
          "Test every feature as you build instead of waiting until the end.",
      },

      {
        title: "Build an MVP",
        description:
          "Start with a simple working version and gradually add advanced capabilities.",
      },
    ];

    /*
    ================================================
    COMPLETE BLUEPRINT
    ================================================
    */

    const blueprint = {
      title,
      idea: cleanIdea,

      category:
        category || "Web Application",

      experience:
        experience || "Beginner",

      problem,

      solution,

      users,

      targetUsers: users,

      features,

      techStack,

      roadmap,

      difficulty,

      impact: "High",

      insights,
    };

    /*
    ================================================
    SERVER LOG
    ================================================
    */

    console.log("");
    console.log("========================================");
    console.log("BLUEPRINT GENERATED");
    console.log("========================================");
    console.log("Project:", title);
    console.log("Idea:", cleanIdea);
    console.log(
      "Features:",
      features.map(
        (feature) => feature.title
      )
    );
    console.log(
      "Roadmap:",
      roadmap.map(
        (phase) => phase.title
      )
    );
    console.log("========================================");
    console.log("");

    /*
    ================================================
    RESPONSE
    ================================================
    */

    return res.status(200).json({
      success: true,
      result: blueprint,
    });

  } catch (error) {
    console.error(
      "Generate error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Failed to generate project blueprint.",
    });
  }
});

/*
==================================================
AI MENTOR
==================================================

IMPORTANT:

This is PROJECT-AWARE.

It does NOT use a hardcoded project.

It reads:
- title
- idea
- features
- roadmap
- tech stack

from AIMentor.jsx.
==================================================
*/

app.post("/api/mentor", (req, res) => {
  try {
    /*
    ================================================
    REQUEST
    ================================================
    */

    const {
      question,
      project,
    } = req.body;

    /*
    ================================================
    VALIDATION
    ================================================
    */

    if (
      !question ||
      typeof question !== "string" ||
      !question.trim()
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Mentor question is required.",
      });
    }

    /*
    ================================================
    QUESTION
    ================================================
    */

    const cleanQuestion =
      question.trim();

    const lowerQuestion =
      cleanQuestion.toLowerCase();

    /*
    ================================================
    PROJECT
    ================================================
    */

    const projectTitle =
      project?.title ||
      "Your Project";

    const projectIdea =
      project?.idea ||
      "your project idea";

    const projectFeatures =
      Array.isArray(
        project?.features
      )
        ? project.features
        : [];

    const projectRoadmap =
      Array.isArray(
        project?.roadmap
      )
        ? project.roadmap
        : [];

    const projectTechStack =
      project?.techStack || {};

    /*
    ================================================
    FEATURE HELPERS
    ================================================
    */

    const getFeatureTitle = (
      index
    ) => {
      const feature =
        projectFeatures[index];

      if (!feature) {
        return `Feature ${index + 1}`;
      }

      if (
        typeof feature ===
        "string"
      ) {
        return feature;
      }

      return (
        feature.title ||
        feature.name ||
        `Feature ${index + 1}`
      );
    };

    const getFeatureDescription = (
      index
    ) => {
      const feature =
        projectFeatures[index];

      if (!feature) {
        return "Core project functionality.";
      }

      if (
        typeof feature ===
        "string"
      ) {
        return "Core project functionality.";
      }

      return (
        feature.description ||
        feature.details ||
        "Core project functionality."
      );
    };

    /*
    ================================================
    ROADMAP HELPERS
    ================================================
    */

    const getRoadmapTitle = (
      index
    ) => {
      const phase =
        projectRoadmap[index];

      if (!phase) {
        return `Phase ${index + 1}`;
      }

      if (
        typeof phase ===
        "string"
      ) {
        return phase;
      }

      return (
        phase.title ||
        phase.name ||
        `Phase ${index + 1}`
      );
    };

    const getRoadmapDescription = (
      index
    ) => {
      const phase =
        projectRoadmap[index];

      if (!phase) {
        return "Complete this development phase.";
      }

      if (
        typeof phase ===
        "string"
      ) {
        return "Complete this development phase.";
      }

      return (
        phase.description ||
        phase.details ||
        "Complete this development phase."
      );
    };

    /*
    ================================================
    FEATURE LIST
    ================================================
    */

    const featureList =
      projectFeatures.length > 0
        ? projectFeatures
            .map(
              (_, index) =>
                `${index + 1}. ${getFeatureTitle(index)}`
            )
            .join("\n")
        : "No features available.";

    /*
    ================================================
    ROADMAP LIST
    ================================================
    */

    const roadmapList =
      projectRoadmap.length > 0
        ? projectRoadmap
            .map(
              (_, index) =>
                `${index + 1}. ${getRoadmapTitle(index)}`
            )
            .join("\n")
        : "No roadmap available.";

    /*
    ================================================
    DEFAULT RESPONSE
    ================================================
    */

    let answer = `
For ${projectTitle}, I recommend building your project one phase at a time.

Your project idea:

${projectIdea}

Your roadmap:

${roadmapList}

Your first priority is:

### ${getRoadmapTitle(0)}

${getRoadmapDescription(0)}

Build it, test it, and then continue to the next phase.
    `.trim();

    /*
    ================================================
    HOW SHOULD I START?
    ================================================
    */

    if (
      lowerQuestion.includes(
        "how should i start"
      ) ||
      lowerQuestion.includes(
        "where should i start"
      ) ||
      lowerQuestion.includes(
        "how do i start"
      ) ||
      lowerQuestion.includes(
        "first step"
      ) ||
      lowerQuestion.includes(
        "start this project"
      )
    ) {
      answer = `
To start **${projectTitle}**, follow your actual project roadmap.

### Step 1 — ${getRoadmapTitle(0)}

${getRoadmapDescription(0)}

### Step 2 — ${getRoadmapTitle(1)}

${getRoadmapDescription(1)}

### Step 3 — ${getRoadmapTitle(2)}

${getRoadmapDescription(2)}

Start with Phase 01 and make sure it works before moving forward.
      `.trim();
    }

    /*
    ================================================
    FEATURES FIRST
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "what features should i build first"
      ) ||
      lowerQuestion.includes(
        "which features should i build first"
      ) ||
      lowerQuestion.includes(
        "features should i build first"
      )
    ) {
      answer = `
For **${projectTitle}**, build your features in this order:

### 1. ${getFeatureTitle(0)}

${getFeatureDescription(0)}

### 2. ${getFeatureTitle(1)}

${getFeatureDescription(1)}

### 3. ${getFeatureTitle(2)}

${getFeatureDescription(2)}

### 4. ${getFeatureTitle(3)}

${getFeatureDescription(3)}

### 5. ${getFeatureTitle(4)}

${getFeatureDescription(4)}

For your MVP, focus on the first three core features before adding extra functionality.
      `.trim();
    }

    /*
    ================================================
    AFTER DASHBOARD
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "what should i build after the dashboard"
      ) ||
      lowerQuestion.includes(
        "what should i build after dashboard"
      ) ||
      lowerQuestion.includes(
        "after the dashboard"
      ) ||
      lowerQuestion.includes(
        "after dashboard"
      )
    ) {
      /*
      -----------------------------------------------
      IMPORTANT:
      Dashboard is not part of the roadmap.

      Therefore after the dashboard,
      continue with roadmap Phase 02.
      -----------------------------------------------
      */

      const nextPhaseIndex =
        projectRoadmap.length > 1
          ? 1
          : 0;

      answer = `
If your dashboard is already complete, your next step should be the next development phase in your roadmap.

### Your roadmap

${roadmapList}

### Next: ${getRoadmapTitle(nextPhaseIndex)}

${getRoadmapDescription(nextPhaseIndex)}

For **${projectTitle}**, do not add unnecessary features yet. Finish this phase, test it, and then move to the following phase.

### After that

1. ${getRoadmapTitle(2)}
2. ${getRoadmapTitle(3)}
3. ${getRoadmapTitle(4)}
      `.trim();
    }

    /*
    ================================================
    WHAT SHOULD I BUILD NEXT?
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "what should i build next"
      ) ||
      lowerQuestion.includes(
        "what do i build next"
      ) ||
      lowerQuestion.includes(
        "what should i do next"
      )
    ) {
      answer = `
For **${projectTitle}**, your next development phase is:

### ${getRoadmapTitle(0)}

${getRoadmapDescription(0)}

Your complete roadmap is:

${roadmapList}

Finish the current phase before expanding the project.
      `.trim();
    }

    /*
    ================================================
    WHAT FEATURES DO I HAVE?
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "what features"
      ) ||
      lowerQuestion.includes(
        "which features"
      ) ||
      lowerQuestion.includes(
        "features do i have"
      ) ||
      lowerQuestion.includes(
        "features in my project"
      ) ||
      lowerQuestion.includes(
        "what should i add"
      )
    ) {
      answer = `
Your **${projectTitle}** currently has:

${featureList}

For the MVP, make the core features functional before adding more features.
      `.trim();
    }

    /*
    ================================================
    ROADMAP
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "roadmap"
      ) ||
      lowerQuestion.includes(
        "development plan"
      ) ||
      lowerQuestion.includes(
        "development phases"
      ) ||
      lowerQuestion.includes(
        "phases"
      )
    ) {
      answer = `
Here is the actual roadmap for **${projectTitle}**:

${roadmapList}

### Immediate priority

**${getRoadmapTitle(0)}**

${getRoadmapDescription(0)}

Complete the phases in order.
      `.trim();
    }

    /*
    ================================================
    TECHNOLOGY
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "which technology"
      ) ||
      lowerQuestion.includes(
        "what technology"
      ) ||
      lowerQuestion.includes(
        "which tech"
      ) ||
      lowerQuestion.includes(
        "tech stack"
      ) ||
      lowerQuestion.includes(
        "technology should"
      )
    ) {
      const frontend =
        Array.isArray(
          projectTechStack.frontend
        )
          ? projectTechStack.frontend.join(
              ", "
            )
          : "Not specified";

      const backend =
        Array.isArray(
          projectTechStack.backend
        )
          ? projectTechStack.backend.join(
              ", "
            )
          : "Not specified";

      const ai =
        Array.isArray(
          projectTechStack.ai
        )
          ? projectTechStack.ai.join(
              ", "
            )
          : "Not specified";

      const database =
        Array.isArray(
          projectTechStack.database
        )
          ? projectTechStack.database.join(
              ", "
            )
          : "Not specified";

      answer = `
For **${projectTitle}**, your blueprint recommends:

### Frontend

${frontend}

### Backend

${backend}

### AI

${ai}

### Database / Storage

${database}

For your current MVP, continue with:

**React + JavaScript + Node.js + Express.js + Local Storage**

You do not need a paid AI API for the current Mentor.
      `.trim();
    }

    /*
    ================================================
    CURRENT PROJECT
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "what is my current project"
      ) ||
      lowerQuestion ===
        "what is my project" ||
      lowerQuestion.includes(
        "my current project"
      ) ||
      lowerQuestion.includes(
        "project idea"
      )
    ) {
      answer = `
Your current project is:

### ${projectTitle}

${projectIdea}

### Current Features

${featureList}

### Roadmap

${roadmapList}

Your first development priority is:

### ${getRoadmapTitle(0)}
      `.trim();
    }

    /*
    ================================================
    MAKE PROJECT BETTER
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "make this project better"
      ) ||
      lowerQuestion.includes(
        "make it better"
      ) ||
      lowerQuestion.includes(
        "improve this project"
      ) ||
      lowerQuestion.includes(
        "improve it"
      ) ||
      lowerQuestion.includes(
        "hackathon"
      )
    ) {
      answer = `
To make **${projectTitle}** stronger:

1. Make ${getFeatureTitle(0)} fully functional.
2. Connect the features into one complete user flow.
3. Keep the interface simple and clear.
4. Make the Mentor understand the project context.
5. Keep progress tracking connected to the roadmap.
6. Handle errors properly.
7. Test every major feature.
8. Polish the UI after the functionality works.

For a hackathon, a polished working MVP is stronger than many unfinished features.

Your most important priority is:

### ${getFeatureTitle(0)}
      `.trim();
    }

    /*
    ================================================
    API / AI
    ================================================
    */

    else if (
      lowerQuestion.includes("api") ||
      lowerQuestion.includes("openai") ||
      lowerQuestion.includes("llm") ||
      lowerQuestion.includes("paid ai")
    ) {
      answer = `
You do not need a paid AI API for the current MVP.

The **${projectTitle}** Mentor currently uses project-aware rule-based logic.

It reads:

• Project title
• Project idea
• Project features
• Project roadmap
• Project technology stack

Later, you can connect an external LLM API if you want more advanced natural-language responses.
      `.trim();
    }

    /*
    ================================================
    PROGRESS
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "progress"
      ) ||
      lowerQuestion.includes(
        "tracking"
      )
    ) {
      answer = `
For **${projectTitle}**, progress should follow the actual roadmap:

${roadmapList}

Your dashboard can track:

• Completed phases
• Current phase
• Next phase
• Overall completion percentage

For the MVP, Local Storage is enough.
      `.trim();
    }

    /*
    ================================================
    DEBUGGING
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "error"
      ) ||
      lowerQuestion.includes(
        "debug"
      ) ||
      lowerQuestion.includes(
        "bug"
      ) ||
      lowerQuestion.includes(
        "not working"
      )
    ) {
      answer = `
Let's debug **${projectTitle}** systematically.

1. Read the exact error message.
2. Check the browser console.
3. Check the Node.js terminal.
4. Check the file and line number.
5. Make sure the backend is running on port 5000.
6. Fix one problem at a time.
7. Test the feature again.

Send me the exact error message if you need help.
      `.trim();
    }

    /*
    ================================================
    LOG REQUEST
    ================================================
    */

    console.log("");
    console.log("========================================");
    console.log("AI MENTOR REQUEST");
    console.log("========================================");
    console.log("Project:", projectTitle);
    console.log("Question:", cleanQuestion);

    console.log(
      "Features:",
      projectFeatures.map(
        (_, index) =>
          getFeatureTitle(index)
      )
    );

    console.log(
      "Roadmap:",
      projectRoadmap.map(
        (_, index) =>
          getRoadmapTitle(index)
      )
    );

    console.log("========================================");
    console.log("");

    /*
    ================================================
    RESPONSE
    ================================================
    */

    return res.status(200).json({
      success: true,

      question: cleanQuestion,

      answer,

      project: {
        title: projectTitle,

        idea: projectIdea,

        features:
          projectFeatures,

        roadmap:
          projectRoadmap,

        techStack:
          projectTechStack,
      },
    });

  } catch (error) {
    console.error(
      "Mentor error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "Failed to generate mentor response.",
    });
  }
});

/*
==================================================
404 HANDLER
==================================================
*/

app.use(
  (req, res) => {
    res.status(404).json({
      success: false,

      error:
        `Route ${req.method} ${req.originalUrl} not found.`,
    });
  }
);

/*
==================================================
GLOBAL ERROR HANDLER
==================================================
*/

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Server error:",
      error
    );

    res.status(500).json({
      success: false,

      error:
        "Internal server error.",
    });
  }
);

/*
==================================================
START SERVER
==================================================
*/

app.listen(
  PORT,
  () => {
    console.log("");

    console.log(
      "========================================"
    );

    console.log(
      "       AI PROJECT MENTOR BACKEND"
    );

    console.log(
      "========================================"
    );

    console.log(
      ` Server running at http://localhost:${PORT}`
    );

    console.log(
      ` Generate API: http://localhost:${PORT}/api/generate`
    );

    console.log(
      ` Mentor API: http://localhost:${PORT}/api/mentor`
    );

    console.log(
      ` Health API: http://localhost:${PORT}/api/health`
    );

    console.log(
      "========================================"
    );

    console.log("");
  }
);