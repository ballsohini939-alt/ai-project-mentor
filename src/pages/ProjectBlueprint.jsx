import { useState } from "react";

function ProjectBlueprint({
  project,
  onCreateAnother,
  onStartBuilding,
}) {
  const [question, setQuestion] =
    useState("");

  const [mentorAnswer, setMentorAnswer] =
    useState("");

  const [mentorLoading, setMentorLoading] =
    useState(false);

  const [mentorError, setMentorError] =
    useState("");

  // =====================================================
  // SAFETY CHECK
  // =====================================================

  if (!project) {
    return (
      <div className="blueprint-page">

        <div
          style={{
            maxWidth: "700px",
            margin: "100px auto",
            padding: "40px",
            textAlign: "center",
          }}
        >

          <div
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            ⚠️
          </div>

          <h2>
            No Project Blueprint Found
          </h2>

          <p>
            Please go back and enter your
            project idea first.
          </p>

          <button
            type="button"
            className="create-another-button"
            onClick={onCreateAnother}
          >
            ← Create Project
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // ASK AI MENTOR
  // =====================================================

  const askMentor = async () => {
    const cleanQuestion =
      question.trim();

    if (!cleanQuestion) {
      return;
    }

    setMentorLoading(true);
    setMentorError("");
    setMentorAnswer("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/mentor",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            question:
              cleanQuestion,

            project: {
              title:
                project.title,

              idea:
                project.idea,

              category:
                project.category,

              experience:
                project.experience,
            },
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "MENTOR RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "AI Mentor request failed."
        );
      }

      if (!data.answer) {
        throw new Error(
          "AI Mentor returned no answer."
        );
      }

      setMentorAnswer(
        data.answer
      );
    } catch (error) {
      console.error(
        "AI Mentor Error:",
        error
      );

      setMentorError(
        error.message ||
          "Unable to connect to the AI Mentor."
      );
    } finally {
      setMentorLoading(false);
    }
  };

  // =====================================================
  // KEYBOARD
  // =====================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      askMentor();
    }
  };

  // =====================================================
  // FORMAT AI ANSWER
  // =====================================================

  const formatAnswer = (answer) => {
    if (!answer) {
      return null;
    }

    return answer
      .split("\n")
      .map((line, index) => (
        <p key={index}>
          {line || "\u00A0"}
        </p>
      ));
  };

  // =====================================================
  // SAFE DATA
  // =====================================================

  const users =
    project.users ||
    project.targetUsers ||
    [];

  const features =
    Array.isArray(project.features)
      ? project.features
      : [];

  const roadmap =
    Array.isArray(project.roadmap)
      ? project.roadmap
      : [];

  const insights =
    Array.isArray(project.insights)
      ? project.insights
      : [];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="blueprint-page">

      {/* ================= HEADER ================= */}

      <div className="blueprint-header">

        <div className="blueprint-badge">
          ✦ AI GENERATED BLUEPRINT
        </div>

        <h1>
          Your project blueprint.
        </h1>

        <p>
          Here's a structured plan generated
          from your project idea.
        </p>

      </div>

      {/* ================= PROJECT IDEA ================= */}

      <section className="blueprint-section">

        <div className="section-icon">
          💡
        </div>

        <div className="section-content">

          <span className="section-label">
            PROJECT IDEA
          </span>

          <h2>
            {project.title ||
              "AI Project"}
          </h2>

          <p className="project-idea">
            {project.idea}
          </p>

          <div className="project-meta">

            <span>
              📁{" "}
              {project.category ||
                "Web Application"}
            </span>

            <span>
              🎓{" "}
              {project.experience ||
                "Beginner"}
            </span>

          </div>

        </div>

      </section>

      {/* ================= PROBLEM ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          🎯
        </div>

        <span className="section-label">
          PROBLEM STATEMENT
        </span>

        <h2>
          What problem are we solving?
        </h2>

        <p>
          {project.problem ||
            "Define the main problem your project solves."}
        </p>

      </section>

      {/* ================= SOLUTION ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          💡
        </div>

        <span className="section-label">
          PROPOSED SOLUTION
        </span>

        <h2>
          How the project helps
        </h2>

        <p>
          {project.solution ||
            "Describe how your project solves the problem."}
        </p>

      </section>

      {/* ================= TARGET USERS ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          👥
        </div>

        <span className="section-label">
          TARGET USERS
        </span>

        <h2>
          Who is this project for?
        </h2>

        <div className="tag-container">

          {users.length === 0 ? (

            <span className="blueprint-tag">
              General Users
            </span>

          ) : (

            users.map(
              (user, index) => (

                <span
                  className="blueprint-tag"
                  key={index}
                >
                  {user}
                </span>

              )
            )

          )}

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          🧩
        </div>

        <span className="section-label">
          RECOMMENDED FEATURES
        </span>

        <h2>
          What should you build?
        </h2>

        <div className="feature-grid">

          {features.map(
            (feature, index) => (

              <div
                className="feature-item"
                key={index}
              >

                <div className="feature-number">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </div>

                <div>

                  <h3>
                    {feature.title ||
                      `Feature ${
                        index + 1
                      }`}
                  </h3>

                  <p>
                    {feature.description ||
                      "Recommended project feature."}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* ================= TECH STACK ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          ⚙️
        </div>

        <span className="section-label">
          RECOMMENDED TECH STACK
        </span>

        <h2>
          Technologies to use
        </h2>

        <div className="tech-grid">

          <TechCategory
            title="Frontend"
            items={
              project.techStack
                ?.frontend
            }
          />

          <TechCategory
            title="Backend"
            items={
              project.techStack
                ?.backend
            }
          />

          <TechCategory
            title="AI"
            items={
              project.techStack
                ?.ai
            }
          />

          <TechCategory
            title="Database"
            items={
              project.techStack
                ?.database
            }
          />

        </div>

      </section>

      {/* ================= ROADMAP ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          🗺️
        </div>

        <span className="section-label">
          DEVELOPMENT ROADMAP
        </span>

        <h2>
          How to build it
        </h2>

        <div className="roadmap">

          {roadmap.map(
            (step, index) => (

              <div
                className="roadmap-item"
                key={index}
              >

                <div className="roadmap-number">
                  {step.phase ||
                    String(
                      index + 1
                    ).padStart(2, "0")}
                </div>

                <div>

                  <h3>
                    {step.title ||
                      `Development Phase ${
                        index + 1
                      }`}
                  </h3>

                  <p>
                    {step.description ||
                      "Complete this development phase."}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* ================= STATS ================= */}

      <div className="stats-grid">

        <section className="blueprint-card stat-card">

          <div className="card-icon">
            📊
          </div>

          <span className="section-label">
            PROJECT DIFFICULTY
          </span>

          <h2>
            {project.difficulty ||
              "Beginner → Intermediate"}
          </h2>

          <p>
            The recommended difficulty is
            based on your experience level
            and project complexity.
          </p>

        </section>

        <section className="blueprint-card stat-card">

          <div className="card-icon">
            🚀
          </div>

          <span className="section-label">
            POTENTIAL IMPACT
          </span>

          <h2>
            {project.impact ||
              "High"}
          </h2>

          <p>
            This project has strong potential
            to become a practical portfolio
            or hackathon project.
          </p>

        </section>

      </div>

      {/* ================= INSIGHTS ================= */}

      <section className="blueprint-card">

        <div className="card-icon">
          💡
        </div>

        <span className="section-label">
          AI MENTOR INSIGHTS
        </span>

        <h2>
          Tips from your AI mentor
        </h2>

        <div className="insights">

          {insights.map(
            (insight, index) => (

              <div
                className="insight-item"
                key={index}
              >

                <div className="insight-number">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </div>

                <div>

                  <h3>
                    {insight.title}
                  </h3>

                  <p>
                    {insight.description}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* ================= AI MENTOR ================= */}

      <section className="mentor-card">

        <div className="mentor-header">

          <div className="mentor-icon">
            🤖
          </div>

          <div>

            <span className="section-label">
              AI PROJECT MENTOR
            </span>

            <h2>
              Stuck? Ask your mentor.
            </h2>

            <p>
              Ask questions about your project,
              features, technology, debugging,
              AI, or what to build next.
            </p>

          </div>

        </div>

        {/* QUICK QUESTIONS */}

        <div className="quick-questions">

          <button
            type="button"
            onClick={() =>
              setQuestion(
                "What should I build first?"
              )
            }
            disabled={mentorLoading}
          >
            🚀 What should I build first?
          </button>

          <button
            type="button"
            onClick={() =>
              setQuestion(
                "What features should I add?"
              )
            }
            disabled={mentorLoading}
          >
            🧩 What features should I add?
          </button>

          <button
            type="button"
            onClick={() =>
              setQuestion(
                "Which technology should I use?"
              )
            }
            disabled={mentorLoading}
          >
            ⚙️ Which technology should I use?
          </button>

          <button
            type="button"
            onClick={() =>
              setQuestion(
                "How can I improve this project for a hackathon?"
              )
            }
            disabled={mentorLoading}
          >
            🏆 How can I improve it for a hackathon?
          </button>

        </div>

        {/* INPUT */}

        <div className="mentor-input-wrapper">

          <textarea
            value={question}
            onChange={(event) =>
              setQuestion(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI mentor anything..."
            rows={4}
            disabled={mentorLoading}
          />

          <div className="mentor-input-footer">

            <span>
              Press Enter to ask • Shift +
              Enter for a new line
            </span>

            <button
              type="button"
              onClick={askMentor}
              disabled={
                mentorLoading ||
                !question.trim()
              }
            >
              {mentorLoading
                ? "Thinking..."
                : "Ask AI Mentor ✦"}
            </button>

          </div>

        </div>

        {/* ERROR */}

        {mentorError && (

          <div className="mentor-error">
            ⚠️ {mentorError}
          </div>

        )}

        {/* ANSWER */}

        {mentorAnswer && (

          <div className="mentor-answer">

            <div className="mentor-answer-title">

              🤖 AI Mentor

              <span>
                Project guidance
              </span>

            </div>

            <div className="mentor-answer-content">
              {formatAnswer(
                mentorAnswer
              )}
            </div>

          </div>

        )}

      </section>

      {/* ================= ACTIONS ================= */}

      <div className="create-another-container">

        <button
          type="button"
          className="create-another-button"
          onClick={onStartBuilding}
        >
          🚀 Start Building
        </button>

        <button
          type="button"
          className="create-another-button"
          onClick={onCreateAnother}
        >
          Create Another Project
        </button>

      </div>

    </div>
  );
}

// =====================================================
// TECH CATEGORY
// =====================================================

function TechCategory({
  title,
  items,
}) {
  const safeItems = Array.isArray(items)
    ? items
    : items
      ? [items]
      : [];

  return (
    <div className="tech-category">

      <h3>
        {title}
      </h3>

      <div className="tech-list">

        {safeItems.map(
          (item, index) => (

            <span key={index}>
              {item}
            </span>

          )
        )}

      </div>

    </div>
  );
}

export default ProjectBlueprint;