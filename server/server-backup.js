/*
==================================================
AI PROJECT MENTOR
BACKEND SERVER
==================================================

Features:

1. Project Blueprint Generator
2. AI Mentor
3. Rule-based AI logic
4. No paid API required
5. CORS support
6. JSON API
==================================================
*/


/*
==================================================
IMPORTS
==================================================
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";


/*
==================================================
LOAD ENVIRONMENT VARIABLES
==================================================
*/

dotenv.config();


/*
==================================================
CREATE EXPRESS APP
==================================================
*/

const app = express();


/*
==================================================
PORT
==================================================
*/

const PORT = 5000;


/*
==================================================
MIDDLEWARE
==================================================
*/

app.use(cors());

app.use(express.json());


/*
==================================================
ROOT ROUTE
==================================================
*/

app.get("/", (req, res) => {

  res.json({
    message:
      "AI Project Mentor backend is running!",
    status: "online",
    endpoints: {
      generate:
        "POST /api/generate",
      mentor:
        "POST /api/mentor",
      health:
        "GET /api/health",
    },
  });

});


/*
==================================================
HEALTH CHECK
==================================================
*/

app.get("/api/health", (req, res) => {

  res.json({
    success: true,
    message: "Backend is healthy.",
    server: "AI Project Mentor",
  });

});


/*
==================================================
GENERATE PROJECT BLUEPRINT
==================================================
*/

app.post("/api/generate", (req, res) => {

  try {

    /*
    ================================================
    GET REQUEST DATA
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

        error:
          "Project idea is required.",

      });

    }


    /*
    ================================================
    CLEAN IDEA
    ================================================
    */

    const cleanIdea =
      idea.trim();


    /*
    ================================================
    LOWERCASE IDEA

    IMPORTANT:
    Only declared ONCE.
    ================================================
    */

    const lowerIdea =
      cleanIdea.toLowerCase();


    /*
    ================================================
    DEFAULT VALUES
    ================================================
    */

    let title =
      "AI Project";

    let problem =
      "Students and beginner developers often struggle to turn their ideas into practical projects.";

    let solution =
      "Build an intelligent project mentor that helps users transform ideas into structured, practical projects.";

    let users = [
      "College Students",
      "School Students",
      "Beginner Developers",
      "Self Learners",
    ];

    let features = [

      {
        title: "AI Conversation",

        description:
          "Allow users to interact with the assistant using natural language.",
      },

      {
        title: "Smart Guidance",

        description:
          "Provide practical suggestions based on the user's project idea.",
      },

      {
        title: "Personalized Assistance",

        description:
          "Adapt recommendations according to the user's goals and experience.",
      },

      {
        title: "Progress Tracking",

        description:
          "Allow users to monitor completed tasks and project progress.",
      },

      {
        title: "Responsive Interface",

        description:
          "Make the application accessible on desktop, tablet, and mobile devices.",
      },

    ];


    /*
    ================================================
    STUDY ASSISTANT
    ================================================
    */

    if (
      lowerIdea.includes("study") ||
      lowerIdea.includes("student") ||
      lowerIdea.includes("learning")
    ) {

      title =
        "AI Study Assistant";

      problem =
        "Students often struggle to organize their learning, understand difficult topics, and maintain a consistent study routine.";

      solution =
        "Build an intelligent study assistant that helps students create study plans, understand concepts, track progress, and stay organized.";

      features = [

        {
          title:
            "AI Conversation",

          description:
            "Allow students to ask questions and interact with the study assistant using natural language.",
        },

        {
          title:
            "Personalized Study Plans",

          description:
            "Create study plans based on subjects, available time, and learning goals.",
        },

        {
          title:
            "Smart Explanations",

          description:
            "Explain difficult concepts in simple and beginner-friendly language.",
        },

        {
          title:
            "Progress Tracking",

          description:
            "Allow students to track completed topics and monitor their learning progress.",
        },

        {
          title:
            "Responsive Interface",

          description:
            "Make the application accessible on desktop, tablet, and mobile devices.",
        },

      ];

    }


    /*
    ================================================
    PERSONAL ASSISTANT
    ================================================
    */

    else if (
      lowerIdea.includes(
        "personal assistant"
      ) ||
      lowerIdea.includes(
        "ai assistant"
      )
    ) {

      title =
        "AI Personal Assistant";

      problem =
        "Users often need help organizing tasks, finding information, and managing everyday activities.";

      solution =
        "Build an AI personal assistant that understands user requests and provides useful assistance through a simple conversational interface.";

      features = [

        {
          title:
            "AI Conversation",

          description:
            "Allow users to communicate with the assistant using natural language.",
        },

        {
          title:
            "Task Management",

          description:
            "Allow users to create, organize, and manage daily tasks.",
        },

        {
          title:
            "Smart Suggestions",

          description:
            "Provide useful suggestions based on the user's requests.",
        },

        {
          title:
            "Personalized Assistance",

          description:
            "Adapt responses according to the user's preferences and needs.",
        },

        {
          title:
            "Responsive Interface",

          description:
            "Provide a clean interface that works across different screen sizes.",
        },

      ];

    }


    /*
    ================================================
    INTERNSHIP FINDER
    ================================================
    */

    else if (
      lowerIdea.includes(
        "internship"
      )
    ) {

      title =
        "Smart Internship Finder";

      problem =
        "Students often struggle to discover relevant internship opportunities and organize application information.";

      solution =
        "Build a platform that helps students discover, organize, and track internship opportunities.";

      features = [

        {
          title:
            "Internship Search",

          description:
            "Allow students to search for internship opportunities.",
        },

        {
          title:
            "Opportunity Filters",

          description:
            "Filter opportunities based on skills, location, and domain.",
        },

        {
          title:
            "Application Tracker",

          description:
            "Track internship applications and their current status.",
        },

        {
          title:
            "Profile Management",

          description:
            "Store important student skills and career information.",
        },

        {
          title:
            "Responsive Interface",

          description:
            "Provide a user-friendly experience across devices.",
        },

      ];

    }


    /*
    ================================================
    EXPENSE / FINANCE
    ================================================
    */

    else if (
      lowerIdea.includes(
        "expense"
      ) ||
      lowerIdea.includes(
        "finance"
      ) ||
      lowerIdea.includes(
        "budget"
      )
    ) {

      title =
        "Smart Personal Finance Tracker";

      problem =
        "Users often find it difficult to track spending and understand where their money is going.";

      solution =
        "Build a simple finance management application that helps users record transactions, monitor spending, and manage budgets.";

      features = [

        {
          title:
            "Transaction Tracking",

          description:
            "Allow users to record income and expenses.",
        },

        {
          title:
            "Budget Management",

          description:
            "Allow users to create and monitor monthly budgets.",
        },

        {
          title:
            "Financial Summary",

          description:
            "Display income, expenses, savings, and balance.",
        },

        {
          title:
            "Spending Insights",

          description:
            "Show useful information about spending patterns.",
        },

        {
          title:
            "Responsive Dashboard",

          description:
            "Provide a clean dashboard for managing finances.",
        },

      ];

    }


    /*
    ================================================
    CHATBOT
    ================================================
    */

    else if (
      lowerIdea.includes(
        "chatbot"
      ) ||
      lowerIdea.includes(
        "chat bot"
      )
    ) {

      title =
        "AI Chatbot";

      problem =
        "Users need a simple way to interact with an intelligent system and receive useful responses.";

      solution =
        "Build a conversational chatbot that understands user questions and provides helpful responses.";

    }


    /*
    ================================================
    TODO / TASK MANAGER
    ================================================
    */

    else if (
      lowerIdea.includes(
        "todo"
      ) ||
      lowerIdea.includes(
        "to-do"
      ) ||
      lowerIdea.includes(
        "task manager"
      ) ||
      lowerIdea.includes(
        "tasks"
      )
    ) {

      title =
        "Smart Task Manager";

      problem =
        "People often struggle to organize tasks and remember what needs to be completed.";

      solution =
        "Build a task management application that helps users organize, prioritize, and track their work.";

    }


    /*
    ================================================
    WEATHER
    ================================================
    */

    else if (
      lowerIdea.includes(
        "weather"
      )
    ) {

      title =
        "Weather Assistant";

      problem =
        "Users need quick and understandable weather information when planning their activities.";

      solution =
        "Build a weather assistant that presents weather information in a simple and user-friendly way.";

    }


    /*
    ================================================
    RECOMMENDATION
    ================================================
    */

    else if (
      lowerIdea.includes(
        "recommendation"
      )
    ) {

      title =
        "Smart Recommendation System";

      problem =
        "Users often have difficulty finding relevant options from large amounts of information.";

      solution =
        "Build a recommendation system that provides personalized suggestions based on user preferences.";

    }


    /*
    ================================================
    AI PROJECT MENTOR
    ================================================
    */

    else if (
      lowerIdea.includes(
        "project mentor"
      )
    ) {

      title =
        "AI Project Mentor";

      problem =
        "Beginner developers often have project ideas but do not know how to convert them into practical implementations.";

      solution =
        "Build an AI project mentor that transforms ideas into structured project plans and guides users through development.";

    }


    /*
    ================================================
    TECH STACK
    ================================================
    */

    const techStack = {

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

    };


    /*
    ================================================
    ROADMAP
    ================================================
    */

    const roadmap = [

      {
        phase: "01",

        title:
          "Project Setup",

        description:
          "Initialize the React frontend and Node.js backend.",
      },

      {
        phase: "02",

        title:
          "Build Core Features",

        description:
          "Create the main interface and implement the most important functionality.",
      },

      {
        phase: "03",

        title:
          "Build AI Mentor",

        description:
          "Create the mentor system that understands project questions and provides useful guidance.",
      },

      {
        phase: "04",

        title:
          "Add Progress Tracking",

        description:
          "Track completed tasks, features, and project progress.",
      },

      {
        phase: "05",

        title:
          "Testing & Deployment",

        description:
          "Test the application, improve the interface, fix errors, and prepare the project for deployment.",
      },

    ];


    /*
    ================================================
    DIFFICULTY
    ================================================
    */

    let difficulty =
      "Beginner → Intermediate";

    if (
      experience === "Advanced"
    ) {

      difficulty =
        "Intermediate → Advanced";

    } else if (
      experience === "Intermediate"
    ) {

      difficulty =
        "Intermediate";

    }


    /*
    ================================================
    AI MENTOR INSIGHTS
    ================================================
    */

    const insights = [

      {
        title:
          "Start Small",

        description:
          "Build the core functionality first before adding advanced features.",
      },

      {
        title:
          "Focus on Users",

        description:
          "Design every feature around solving a real problem for your target users.",
      },

      {
        title:
          "Test Continuously",

        description:
          "Test every feature as you build instead of waiting until the end.",
      },

      {
        title:
          "Build an MVP",

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
        category ||
        "Web Application",

      experience:
        experience ||
        "Beginner",

      problem,

      solution,

      users,

      features,

      techStack,

      roadmap,

      difficulty,

      impact:
        "High",

      insights,

    };


    /*
    ================================================
    SERVER LOG
    ================================================
    */

    console.log(
      "Blueprint generated:",
      title
    );


    /*
    ================================================
    SEND RESPONSE
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

This version does NOT require a paid API key.

It uses local project-aware logic so the
hackathon MVP can work completely offline.
==================================================
*/

app.post("/api/mentor", (req, res) => {

  try {

    /*
    ================================================
    REQUEST DATA
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
    CLEAN QUESTION
    ================================================
    */

    const cleanQuestion =
      question.trim();


    const lowerQuestion =
      cleanQuestion.toLowerCase();


    /*
    ================================================
    PROJECT INFORMATION
    ================================================
    */

    const projectTitle =
      project?.title ||
      "your project";

    const projectIdea =
      project?.idea ||
      "";


    /*
    ================================================
    DEFAULT ANSWER
    ================================================
    */

    let answer = `

For ${projectTitle}, start by building the core functionality.

Break the project into small features and implement them one at a time.

Your immediate goal should be to create a simple working MVP before adding advanced functionality.

    `.trim();


    /*
    ================================================
    BUILD FIRST
    ================================================
    */

    if (
      lowerQuestion.includes(
        "build first"
      ) ||
      lowerQuestion.includes(
        "start"
      ) ||
      lowerQuestion.includes(
        "first step"
      )
    ) {

      answer = `

Start with the MVP of ${projectTitle}.

Recommended order:

1. Create the main dashboard.
2. Add the most important core feature.
3. Test that feature.
4. Add the AI Mentor.
5. Add progress tracking.
6. Polish the interface.

Don't try to build everything at once.

Get one complete feature working before moving to the next one.

      `.trim();

    }


    /*
    ================================================
    FEATURES
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "feature"
      ) ||
      lowerQuestion.includes(
        "what should i add"
      ) ||
      lowerQuestion.includes(
        "what can i add"
      )
    ) {

      answer = `

For ${projectTitle}, focus on these core features:

1. AI Mentor
2. Personalized Planning
3. Smart Explanations
4. Progress Tracking
5. Dashboard

For a hackathon, make these features functional instead of adding many unfinished features.

      `.trim();

    }


    /*
    ================================================
    TECHNOLOGY
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "technology"
      ) ||
      lowerQuestion.includes(
        "technology should"
      ) ||
      lowerQuestion.includes(
        "tech stack"
      ) ||
      lowerQuestion.includes(
        "which tech"
      )
    ) {

      answer = `

For ${projectTitle}, your current stack is a good choice:

Frontend:
React + JavaScript + CSS

Backend:
Node.js + Express.js

Storage:
Local Storage

AI:
Local Mentor Logic

Future:
You can connect an external AI service later if you find a suitable free option.

You don't need a paid API to complete the current MVP.

      `.trim();

    }


    /*
    ================================================
    HACKATHON
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "hackathon"
      ) ||
      lowerQuestion.includes(
        "hackathon improve"
      ) ||
      lowerQuestion.includes(
        "improve it"
      )
    ) {

      answer = `

To make ${projectTitle} stronger for a hackathon:

1. Clearly demonstrate the problem.
2. Show the complete user journey.
3. Keep the UI polished.
4. Make the core features actually work.
5. Demonstrate the AI Mentor.
6. Show progress tracking.
7. Explain the project's real-world impact.

A polished working MVP is much stronger than a huge unfinished application.

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

Let's debug ${projectTitle} systematically.

1. Read the exact error message.
2. Identify the file mentioned.
3. Check the line number.
4. Check the browser console.
5. Check the backend terminal.
6. Fix one problem at a time.
7. Restart the server if necessary.
8. Test the feature again.

If you give me the exact error message, we can identify the problem more precisely.

      `.trim();

    }


    /*
    ================================================
    AI QUESTIONS
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "api"
      ) ||
      lowerQuestion.includes(
        "openai"
      ) ||
      lowerQuestion.includes(
        "llm"
      ) ||
      lowerQuestion.includes(
        "artificial intelligence"
      )
    ) {

      answer = `

You don't need a paid OpenAI API key for the current version.

The project currently uses local mentor logic.

That lets us demonstrate the AI Mentor experience without paying for an API.

Later, the backend can be upgraded to connect to an external AI service without rebuilding the frontend.

      `.trim();

    }


    /*
    ================================================
    STUDY ASSISTANT
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "study plan"
      ) ||
      lowerQuestion.includes(
        "study planner"
      )
    ) {

      answer = `

For the study assistant, create a simple study planner.

Ask the student for:

• Subject
• Topic
• Available study time
• Target date
• Learning goal

Then generate a structured plan.

Start with rule-based planning first. Later, an external AI service can make the recommendations more intelligent.

      `.trim();

    }


    /*
    ================================================
    DASHBOARD
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "dashboard"
      )
    ) {

      answer = `

Your dashboard should give students a quick overview of their learning.

Include:

• Subjects
• Today's tasks
• Study progress
• Completed topics
• Current study streak
• Upcoming goals
• Quick access to AI Mentor

Keep the first version simple and clean.

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

For progress tracking, start with:

• Completed topics
• Total topics
• Study sessions
• Completed tasks
• Progress percentage

You can store this information in Local Storage for the hackathon MVP.

A database can be added later.

      `.trim();

    }


    /*
    ================================================
    CURRENT PROJECT
    ================================================
    */

    else if (
      lowerQuestion.includes(
        "project"
      ) ||
      lowerQuestion.includes(
        "idea"
      )
    ) {

      answer = `

Your current project is:

${projectTitle}

Project idea:

${projectIdea}

The best next step is to turn the blueprint into a working MVP.

Start with the dashboard, then implement the core feature, then connect the AI Mentor and progress tracking.

      `.trim();

    }


    /*
    ================================================
    DEFAULT
    ================================================
    */

    else {

      answer = `

For ${projectTitle}, I recommend breaking your idea into small, testable features.

Your next steps are:

1. Build the dashboard.
2. Implement one core feature.
3. Test it.
4. Add the AI Mentor.
5. Add progress tracking.
6. Polish the UI.

You can ask me things like:

• What should I build first?
• What features should I add?
• Which technology should I use?
• How can I improve it for a hackathon?
• How should I debug this?

      `.trim();

    }


    /*
    ================================================
    LOG
    ================================================
    */

    console.log(
      "Mentor question:",
      cleanQuestion
    );


    /*
    ================================================
    RESPONSE
    ================================================
    */

    return res.status(200).json({

      success: true,

      answer,

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

app.use((req, res) => {

  res.status(404).json({

    success: false,

    error:
      `Route ${req.method} ${req.originalUrl} not found.`,

  });

});


/*
==================================================
GLOBAL ERROR HANDLER
==================================================
*/

app.use(
  (error, req, res, next) => {

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
      "   AI PROJECT MENTOR BACKEND"
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