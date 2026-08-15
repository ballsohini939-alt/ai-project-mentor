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
// GENERATE PROJECT BLUEPRINT
// ==================================================

app.post("/api/generate", (req, res) => {
  try {
    const {
      idea,
      category,
      experience,
    } = req.body;

    // ------------------------------
    // VALIDATION
    // ------------------------------

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

    // ------------------------------
    // GENERATE TITLE
    // ------------------------------

    let title = "AI Project";

    const lowerIdea = cleanIdea.toLowerCase();

    if (lowerIdea.includes("personal assistant")) {
      title = "AI Personal Assistant";
    } else if (
      lowerIdea.includes("study assistant") ||
      lowerIdea.includes("study")
    ) {
      title = "AI Study Assistant";
    } else if (lowerIdea.includes("internship")) {
      title = "Internship Finder";
    } else if (
      lowerIdea.includes("expense") ||
      lowerIdea.includes("finance")
    ) {
      title = "Personal Finance Tracker";
    } else if (lowerIdea.includes("project mentor")) {
      title = "AI Project Mentor";
    } else if (
      lowerIdea.includes("chatbot") ||
      lowerIdea.includes("chat bot")
    ) {
      title = "AI Chatbot";
    } else if (
      lowerIdea.includes("todo") ||
      lowerIdea.includes("to-do") ||
      lowerIdea.includes("task manager")
    ) {
      title = "Smart Task Manager";
    } else if (lowerIdea.includes("weather")) {
      title = "Weather Assistant";
    } else if (lowerIdea.includes("recommendation")) {
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


      // ==================================================
      // PROBLEM
      // ==================================================

      problem:
        "Students often struggle to organize their learning, understand difficult topics, and maintain a consistent study routine.",


      // ==================================================
      // SOLUTION
      // ==================================================

      solution:
        "Build an intelligent study assistant that helps students create study plans, understand concepts, track progress, and stay organized.",


      // ==================================================
      // TARGET USERS
      // ==================================================

      users: [
        "College Students",
        "School Students",
        "Beginner Developers",
        "Self Learners",
      ],


      // ==================================================
      // FEATURES
      // ==================================================

      features: [

        {
          title: "AI Conversation",
          description:
            "Allow students to ask questions and interact with the study assistant using natural language.",
        },

        {
          title: "Personalized Study Plans",
          description:
            "Create study plans based on subjects, available time, and learning goals.",
        },

        {
          title: "Smart Explanations",
          description:
            "Explain difficult concepts in simple and beginner-friendly language.",
        },

        {
          title: "Progress Tracking",
          description:
            "Allow students to track completed topics and monitor their learning progress.",
        },

        {
          title: "Responsive Interface",
          description:
            "Make the application accessible on desktop, tablet, and mobile devices.",
        },

      ],


      // ==================================================
      // TECH STACK
      // ==================================================

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


      // ==================================================
      // ROADMAP
      // ==================================================

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


      // ==================================================
      // DIFFICULTY
      // ==================================================

      difficulty:
        experience === "Advanced"
          ? "Intermediate → Advanced"
          : experience === "Intermediate"
          ? "Beginner → Intermediate"
          : "Beginner → Intermediate",


      // ==================================================
      // IMPACT
      // ==================================================

      impact: "High",


      // ==================================================
      // AI MENTOR INSIGHTS
      // ==================================================

      insights: [

        {
          title: "Start Small",
          description:
            "Build the study planner and dashboard first before adding advanced AI functionality.",
        },

        {
          title: "Focus on Students",
          description:
            "Design every feature around solving real problems faced by students.",
        },

        {
          title: "Test Continuously",
          description:
            "Test every feature as you build instead of waiting until the end.",
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


// ==================================================
// AI MENTOR
// ==================================================

app.post("/api/mentor", (req, res) => {

  try {

    const {
      question,
      project,
    } = req.body;


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      !question ||
      typeof question !== "string" ||
      !question.trim()
    ) {

      return res.status(400).json({
        error: "Question is required.",
      });

    }


    const cleanQuestion =
      question.trim();


    // ==================================================
    // SIMPLE LOCAL AI MENTOR
    // NO API KEY REQUIRED
    // ==================================================

    let answer =
      "Start by building the core functionality of your project. " +
      "Break the project into small features and implement them one at a time.";


    const lowerQuestion =
      cleanQuestion.toLowerCase();


    if (
      lowerQuestion.includes("start") ||
      lowerQuestion.includes("begin")
    ) {

      answer =
        `Start your ${project?.title || "project"} by building a simple MVP. ` +
        "First create the main interface, then implement the core feature, " +
        "and finally add advanced functionality.";

    } else if (
      lowerQuestion.includes("feature")
    ) {

      answer =
        "Start with the most important features first. " +
        "For an AI Study Assistant, begin with study planning, " +
        "AI conversation, and progress tracking.";

    } else if (
      lowerQuestion.includes("technology") ||
      lowerQuestion.includes("tech stack")
    ) {

      answer =
        "For this project, React is a good choice for the frontend " +
        "and Node.js with Express.js for the backend. " +
        "You can add an AI API later when you have access to one.";

    } else if (
      lowerQuestion.includes("database")
    ) {

      answer =
        "You can start without a database by using Local Storage. " +
        "Once the project becomes larger, MongoDB can be added.";

    } else if (
      lowerQuestion.includes("api")
    ) {

      answer =
        "You do not need a paid AI API to continue developing the project. " +
        "First build the complete frontend and backend structure. " +
        "An external AI API can be integrated later.";

    }


    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({

      success: true,

      question: cleanQuestion,

      answer,

      project: project || null,

    });

  } catch (error) {

    console.error(
      "Mentor error:",
      error
    );

    return res.status(500).json({

      error:
        "Failed to process mentor request.",

    });

  }

});


// ==================================================
// START SERVER
// ==================================================

app.listen(PORT, () => {

  console.log("");
  console.log("========================================");
  console.log(" AI PROJECT MENTOR BACKEND");
  console.log("========================================");
  console.log(
    ` Server running at http://localhost:${PORT}`
  );
  console.log(
    ` Generate API: http://localhost:${PORT}/api/generate`
  );
  console.log(
    ` Mentor API: http://localhost:${PORT}/api/mentor`
  );
  console.log("========================================");
  console.log("");

});