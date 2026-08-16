import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 5000;

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());


// ==================================================
// HOME ROUTE
// ==================================================

app.get("/", (req, res) => {
  res.json({
    message: "AI Project Mentor backend is running!",
    status: "online",
    endpoints: {
      generate: "POST /api/generate",
      mentor: "POST /api/mentor",
    },
  });
});


// ==================================================
// HELPER
// ==================================================

function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}


// ==================================================
// GENERATE PROJECT BLUEPRINT
// ==================================================

app.post("/api/generate", (req, res) => {
  try {
    const {
      idea,
      category,
      experience,
    } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      !idea ||
      typeof idea !== "string" ||
      !idea.trim()
    ) {
      return res.status(400).json({
        error: "Project idea is required.",
      });
    }

    const cleanIdea = idea.trim();

    const lowerIdea =
      cleanIdea.toLowerCase();

    // ==================================================
    // GENERATE TITLE
    // ==================================================

    let title = "AI Project";

    if (
      lowerIdea.includes("personal assistant")
    ) {
      title = "AI Personal Assistant";

    } else if (
      lowerIdea.includes("study assistant") ||
      lowerIdea.includes("study")
    ) {
      title = "AI Study Assistant";

    } else if (
      lowerIdea.includes("internship")
    ) {
      title = "Internship Finder";

    } else if (
      lowerIdea.includes("expense") ||
      lowerIdea.includes("finance")
    ) {
      title = "Personal Finance Tracker";

    } else if (
      lowerIdea.includes("project mentor")
    ) {
      title = "AI Project Mentor";

    } else if (
      lowerIdea.includes("chatbot") ||
      lowerIdea.includes("chat bot") ||
      lowerIdea.includes("ai assistant")
    ) {
      title = "AI Assistant";

    } else if (
      lowerIdea.includes("todo") ||
      lowerIdea.includes("to-do") ||
      lowerIdea.includes("task manager")
    ) {
      title = "Smart Task Manager";

    } else if (
      lowerIdea.includes("weather")
    ) {
      title = "Weather Assistant";

    } else if (
      lowerIdea.includes("recommendation")
    ) {
      title = "Smart Recommendation System";
    }

    // ==================================================
    // PROJECT BLUEPRINT
    // ==================================================

    const blueprint = {

      title,

      idea: cleanIdea,

      category:
        category || "Web Application",

      experience:
        experience || "Beginner",

      problem:
        `Users need a practical solution for the problem described by the project idea: "${cleanIdea}".`,

      solution:
        `Build "${title}" as a simple, reliable MVP that directly addresses the user's problem before adding advanced functionality.`,

      users: [
        "Students",
        "Beginner Developers",
        "General Users",
        "Self Learners",
      ],

      features: [

        {
          title: "Core Functionality",
          description:
            "Build the main feature that directly solves the project's primary problem.",
        },

        {
          title: "User Interaction",
          description:
            "Allow users to provide information and interact naturally with the application.",
        },

        {
          title: "Results & Insights",
          description:
            "Show useful results, information, or actions based on user input.",
        },

        {
          title: "Progress Tracking",
          description:
            "Track useful actions, results, or progress related to the project.",
        },

        {
          title: "Responsive Interface",
          description:
            "Make the application usable across desktop, tablet, and mobile devices.",
        },

      ],

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
          "LLM API (Future)",
        ],

        database: [
          "Local Storage",
          "MongoDB (Future)",
        ],

      },

      roadmap: [

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
            "Implement the most important functionality required by the project idea.",
        },

        {
          phase: "03",
          title: "Build AI Mentor",
          description:
            "Create project-aware guidance that helps the developer understand what to build and how to proceed.",
        },

        {
          phase: "04",
          title: "Add Progress Tracking",
          description:
            "Track completed features and remaining development tasks.",
        },

        {
          phase: "05",
          title: "Testing & Deployment",
          description:
            "Test the application, improve the interface, fix bugs, and prepare the project for deployment.",
        },

      ],

      difficulty:
        experience === "Advanced"
          ? "Intermediate → Advanced"
          : experience === "Intermediate"
          ? "Beginner → Intermediate"
          : "Beginner → Intermediate",

      impact: "High",

      insights: [

        {
          title: "Start Small",
          description:
            "Build the smallest useful version before adding advanced functionality.",
        },

        {
          title: "Focus on the User",
          description:
            "Design every feature around solving the actual problem described in the project idea.",
        },

        {
          title: "Test Continuously",
          description:
            "Test every feature while developing instead of waiting until the end.",
        },

        {
          title: "Build an MVP",
          description:
            "Start with a simple working version and gradually add advanced features.",
        },

      ],

    };

    console.log(
      "Blueprint generated:",
      title
    );

    // ==================================================
    // SEND RESPONSE
    // ==================================================

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
      error:
        "Failed to generate project blueprint.",
    });
  }
});


// ============================================================
// TESTING MODE MENTOR
// ============================================================

function generateMentorAnswer(question, project) {

  const q =
    cleanText(question).toLowerCase();

  // ----------------------------------------------------------
  // PROJECT INFORMATION
  // ----------------------------------------------------------

  const projectName =
    project?.title ||
    project?.name ||
    "Your Project";

  const projectIdea =
    project?.idea ||
    project?.description ||
    "Build a useful software project.";

  const category =
    project?.category ||
    "Software Development";

  const experience =
    project?.experience ||
    "Beginner";

  const techStack =
    project?.techStack ||
    project?.technology ||
    "React, Node.js and Express.js";


  // ==========================================================
  // CURRENT PROJECT
  // ==========================================================

  if (
    q.includes("current project") ||
    q.includes("my current project") ||
    q.includes("what am i building") ||
    q.includes("what is this project") ||
    q.includes("tell me about my project")
  ) {

    return `
Your current project is "${projectName}".

Project idea:
${projectIdea}

Category:
${category}

Experience level:
${experience}

Technology:
${typeof techStack === "object"
        ? "React + Node.js + Express.js"
        : techStack}

Your immediate goal should be to turn this idea into a small working MVP.

Focus on:

1. Building the core functionality.
2. Making the main user flow work.
3. Connecting the frontend and backend.
4. Testing the important features.
5. Improving the UI after the core system is stable.

Don't try to build every advanced feature at once.

Start with the smallest version that actually solves the main problem.
`.trim();
  }


  // ==========================================================
  // FEATURES
  // ==========================================================

  if (
    q.includes("features should i build") ||
    q.includes("what features should i build") ||
    q.includes("features first") ||
    q.includes("which features") ||
    q.includes("what features")
  ) {

    return `
For "${projectName}", build features in this order:

01 — Core Functionality

Build the main feature that directly solves the project's problem.

02 — User Interaction

Allow users to provide the information the application needs.

03 — Main Result

Show a useful result or action based on the user's input.

04 — Data Handling

Connect the frontend to the backend and make sure data is handled correctly.

05 — Dashboard / Interface

Present important information clearly and make the main workflow easy to use.

06 — Smart Features

After the core system works, add AI, automation, recommendations, analytics, or other intelligent functionality where it provides real value.

07 — Testing

Test the complete user journey and fix problems before adding more features.

A small number of polished features is better than many unfinished features.
`.trim();
  }


  // ==========================================================
  // START PROJECT
  // ==========================================================

  if (
    q.includes("how should i start") ||
    q.includes("where should i start") ||
    q.includes("how do i start") ||
    q.includes("start this project") ||
    q.includes("first step")
  ) {

    return `
Start "${projectName}" with a small MVP.

Recommended order:

1. Define the core problem.
2. Decide the minimum features required.
3. Set up the frontend.
4. Build the main interface.
5. Implement the core functionality.
6. Connect the backend.
7. Test the complete workflow.
8. Improve the UI.
9. Add advanced functionality.

Your first milestone should be:

"The user can complete the main action this project was designed for."

Once that works reliably, move to the next feature.

Don't start with advanced AI, animations, authentication, or unnecessary technologies before the core workflow works.
`.trim();
  }


  // ==========================================================
  // AFTER DASHBOARD
  // ==========================================================

  if (
    q.includes("after the dashboard") ||
    q.includes("after dashboard") ||
    (
      q.includes("dashboard") &&
      (
        q.includes("next") ||
        q.includes("after")
      )
    )
  ) {

    return `
After the dashboard, connect it to real project functionality.

Recommended flow:

Dashboard
   ↓
User Action
   ↓
Backend API
   ↓
Process Data
   ↓
Return Result
   ↓
Update Dashboard

The dashboard should eventually display real project data rather than only static information.

After that:

1. Add validation.
2. Add error handling.
3. Add loading states.
4. Improve the user experience.
5. Add advanced features.

The next feature should strengthen the main purpose of "${projectName}".
`.trim();
  }


  // ==========================================================
  // TECHNOLOGY
  // ==========================================================

  if (
    q.includes("which technology") ||
    q.includes("what technology") ||
    q.includes("tech stack") ||
    q.includes("technology should") ||
    q.includes("what stack")
  ) {

    return `
For "${projectName}", keep the technology stack simple.

Frontend:
React + Vite

Styling:
CSS

Backend:
Node.js + Express.js

API:
REST API

Storage:
Use the simplest storage that matches your current MVP.

Charts:
Recharts can be added if the project needs data visualization.

AI:
Keep the AI Mentor in testing mode while developing the application. No external AI API key is required for the current testing system.

Avoid adding technologies just because they sound impressive.

Choose technology based on what the project actually needs.
`.trim();
  }


  // ==========================================================
  // ROADMAP
  // ==========================================================

  if (
    q.includes("roadmap") ||
    q.includes("what is my roadmap") ||
    q.includes("show my roadmap")
  ) {

    return `
Your roadmap for "${projectName}" is:

01 — Project Foundation
Set up the application structure and development environment.

02 — Core MVP
Build the main functionality described by your project idea.

03 — Frontend + Backend
Connect the interface to the backend API.

04 — Project-Aware AI Mentor
Make the mentor understand the project, features, roadmap, and development stage.

05 — Progress Tracking
Track completed features and remaining tasks.

06 — Testing
Test important user flows and fix bugs.

07 — UI/UX Polish
Improve responsiveness, loading states, error handling, and usability.

08 — Hackathon Preparation
Prepare the problem statement, solution explanation, demo, and presentation.

09 — Deployment
Deploy the finished application.

Your immediate priority is completing the core MVP.
`.trim();
  }


  // ==========================================================
  // IMPROVEMENT
  // ==========================================================

  if (
    q.includes("make this project better") ||
    q.includes("improve this project") ||
    q.includes("improve my project") ||
    q.includes("make it better") ||
    q.includes("how can i improve") ||
    q.includes("improve")
  ) {

    return `
You can improve "${projectName}" in three stages.

Stage 1 — Core Reliability

• Make the main feature work correctly.
• Validate user input.
• Handle errors properly.
• Make frontend and backend communicate reliably.
• Test the main user flow.

Stage 2 — User Experience

• Improve navigation.
• Add loading states.
• Add useful empty states.
• Improve error messages.
• Make the interface responsive.
• Make important information easy to understand.

Stage 3 — Intelligent Features

• Add useful automation.
• Add analytics or insights.
• Add personalized recommendations.
• Improve the project-aware AI Mentor.
• Add features that make the project stand out.

Prioritize a polished working MVP over a large number of unfinished features.
`.trim();
  }


  // ==========================================================
  // HACKATHON
  // ==========================================================

  if (
    q.includes("hackathon") ||
    q.includes("presentation") ||
    q.includes("demo")
  ) {

    return `
To make "${projectName}" stronger for a hackathon, focus on one clear user journey.

Your demo should show:

1. The problem.
2. The user starting the application.
3. The main action.
4. The system processing the request.
5. The useful result.
6. One memorable feature.
7. The final outcome.

A strong hackathon project needs:

• A clear problem.
• A practical solution.
• A working core feature.
• A clean interface.
• A smooth demonstration.
• Something that makes the project memorable.

Make the main workflow work perfectly before adding extra features.
`.trim();
  }


  // ==========================================================
  // DATABASE
  // ==========================================================

  if (
    q.includes("database") ||
    q.includes("store data") ||
    q.includes("save data")
  ) {

    return `
For the MVP of "${projectName}", don't introduce unnecessary database complexity.

If the project only needs local browser storage:
Use localStorage.

If it needs persistent server-side data:
Use a database with the Node.js backend.

A database becomes especially useful when you need:

• Multiple users
• Login accounts
• Persistent cloud data
• Data synchronization
• User-specific information

For your current testing stage, focus on making the application logic work first.
`.trim();
  }


  // ==========================================================
  // API
  // ==========================================================

  if (
    q.includes("api") ||
    q.includes("api key") ||
    q.includes("do i need an api")
  ) {

    return `
You do not need a paid AI API to continue developing "${projectName}".

The current AI Mentor is running in TESTING MODE.

That means:

• No external AI API is required.
• No API key is required.
• Mentor responses are generated by local project-aware logic.
• You can continue developing and testing the complete application.

Build and stabilize the application first.

A real AI model can be connected later when you are ready.
`.trim();
  }


  // ==========================================================
  // AI MENTOR
  // ==========================================================

  if (
    q === "ai" ||
    q.includes("ai mentor") ||
    q.includes("artificial intelligence") ||
    q.includes("how does the ai") ||
    q.includes("how does ai") ||
    q.includes("mentor")
  ) {

    return `
Your AI Project Mentor is currently running in TESTING MODE.

The mentor receives information about your project, including:

• Project name
• Project idea
• Category
• Experience level
• Technology information

It then uses predefined project-aware logic to provide development guidance.

This allows the application to be tested without requiring an external AI API.

The mentor can currently help with:

• Understanding your project
• Choosing features
• Planning development
• Selecting technologies
• Debugging
• Improving the project
• Preparing for a hackathon
• Deciding what to build next

Once the application is stable, this testing logic can be replaced or enhanced with a real AI model.
`.trim();
  }


  // ==========================================================
  // DEBUGGING
  // ==========================================================

  if (
    q.includes("bug") ||
    q.includes("error") ||
    q.includes("not working") ||
    q.includes("debug") ||
    q.includes("broken")
  ) {

    return `
Let's debug "${projectName}" systematically.

First identify:

1. What were you trying to do?
2. What did you expect to happen?
3. What actually happened?
4. What error appears in the browser console?
5. What error appears in the terminal?
6. Which file contains the relevant code?

Don't change multiple files randomly.

Find the exact failing step, fix it, and test again.

For the Mentor API, check:

Frontend
   ↓
POST /api/mentor
   ↓
question + project
   ↓
generateMentorAnswer()
   ↓
response
   ↓
Frontend

This helps identify exactly where a problem is occurring.
`.trim();
  }


  // ==========================================================
  // NEXT STEP
  // ==========================================================

  if (
    q.includes("next") ||
    q.includes("what should i do") ||
    q.includes("what should i build") ||
    q.includes("what do i build")
  ) {

    return `
Your next step for "${projectName}" should be the most important unfinished core feature.

Use this order:

1. Core functionality
2. User interaction
3. Main result
4. Backend/API connection
5. Data handling
6. Validation
7. Error handling
8. UI/UX improvements
9. Advanced features
10. Testing

Before moving forward, make sure the current feature actually works.

If the core functionality is already complete, move to the next missing feature rather than rebuilding something that already works.
`.trim();
  }


  // ==========================================================
  // GENERAL PROJECT QUESTION
  // ==========================================================

  if (
    q.includes("project") ||
    q.includes("build") ||
    q.includes("develop")
  ) {

    return `
I'm looking at your project:

"${projectName}"

Project idea:
"${projectIdea}"

The recommended development strategy is:

1. Build the core functionality.
2. Connect the frontend and backend.
3. Make the main user flow work.
4. Add validation and error handling.
5. Improve the interface.
6. Add intelligent features.
7. Test the complete application.
8. Prepare it for deployment or a hackathon.

Your current goal should be turning the project idea into a working MVP before expanding it.

If you tell me what you've already completed, the next development step can be planned more precisely.
`.trim();
  }


  // ==========================================================
  // GENERAL FALLBACK
  // ==========================================================

  return `
I understand that you're working on "${projectName}".

Project idea:
"${projectIdea}"

Category:
${category}

Experience:
${experience}

Your recommended development order is:

Core Functionality
→ Frontend + Backend
→ Data Handling
→ Validation
→ Testing
→ UI/UX Polish
→ Intelligent Features
→ Hackathon Preparation
→ Deployment

The AI Mentor is currently running in TESTING MODE, so no external AI API key is required.

Try asking:

• What is my current project?
• What features should I build first?
• How should I start this project?
• What should I build next?
• What should I build after the dashboard?
• Which technology should I use?
• What is my roadmap?
• How can I improve this project?
• How can I prepare it for a hackathon?
• How do I debug my project?

I'll use the project information provided by your application to give you project-aware guidance.
`.trim();
}


// ============================================================
// MENTOR API
// ============================================================

app.post("/api/mentor", (req, res) => {

  try {

    const question =
      cleanText(req.body?.question);

    const project =
      req.body?.project || {};

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!question) {

      return res.status(400).json({
        success: false,
        error: "Please enter a question.",
      });

    }

    // ==================================================
    // DEBUG LOGGING
    // ==================================================

    console.log(
      "\n----------------------------------------"
    );

    console.log(
      "AI MENTOR TEST MODE"
    );

    console.log(
      "Question:",
      question
    );

    console.log(
      "Project:",
      project?.title ||
      project?.name ||
      "Unknown Project"
    );

    console.log(
      "Idea:",
      project?.idea ||
      project?.description ||
      "No project idea"
    );

    console.log(
      "----------------------------------------"
    );

    // ==================================================
    // GENERATE ANSWER
    // ==================================================

    const answer =
      generateMentorAnswer(
        question,
        project
      );

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({

      success: true,

      mode: "testing",

      question,

      answer,

      project,

    });

  } catch (error) {

    console.error(
      "Mentor error:",
      error
    );

    return res.status(500).json({

      success: false,

      error:
        "Failed to process mentor request.",

    });

  }

});


// ==================================================
// 404
// ==================================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    error:
      "Endpoint not found.",

  });

});


// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {

  console.log("");

  console.log(
    "========================================"
  );

  console.log(
    " AI PROJECT MENTOR BACKEND"
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
    " Mode: TESTING"
  );

  console.log(
    " AI API: NOT REQUIRED"
  );

  console.log(
    "========================================"
  );

  console.log("");

});