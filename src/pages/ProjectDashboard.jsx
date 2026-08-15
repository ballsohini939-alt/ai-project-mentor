import { useEffect, useMemo, useState } from "react";

function ProjectDashboard({
  project,
  onBackToBlueprint,
  onOpenMentor,
}) {
  // =====================================================
  // SAFETY CHECK
  // =====================================================

  if (!project) {
    return (
      <div className="dashboard-page">

        <div className="dashboard-container">

          <section className="dashboard-card">

            <div className="dashboard-icon">
              ⚠️
            </div>

            <span className="dashboard-label">
              PROJECT
            </span>

            <h2>
              No project found
            </h2>

            <p>
              Please generate a project
              blueprint first.
            </p>

            <button
              type="button"
              className="dashboard-blueprint-button"
              onClick={onBackToBlueprint}
            >
              ← Back to Blueprint
            </button>

          </section>

        </div>

      </div>
    );
  }

  // =====================================================
  // STORAGE KEY
  // =====================================================

  const storageKey = useMemo(() => {
    const base =
      project.id ||
      project.title ||
      project.idea ||
      "default-project";

    return String(base)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }, [
    project.id,
    project.title,
    project.idea,
  ]);

  // =====================================================
  // ROADMAP
  // =====================================================

  const roadmap = Array.isArray(
    project.roadmap
  )
    ? project.roadmap
    : [];

  // =====================================================
  // COMPLETED TASKS
  // =====================================================

  const [completedTasks, setCompletedTasks] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            `ai-project-completed-${storageKey}`
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    });

  // =====================================================
  // NOTES
  // =====================================================

  const [notes, setNotes] =
    useState(() => {
      try {
        return (
          localStorage.getItem(
            `ai-project-notes-${storageKey}`
          ) || ""
        );
      } catch {
        return "";
      }
    });

  // =====================================================
  // SAVE COMPLETED TASKS
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        `ai-project-completed-${storageKey}`,
        JSON.stringify(completedTasks)
      );
    } catch (error) {
      console.error(
        "Could not save progress:",
        error
      );
    }
  }, [
    completedTasks,
    storageKey,
  ]);

  // =====================================================
  // SAVE NOTES
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        `ai-project-notes-${storageKey}`,
        notes
      );
    } catch (error) {
      console.error(
        "Could not save notes:",
        error
      );
    }
  }, [
    notes,
    storageKey,
  ]);

  // =====================================================
  // TOGGLE TASK
  // =====================================================

  const toggleTask = (index) => {
    setCompletedTasks(
      (previous) => {
        if (
          previous.includes(index)
        ) {
          return previous.filter(
            (item) =>
              item !== index
          );
        }

        return [
          ...previous,
          index,
        ];
      }
    );
  };

  // =====================================================
  // PROGRESS
  // =====================================================

  const totalTasks =
    roadmap.length;

  const completedCount =
    completedTasks.filter(
      (index) =>
        index < totalTasks
    ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedCount /
            totalTasks) *
            100
        );

  // =====================================================
  // NEXT TASK
  // =====================================================

  const nextTaskIndex =
    roadmap.findIndex(
      (_, index) =>
        !completedTasks.includes(
          index
        )
    );

  const nextTask =
    nextTaskIndex !== -1
      ? roadmap[nextTaskIndex]
      : null;

  // =====================================================
  // HELPERS
  // =====================================================

  const getPhaseTitle = (
    phase,
    index
  ) => {
    if (
      typeof phase === "string"
    ) {
      return phase;
    }

    return (
      phase?.title ||
      phase?.name ||
      `Development Phase ${
        index + 1
      }`
    );
  };

  const getPhaseDescription = (
    phase
  ) => {
    if (
      typeof phase === "string"
    ) {
      return "Complete this development phase.";
    }

    return (
      phase?.description ||
      phase?.details ||
      "Complete this phase of your project."
    );
  };

  const getPhaseNumber = (
    phase,
    index
  ) => {
    if (
      typeof phase === "object" &&
      phase?.phase
    ) {
      return String(
        phase.phase
      ).padStart(2, "0");
    }

    if (
      typeof phase === "object" &&
      phase?.number
    ) {
      return String(
        phase.number
      ).padStart(2, "0");
    }

    return String(
      index + 1
    ).padStart(2, "0");
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* ================= HEADER ================= */}

        <header className="dashboard-header">

          <div>

            <span className="dashboard-badge">
              ✦ AI PROJECT MENTOR
            </span>

            <h1>
              {project.title ||
                "My AI Project"}
            </h1>

            <p>
              Your project building
              workspace.
            </p>

          </div>

          <button
            type="button"
            className="dashboard-back-button"
            onClick={
              onBackToBlueprint
            }
          >
            ← Blueprint
          </button>

        </header>

        {/* ================= PROGRESS ================= */}

        <section className="dashboard-card progress-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-label">
                PROJECT PROGRESS
              </span>

              <h2>
                {progress}% Complete
              </h2>

            </div>

            <div className="progress-percentage">
              {progress}%
            </div>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="progress-text">
            {completedCount} of{" "}
            {totalTasks} roadmap
            phases completed.
          </p>

        </section>

        {/* ================= MAIN GRID ================= */}

        <div className="dashboard-grid">

          {/* ROADMAP */}

          <section className="dashboard-card roadmap-card">

            <div className="dashboard-card-header">

              <div>

                <span className="dashboard-label">
                  DEVELOPMENT ROADMAP
                </span>

                <h2>
                  Build your project
                </h2>

              </div>

              <span className="task-count">
                {completedCount}/
                {totalTasks}
              </span>

            </div>

            <div className="dashboard-roadmap">

              {roadmap.length === 0 ? (

                <div className="dashboard-empty-state">

                  <p>
                    No roadmap phases
                    are available yet.
                  </p>

                </div>

              ) : (

                roadmap.map(
                  (
                    phase,
                    index
                  ) => {

                    const completed =
                      completedTasks.includes(
                        index
                      );

                    return (
                      <div
                        key={index}
                        className={
                          completed
                            ? "dashboard-task completed"
                            : "dashboard-task"
                        }
                      >

                        <button
                          type="button"
                          className="task-checkbox"
                          onClick={() =>
                            toggleTask(
                              index
                            )
                          }
                          aria-label={
                            completed
                              ? "Mark task incomplete"
                              : "Mark task complete"
                          }
                        >
                          {completed
                            ? "✓"
                            : ""}
                        </button>

                        <div className="task-number">
                          {getPhaseNumber(
                            phase,
                            index
                          )}
                        </div>

                        <div className="task-content">

                          <h3>
                            {getPhaseTitle(
                              phase,
                              index
                            )}
                          </h3>

                          <p>
                            {getPhaseDescription(
                              phase
                            )}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </section>

          {/* NEXT STEP */}

          <section className="dashboard-card next-step-card">

            <div className="dashboard-icon">
              🎯
            </div>

            <span className="dashboard-label">
              NEXT RECOMMENDED STEP
            </span>

            {nextTask ? (

              <>

                <h2>
                  {getPhaseTitle(
                    nextTask,
                    nextTaskIndex
                  )}
                </h2>

                <p>
                  {getPhaseDescription(
                    nextTask
                  )}
                </p>

                <div className="next-step-number">
                  Phase{" "}
                  {getPhaseNumber(
                    nextTask,
                    nextTaskIndex
                  )}
                </div>

              </>

            ) : (

              <>

                <h2>
                  🎉 Roadmap Complete!
                </h2>

                <p>
                  Excellent work! You
                  have completed every
                  development phase.
                </p>

              </>

            )}

          </section>

        </div>

        {/* ================= AI MENTOR ================= */}

        <section className="dashboard-card mentor-dashboard-card">

          <div className="dashboard-icon">
            🤖
          </div>

          <span className="dashboard-label">
            AI PROJECT MENTOR
          </span>

          <h2>
            Need help with your project?
          </h2>

          <p>
            Ask the AI Mentor when you
            are stuck, need an explanation,
            or don't know what to build
            next.
          </p>

          <button
            type="button"
            className="dashboard-mentor-button"
            onClick={
              onOpenMentor ||
              onBackToBlueprint
            }
          >
            Ask AI Mentor ✦
          </button>

        </section>

        {/* ================= NOTES ================= */}

        <section className="dashboard-card notes-card">

          <div className="dashboard-icon">
            📝
          </div>

          <span className="dashboard-label">
            PROJECT NOTES
          </span>

          <h2>
            Keep track of your ideas
          </h2>

          <p>
            Write down implementation
            ideas, bugs, questions, or
            anything you want to remember.
          </p>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            placeholder="Write your project notes here..."
            rows={7}
          />

          <span className="notes-status">
            {notes.length} characters
          </span>

        </section>

        {/* ================= SUMMARY ================= */}

        <section className="dashboard-card summary-card">

          <span className="dashboard-label">
            PROJECT SUMMARY
          </span>

          <h2>
            {project.title ||
              "AI Project"}
          </h2>

          <p>
            {project.idea ||
              "Your project idea"}
          </p>

          <div className="summary-tags">

            <span>
              📁{" "}
              {project.category ||
                "AI / Machine Learning"}
            </span>

            <span>
              🎓{" "}
              {project.experience ||
                "Beginner"}
            </span>

            <span>
              🚀{" "}
              {project.impact ||
                "High"}{" "}
              Impact
            </span>

            <span>
              📊{" "}
              {project.difficulty ||
                "Beginner → Intermediate"}
            </span>

          </div>

        </section>

        {/* ================= BOTTOM ACTION ================= */}

        <div className="dashboard-actions">

          <button
            type="button"
            className="dashboard-blueprint-button"
            onClick={
              onBackToBlueprint
            }
          >
            ← View Full Blueprint
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProjectDashboard;