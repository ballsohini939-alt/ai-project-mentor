import { useEffect, useMemo, useState } from "react";

function PhaseWorkspace({
  project,
  phase,
  phaseIndex,
  onBack,
}) {
  // =====================================================
  // SAFETY CHECK
  // =====================================================

  if (!project || !phase) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <section className="dashboard-card">
            <span className="dashboard-label">
              PHASE
            </span>

            <h2>
              Phase not found
            </h2>

            <p>
              Please return to your project dashboard.
            </p>

            <button
              type="button"
              className="dashboard-blueprint-button"
              onClick={onBack}
            >
              Back to Dashboard
            </button>
          </section>
        </div>
      </div>
    );
  }

  // =====================================================
  // PHASE INFORMATION
  // =====================================================

  const phaseTitle =
    typeof phase === "string"
      ? phase
      : phase.title ||
        phase.name ||
        `Development Phase ${phaseIndex + 1}`;

  const phaseDescription =
    typeof phase === "string"
      ? "Complete this development phase."
      : phase.description ||
        phase.details ||
        "Complete this phase of your project.";

  const phaseNumber =
    typeof phase === "object" && phase.phase
      ? String(phase.phase).padStart(2, "0")
      : String(phaseIndex + 1).padStart(2, "0");

  // =====================================================
  // PHASE-SPECIFIC TASKS
  // =====================================================

  const defaultTasks = [
    {
      title: "Understand the phase requirements",
      description:
        "Read the phase objective and decide what needs to be built.",
    },
    {
      title: "Set up the required files",
      description:
        "Create the files and folders required for this phase.",
    },
    {
      title: "Implement the core functionality",
      description:
        "Build the main functionality described in this phase.",
    },
    {
      title: "Test the implementation",
      description:
        "Run the project and verify that the feature works correctly.",
    },
    {
      title: "Review and improve",
      description:
        "Fix problems and improve the implementation before moving forward.",
    },
  ];

  // =====================================================
  // STORAGE KEY
  // =====================================================

  const storageKey = useMemo(() => {
    const projectKey =
      project.id ||
      project.title ||
      project.idea ||
      "project";

    return `ai-phase-${String(projectKey)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}-${phaseIndex}`;
  }, [
    project.id,
    project.title,
    project.idea,
    phaseIndex,
  ]);

  // =====================================================
  // TASK STATE
  // =====================================================

  const [completedTasks, setCompletedTasks] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            `${storageKey}-tasks`
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

  const [notes, setNotes] = useState(() => {
    try {
      return (
        localStorage.getItem(
          `${storageKey}-notes`
        ) || ""
      );
    } catch {
      return "";
    }
  });

  // =====================================================
  // SAVE TASKS
  // =====================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        `${storageKey}-tasks`,
        JSON.stringify(completedTasks)
      );
    } catch (error) {
      console.error(
        "Failed to save phase tasks:",
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
        `${storageKey}-notes`,
        notes
      );
    } catch (error) {
      console.error(
        "Failed to save phase notes:",
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
    setCompletedTasks((previous) => {
      if (previous.includes(index)) {
        return previous.filter(
          (item) => item !== index
        );
      }

      return [
        ...previous,
        index,
      ];
    });
  };

  // =====================================================
  // PROGRESS
  // =====================================================

  const completedCount =
    completedTasks.length;

  const totalTasks =
    defaultTasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedCount /
            totalTasks) *
            100
        );

  // =====================================================
  // RESET
  // =====================================================

  const resetPhase = () => {
    const confirmed = window.confirm(
      "Reset all progress for this phase?"
    );

    if (confirmed) {
      setCompletedTasks([]);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">

          <div>

            <span className="dashboard-badge">
              PHASE {phaseNumber}
            </span>

            <h1>
              {phaseTitle}
            </h1>

            <p>
              Work through this phase step by step.
            </p>

          </div>

          <button
            type="button"
            className="dashboard-back-button"
            onClick={onBack}
          >
            Back to Dashboard
          </button>

        </header>

        {/* =================================================
            PHASE OBJECTIVE
        ================================================= */}

        <section className="dashboard-card">

          <span className="dashboard-label">
            PHASE OBJECTIVE
          </span>

          <h2>
            What are you building?
          </h2>

          <p>
            {phaseDescription}
          </p>

          <div className="summary-tags">

            <span>
              Project:{" "}
              {project.title ||
                "My Project"}
            </span>

            <span>
              Phase {phaseNumber}
            </span>

            <span>
              {progress}% Complete
            </span>

          </div>

        </section>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <section className="dashboard-card progress-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-label">
                PHASE PROGRESS
              </span>

              <h2>
                {progress}% Complete
              </h2>

            </div>

            <div className="progress-percentage">
              {completedCount}/{totalTasks}
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
            {totalTasks} tasks completed.
          </p>

        </section>

        {/* =================================================
            TASKS
        ================================================= */}

        <section className="dashboard-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-label">
                PHASE TASKS
              </span>

              <h2>
                What you need to do
              </h2>

            </div>

            <span className="task-count">
              {completedCount}/
              {totalTasks}
            </span>

          </div>

          <div className="dashboard-roadmap">

            {defaultTasks.map(
              (task, index) => {

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
                        toggleTask(index)
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
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="task-content">

                      <h3>
                        {task.title}
                      </h3>

                      <p>
                        {task.description}
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

          <button
            type="button"
            className="dashboard-reset-button"
            onClick={resetPhase}
          >
            Reset Phase Progress
          </button>

        </section>

        {/* =================================================
            DEVELOPMENT TIPS
        ================================================= */}

        <section className="dashboard-card">

          <span className="dashboard-label">
            DEVELOPMENT TIPS
          </span>

          <h2>
            Build smart
          </h2>

          <div className="summary-tags">

            <span>
              Build one feature at a time
            </span>

            <span>
              Test as you go
            </span>

            <span>
              Keep your code organized
            </span>

            <span>
              Commit your progress
            </span>

          </div>

        </section>

        {/* =================================================
            NOTES
        ================================================= */}

        <section className="dashboard-card notes-card">

          <div className="dashboard-icon">
            NOTES
          </div>

          <span className="dashboard-label">
            PHASE NOTES
          </span>

          <h2>
            Keep your implementation notes
          </h2>

          <p>
            Record bugs, ideas, commands,
            questions, or implementation details
            for this phase.
          </p>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            placeholder="Write notes for this phase..."
            rows={8}
          />

          <span className="notes-status">
            {notes.length} characters • Saved
            automatically
          </span>

        </section>

        {/* =================================================
            COMPLETE MESSAGE
        ================================================= */}

        {progress === 100 && (
          <section className="dashboard-card mentor-dashboard-card">

            <div className="dashboard-icon">
              DONE
            </div>

            <span className="dashboard-label">
              PHASE COMPLETE
            </span>

            <h2>
              Excellent work!
            </h2>

            <p>
              You completed all tasks in this
              development phase. You are ready
              to move to the next phase.
            </p>

          </section>
        )}

        {/* =================================================
            BACK
        ================================================= */}

        <div className="dashboard-actions">

          <button
            type="button"
            className="dashboard-blueprint-button"
            onClick={onBack}
          >
            Back to Project Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default PhaseWorkspace;