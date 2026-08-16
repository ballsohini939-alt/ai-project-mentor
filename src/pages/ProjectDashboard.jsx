import { useEffect, useMemo, useState } from "react";

function ProjectDashboard({
  project,
  onBackToBlueprint,
  onOpenMentor,
}) {
  // =====================================================
  // STORAGE KEY
  // =====================================================

  const storageKey = useMemo(() => {
    const base =
      project?.id ||
      project?.title ||
      project?.idea ||
      "default-project";

    return String(base)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }, [
    project?.id,
    project?.title,
    project?.idea,
  ]);

  // =====================================================
  // STORAGE KEYS
  // =====================================================

  const progressStorageKey =
    `ai-project-dashboard-progress-${storageKey}`;

  const notesStorageKey =
    `ai-project-notes-${storageKey}`;

  // =====================================================
  // ROADMAP
  // =====================================================

  const roadmap = Array.isArray(project?.roadmap)
    ? project.roadmap
    : [];

  // =====================================================
  // FEATURES
  // =====================================================

  const features = Array.isArray(project?.features)
    ? project.features
    : [];

  // =====================================================
  // TECH STACK
  // =====================================================

  const techStack = project?.techStack || {};

  const technologies = [
    ...(Array.isArray(techStack.frontend)
      ? techStack.frontend
      : []),

    ...(Array.isArray(techStack.backend)
      ? techStack.backend
      : []),

    ...(Array.isArray(techStack.ai)
      ? techStack.ai
      : []),

    ...(Array.isArray(techStack.database)
      ? techStack.database
      : []),
  ];

  const uniqueTechnologies = [
    ...new Set(technologies),
  ];

  // =====================================================
  // STATE
  // =====================================================

  const [completedTasks, setCompletedTasks] =
    useState([]);

  const [subtasks, setSubtasks] =
    useState({});

  const [activePhase, setActivePhase] =
    useState(null);

  const [notes, setNotes] =
    useState("");

  const [suggestionSeed, setSuggestionSeed] =
    useState(0);

  // =====================================================
  // IMPORTANT:
  // PREVENT INITIAL STATE FROM OVERWRITING STORAGE
  // =====================================================

  const [progressLoaded, setProgressLoaded] =
    useState(false);

  const [notesLoaded, setNotesLoaded] =
    useState(false);

  // =====================================================
  // LOAD DASHBOARD PROGRESS
  // =====================================================

  useEffect(() => {
    if (!project) {
      return;
    }

    setProgressLoaded(false);

    try {
      const saved = localStorage.getItem(
        progressStorageKey
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (
          parsed &&
          typeof parsed === "object"
        ) {
          if (
            Array.isArray(
              parsed.completedTasks
            )
          ) {
            setCompletedTasks(
              parsed.completedTasks
            );
          } else {
            setCompletedTasks([]);
          }

          if (
            parsed.subtasks &&
            typeof parsed.subtasks ===
              "object"
          ) {
            setSubtasks(
              parsed.subtasks
            );
          } else {
            setSubtasks({});
          }
        } else {
          setCompletedTasks([]);
          setSubtasks({});
        }
      } else {
        // -------------------------------------------------
        // BACKWARD COMPATIBILITY
        // -------------------------------------------------

        const oldCompleted =
          localStorage.getItem(
            `ai-project-completed-${storageKey}`
          );

        const oldSubtasks =
          localStorage.getItem(
            `ai-project-subtasks-${storageKey}`
          );

        if (oldCompleted) {
          try {
            const parsedCompleted =
              JSON.parse(oldCompleted);

            if (
              Array.isArray(
                parsedCompleted
              )
            ) {
              setCompletedTasks(
                parsedCompleted
              );
            }
          } catch (error) {
            console.error(
              "Could not read old completed progress:",
              error
            );
          }
        }

        if (oldSubtasks) {
          try {
            const parsedSubtasks =
              JSON.parse(oldSubtasks);

            if (
              parsedSubtasks &&
              typeof parsedSubtasks ===
                "object"
            ) {
              setSubtasks(
                parsedSubtasks
              );
            }
          } catch (error) {
            console.error(
              "Could not read old subtasks:",
              error
            );
          }
        }
      }
    } catch (error) {
      console.error(
        "Failed to load dashboard progress:",
        error
      );

      setCompletedTasks([]);
      setSubtasks({});
    } finally {
      setProgressLoaded(true);
    }
  }, [
    project,
    progressStorageKey,
    storageKey,
  ]);

  // =====================================================
  // LOAD NOTES
  // =====================================================

  useEffect(() => {
    if (!project) {
      return;
    }

    setNotesLoaded(false);

    try {
      const saved =
        localStorage.getItem(
          notesStorageKey
        );

      setNotes(saved || "");
    } catch (error) {
      console.error(
        "Failed to load project notes:",
        error
      );

      setNotes("");
    } finally {
      setNotesLoaded(true);
    }
  }, [
    project,
    notesStorageKey,
  ]);

  // =====================================================
  // SAVE DASHBOARD PROGRESS
  //
  // IMPORTANT:
  // This DOES NOT run until progressLoaded === true.
  // Therefore initial [] / {} cannot overwrite storage.
  // =====================================================

  useEffect(() => {
    if (
      !project ||
      !progressLoaded
    ) {
      return;
    }

    try {
      localStorage.setItem(
        progressStorageKey,
        JSON.stringify({
          completedTasks,
          subtasks,
        })
      );

      // -------------------------------------------------
      // KEEP OLD KEYS TOO FOR COMPATIBILITY
      // -------------------------------------------------

      localStorage.setItem(
        `ai-project-completed-${storageKey}`,
        JSON.stringify(
          completedTasks
        )
      );

      localStorage.setItem(
        `ai-project-subtasks-${storageKey}`,
        JSON.stringify(
          subtasks
        )
      );
    } catch (error) {
      console.error(
        "Could not save dashboard progress:",
        error
      );
    }
  }, [
    completedTasks,
    subtasks,
    project,
    progressLoaded,
    progressStorageKey,
    storageKey,
  ]);

  // =====================================================
  // SAVE NOTES
  // =====================================================

  useEffect(() => {
    if (
      !project ||
      !notesLoaded
    ) {
      return;
    }

    try {
      localStorage.setItem(
        notesStorageKey,
        notes
      );
    } catch (error) {
      console.error(
        "Could not save project notes:",
        error
      );
    }
  }, [
    notes,
    project,
    notesLoaded,
    notesStorageKey,
  ]);

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
              onClick={
                onBackToBlueprint
              }
            >
              ← Back to Blueprint
            </button>

          </section>

        </div>
      </div>
    );
  }

  // =====================================================
  // PHASE HELPERS
  // =====================================================

  function getPhaseTitle(
    phase,
    index
  ) {
    if (
      typeof phase ===
      "string"
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
  }

  function getPhaseDescription(
    phase
  ) {
    if (
      typeof phase ===
      "string"
    ) {
      return "Complete this development phase.";
    }

    return (
      phase?.description ||
      phase?.details ||
      "Complete this development phase."
    );
  }

  function getPhaseNumber(
    phase,
    index
  ) {
    if (
      typeof phase ===
        "object" &&
      phase?.phase
    ) {
      return String(
        phase.phase
      ).padStart(2, "0");
    }

    if (
      typeof phase ===
        "object" &&
      phase?.number
    ) {
      return String(
        phase.number
      ).padStart(2, "0");
    }

    return String(
      index + 1
    ).padStart(2, "0");
  }

  // =====================================================
  // PHASE TASK GENERATOR
  // =====================================================

  const getPhaseTasks = (
    phase,
    index
  ) => {
    const title =
      getPhaseTitle(
        phase,
        index
      ).toLowerCase();

    if (
      title.includes("setup")
    ) {
      return [
        "Create the project structure",
        "Set up the React frontend",
        "Set up the Node.js backend",
        "Run the application locally",
      ];
    }

    if (
      title.includes("conversation") ||
      title.includes("chat")
    ) {
      return [
        "Create the chat interface",
        "Add message input",
        "Add send button",
        "Connect project context",
      ];
    }

    if (
      title.includes("task")
    ) {
      return [
        "Create the task interface",
        "Allow users to add tasks",
        "Allow users to update tasks",
        "Allow users to complete tasks",
      ];
    }

    if (
      title.includes("smart") ||
      title.includes("assistance")
    ) {
      return [
        "Create personalized suggestions",
        "Analyze the current project context",
        "Recommend useful next actions",
        "Test assistant recommendations",
      ];
    }

    if (
      title.includes("testing") ||
      title.includes("deployment")
    ) {
      return [
        "Test all major features",
        "Fix bugs and UI issues",
        "Test responsive layouts",
        "Prepare the project for deployment",
      ];
    }

    return [
      "Understand the requirements",
      "Implement the main functionality",
      "Test the feature",
      "Review and improve the implementation",
    ];
  };

  // =====================================================
  // SUBTASK KEY
  // =====================================================

  const getSubtaskKey = (
    phaseIndex,
    taskIndex
  ) => {
    return `${phaseIndex}-${taskIndex}`;
  };

  // =====================================================
  // SUBTASK STATUS
  // =====================================================

  const isSubtaskComplete = (
    phaseIndex,
    taskIndex
  ) => {
    return Boolean(
      subtasks[
        getSubtaskKey(
          phaseIndex,
          taskIndex
        )
      ]
    );
  };

  // =====================================================
  // CHECK ALL SUBTASKS
  // =====================================================

  const areAllSubtasksComplete = (
    phaseIndex
  ) => {
    const tasks =
      getPhaseTasks(
        roadmap[phaseIndex],
        phaseIndex
      );

    if (
      tasks.length === 0
    ) {
      return false;
    }

    return tasks.every(
      (_, taskIndex) =>
        isSubtaskComplete(
          phaseIndex,
          taskIndex
        )
    );
  };

  // =====================================================
  // TOGGLE SUBTASK
  // =====================================================

  const toggleSubtask = (
    phaseIndex,
    taskIndex
  ) => {
    const key =
      getSubtaskKey(
        phaseIndex,
        taskIndex
      );

    setSubtasks(
      (previous) => ({
        ...previous,
        [key]:
          !previous[key],
      })
    );

    setSuggestionSeed(
      (value) => value + 1
    );
  };

  // =====================================================
  // COMPLETE PHASE
  // =====================================================

  const completePhase = (
    phaseIndex
  ) => {
    if (
      phaseIndex === null ||
      phaseIndex === undefined
    ) {
      return;
    }

    const tasks =
      getPhaseTasks(
        roadmap[phaseIndex],
        phaseIndex
      );

    // ---------------------------------------------------
    // COMPLETE ALL SUBTASKS
    // ---------------------------------------------------

    setSubtasks(
      (previous) => {
        const updated = {
          ...previous,
        };

        tasks.forEach(
          (_, taskIndex) => {
            updated[
              getSubtaskKey(
                phaseIndex,
                taskIndex
              )
            ] = true;
          }
        );

        return updated;
      }
    );

    // ---------------------------------------------------
    // MARK PHASE COMPLETE
    // ---------------------------------------------------

    setCompletedTasks(
      (previous) => {
        if (
          previous.includes(
            phaseIndex
          )
        ) {
          return previous;
        }

        return [
          ...previous,
          phaseIndex,
        ].sort(
          (a, b) => a - b
        );
      }
    );

    setSuggestionSeed(
      (value) => value + 1
    );
  };

  // =====================================================
  // UPDATE PHASE COMPLETION FROM SUBTASKS
  //
  // This keeps phase status synchronized.
  // =====================================================

  useEffect(() => {
    if (
      !progressLoaded ||
      roadmap.length === 0
    ) {
      return;
    }

    setCompletedTasks(
      (previous) => {
        let changed = false;

        let updated = [
          ...previous,
        ];

        roadmap.forEach(
          (_, phaseIndex) => {
            const allComplete =
              areAllSubtasksComplete(
                phaseIndex
              );

            const exists =
              updated.includes(
                phaseIndex
              );

            if (
              allComplete &&
              !exists
            ) {
              updated.push(
                phaseIndex
              );

              changed = true;
            }

            if (
              !allComplete &&
              exists
            ) {
              updated =
                updated.filter(
                  (item) =>
                    item !==
                    phaseIndex
                );

              changed = true;
            }
          }
        );

        if (!changed) {
          return previous;
        }

        return [
          ...new Set(updated),
        ].sort(
          (a, b) => a - b
        );
      }
    );
  }, [
    subtasks,
    roadmap,
    progressLoaded,
  ]);

  // =====================================================
  // PROJECT PROGRESS
  // =====================================================

  const totalPhases =
    roadmap.length;

  const completedCount =
    completedTasks.filter(
      (index) =>
        index >= 0 &&
        index < totalPhases
    ).length;

  const progress =
    totalPhases === 0
      ? 0
      : Math.round(
          (completedCount /
            totalPhases) *
            100
        );

  const remainingCount =
    Math.max(
      totalPhases -
        completedCount,
      0
    );

  const isProjectComplete =
    totalPhases > 0 &&
    completedCount ===
      totalPhases;

  // =====================================================
  // NEXT PHASE
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
  // ACTIVE PHASE
  // =====================================================

  const selectedPhase =
    activePhase !== null
      ? roadmap[activePhase]
      : null;

  const selectedPhaseTasks =
    activePhase !== null &&
    selectedPhase
      ? getPhaseTasks(
          selectedPhase,
          activePhase
        )
      : [];

  const selectedCompletedCount =
    activePhase !== null
      ? selectedPhaseTasks.filter(
          (_, taskIndex) =>
            isSubtaskComplete(
              activePhase,
              taskIndex
            )
        ).length
      : 0;

  const selectedProgress =
    selectedPhaseTasks.length ===
    0
      ? 0
      : Math.round(
          (selectedCompletedCount /
            selectedPhaseTasks.length) *
            100
        );

  // =====================================================
  // SMART ASSISTANCE
  // =====================================================

  const smartSuggestions = useMemo(() => {
    const suggestions = [];

    const currentPhaseIndex =
      nextTaskIndex !== -1
        ? nextTaskIndex
        : Math.max(
            roadmap.length - 1,
            0
          );

    const currentPhase =
      roadmap[
        currentPhaseIndex
      ];

    const currentTitle =
      currentPhase
        ? getPhaseTitle(
            currentPhase,
            currentPhaseIndex
          )
        : "Project Complete";

    const currentDescription =
      currentPhase
        ? getPhaseDescription(
            currentPhase
          )
        : "All roadmap phases are complete.";

    // ===================================================
    // PROGRESS / COMPLETION
    // ===================================================

    if (
      progress === 0
    ) {
      suggestions.push({
        icon: "🚀",
        title:
          "Start your first phase",
        text:
          "Your project is ready to begin. Open Phase 01 and complete the objectives one by one.",
        action:
          "Open Phase 01",
        phaseIndex:
          roadmap.length > 0
            ? 0
            : null,
      });
    } else if (
      progress < 50
    ) {
      suggestions.push({
        icon: "📈",
        title:
          "Build the foundation",
        text:
          `You are ${progress}% through the project. Focus on the current roadmap phase before adding advanced features.`,
        action:
          "Open Current Phase",
        phaseIndex:
          nextTaskIndex !== -1
            ? nextTaskIndex
            : null,
      });
    } else if (
      progress < 100
    ) {
      suggestions.push({
        icon: "🔥",
        title:
          "You're making strong progress",
        text:
          `Your project is ${progress}% complete. Keep your focus on the next unfinished phase.`,
        action:
          "Continue Building",
        phaseIndex:
          nextTaskIndex !== -1
            ? nextTaskIndex
            : null,
      });
    } else {
      suggestions.push({
        icon: "🎉",
        title:
          "Project roadmap complete",
        text:
          "All roadmap phases are complete. Review your project, test the main features, and prepare it for presentation or deployment.",
        action:
          "Review Project",
        phaseIndex:
          null,
      });
    }

    // ===================================================
    // CURRENT PHASE
    // ===================================================

    if (
      !isProjectComplete &&
      currentPhase
    ) {
      suggestions.push({
        icon: "🎯",
        title:
          `Focus: ${currentTitle}`,
        text:
          currentDescription,
        action:
          "Open Phase",
        phaseIndex:
          currentPhaseIndex,
      });
    }

    // ===================================================
    // COMPLETION ACTIONS
    // ===================================================

    if (
      isProjectComplete
    ) {
      suggestions.push({
        icon: "🧪",
        title:
          "Test your completed project",
        text:
          "Run through every major feature, check for bugs, and verify that the application still works correctly after refreshing the page.",
        action:
          "Review Project",
        phaseIndex:
          null,
      });

      suggestions.push({
        icon: "📱",
        title:
          "Check responsive design",
        text:
          "Test the interface on different screen sizes and make sure important buttons, cards, forms, and navigation remain usable.",
        action:
          "Check UI",
        phaseIndex:
          null,
      });

      suggestions.push({
        icon: "🚀",
        title:
          "Prepare for deployment",
        text:
          "Create a production build, verify the application, and prepare your project for deployment or presentation.",
        action:
          "Prepare Deployment",
        phaseIndex:
          null,
      });
    }

    // ===================================================
    // PROJECT CONTEXT
    // ===================================================

    if (
      project?.idea
    ) {
      suggestions.push({
        icon: "💡",
        title:
          "Stay aligned with your idea",
        text:
          `Keep the implementation focused on: "${project.idea}"`,
        action:
          "View Project",
        phaseIndex:
          null,
      });
    }

    // ===================================================
    // TECHNOLOGY
    // ===================================================

    if (
      uniqueTechnologies.length >
      0
    ) {
      const technology =
        uniqueTechnologies[
          suggestionSeed %
            uniqueTechnologies.length
        ];

      suggestions.push({
        icon: "💻",
        title:
          "Technology suggestion",
        text:
          `Use ${technology} where it makes sense, but avoid adding unnecessary technologies before the core features work.`,
        action:
          "View Tech Stack",
        phaseIndex:
          null,
      });
    }

    // ===================================================
    // REMAINING PHASES
    // ===================================================

    if (
      remainingCount > 0
    ) {
      suggestions.push({
        icon: "🗺️",
        title:
          "Keep the roadmap small",
        text:
          `${remainingCount} ${
            remainingCount === 1
              ? "phase remains"
              : "phases remain"
          }. Finish the current work before expanding the scope.`,
        action:
          "View Roadmap",
        phaseIndex:
          nextTaskIndex !== -1
            ? nextTaskIndex
            : null,
      });
    }

    // ===================================================
    // NOTES
    // ===================================================

    if (
      !notes.trim()
    ) {
      suggestions.push({
        icon: "📝",
        title:
          "Use your project notebook",
        text:
          "Write down bugs, ideas, implementation questions, and things you want to research later.",
        action:
          "Add Notes",
        phaseIndex:
          null,
      });
    }

    return suggestions.slice(
      0,
      6
    );
  }, [
    project,
    roadmap,
    nextTaskIndex,
    progress,
    remainingCount,
    uniqueTechnologies,
    notes,
    suggestionSeed,
    isProjectComplete,
  ]);

  // =====================================================
  // OPEN PHASE
  // =====================================================

  const openPhase = (
    index
  ) => {
    if (
      index === null ||
      index === undefined ||
      index < 0 ||
      index >= roadmap.length
    ) {
      return;
    }

    setActivePhase(index);

    setTimeout(() => {
      const element =
        document.getElementById(
          "phase-workspace"
        );

      if (element) {
        element.scrollIntoView({
          behavior:
            "smooth",
          block: "start",
        });
      }
    }, 50);
  };

  // =====================================================
  // RESET PROGRESS
  // =====================================================

  const resetProgress = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to reset all project progress?"
      );

    if (!confirmed) {
      return;
    }

    setCompletedTasks([]);
    setSubtasks({});
    setActivePhase(null);

    setSuggestionSeed(
      (value) =>
        value + 1
    );
  };

  // =====================================================
  // SMART ACTION
  // =====================================================

  const handleSuggestionAction = (
    suggestion
  ) => {
    if (
      suggestion.phaseIndex !==
        null &&
      suggestion.phaseIndex !==
        undefined
    ) {
      openPhase(
        suggestion.phaseIndex
      );

      return;
    }

    // ---------------------------------------------------
    // For non-phase suggestions, simply keep the user
    // on the dashboard and provide a useful scroll target.
    // ---------------------------------------------------

    if (
      suggestion.action ===
      "Add Notes"
    ) {
      const notesElement =
        document.querySelector(
          ".notes-card textarea"
        );

      if (notesElement) {
        notesElement.focus();

        notesElement.scrollIntoView({
          behavior:
            "smooth",
          block: "center",
        });
      }

      return;
    }

    if (
      suggestion.action ===
      "View Tech Stack"
    ) {
      const phaseElement =
        document.querySelector(
          ".phase-workspace"
        );

      if (
        phaseElement
      ) {
        phaseElement.scrollIntoView({
          behavior:
            "smooth",
          block: "center",
        });
      }

      return;
    }

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
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
              ✦ AI PROJECT WORKSPACE
            </span>

            <h1>
              {project.title ||
                "AI Personal Assistant"}
            </h1>

            <p>
              Turn your blueprint into
              a real project.
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

        {/* =================================================
            PROJECT OVERVIEW
        ================================================= */}

        <section className="dashboard-card">

          <span className="dashboard-label">
            PROJECT OVERVIEW
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
                "Software Development"}
            </span>

            <span>
              🎓{" "}
              {project.experience ||
                "Beginner"}
            </span>

            <span>
              🚀{" "}
              {project.difficulty ||
                "Beginner → Intermediate"}
            </span>

            <span>
              💡{" "}
              {project.impact ||
                "High"}{" "}
              Impact
            </span>

          </div>

        </section>

        {/* =================================================
            PROJECT PROGRESS
        ================================================= */}

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
                width:
                  `${progress}%`,
              }}
            />

          </div>

          <p className="progress-text">
            {completedCount} of{" "}
            {totalPhases} roadmap
            phases completed.
          </p>

          <p className="progress-text">
            {remainingCount}{" "}
            {remainingCount === 1
              ? "phase"
              : "phases"}{" "}
            remaining
          </p>

          {isProjectComplete && (
            <div className="phase-completed-message">
              🎉 All roadmap phases completed!
            </div>
          )}

          <button
            type="button"
            className="dashboard-reset-button"
            onClick={
              resetProgress
            }
          >
            Reset Progress
          </button>

        </section>

        {/* =================================================
            SMART ASSISTANCE
        ================================================= */}

        <section className="dashboard-card smart-assistance-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-label">
                ✦ SMART ASSISTANCE
              </span>

              <h2>
                What should you do next?
              </h2>

              <p>
                Personalized recommendations
                based on your project,
                roadmap, and progress.
              </p>

            </div>

            <button
              type="button"
              className="dashboard-reset-button"
              onClick={() =>
                setSuggestionSeed(
                  (value) =>
                    value + 1
                )
              }
            >
              Refresh Suggestions
            </button>

          </div>

          <div className="smart-suggestions">

            {smartSuggestions.map(
              (
                suggestion,
                index
              ) => (

                <div
                  className="smart-suggestion"
                  key={`${suggestion.title}-${index}`}
                >

                  <div className="smart-suggestion-icon">
                    {suggestion.icon}
                  </div>

                  <div className="smart-suggestion-content">

                    <h3>
                      {suggestion.title}
                    </h3>

                    <p>
                      {suggestion.text}
                    </p>

                    {suggestion.action && (
                      <button
                        type="button"
                        className="dashboard-blueprint-button"
                        onClick={() =>
                          handleSuggestionAction(
                            suggestion
                          )
                        }
                      >
                        {suggestion.action}
                        {" →"}
                      </button>
                    )}

                  </div>

                </div>

              )
            )}

          </div>

          <div className="smart-assistance-footer">

            <span>
              💡 Rule-based project intelligence
            </span>

            <span>
              No API required
            </span>

          </div>

        </section>

        {/* =================================================
            ROADMAP
        ================================================= */}

        <section className="dashboard-card roadmap-card">

          <div className="dashboard-card-header">

            <div>

              <span className="dashboard-label">
                DEVELOPMENT ROADMAP
              </span>

              <h2>
                Build step by step
              </h2>

            </div>

            <span className="task-count">
              {completedCount}/
              {totalPhases}
            </span>

          </div>

          <div className="dashboard-roadmap">

            {roadmap.length === 0 ? (

              <div className="dashboard-empty-state">

                <p>
                  No roadmap phases are
                  available yet.
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

                  const selected =
                    activePhase ===
                    index;

                  return (
                    <div
                      key={index}
                      className={[
                        "dashboard-task",
                        completed
                          ? "completed"
                          : "",
                        selected
                          ? "selected"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >

                      {/* PHASE CHECK */}

                      <button
                        type="button"
                        className="task-checkbox"
                        onClick={() =>
                          completed
                            ? setCompletedTasks(
                                (
                                  previous
                                ) =>
                                  previous.filter(
                                    (
                                      item
                                    ) =>
                                      item !==
                                      index
                                  )
                              )
                            : completePhase(
                                index
                              )
                        }
                      >
                        {completed
                          ? "✓"
                          : ""}
                      </button>

                      {/* NUMBER */}

                      <div className="task-number">
                        {getPhaseNumber(
                          phase,
                          index
                        )}
                      </div>

                      {/* CONTENT */}

                      <button
                        type="button"
                        className="task-content"
                        onClick={() =>
                          openPhase(
                            index
                          )
                        }
                      >

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

                        <span className="phase-open-hint">
                          {selected
                            ? "Viewing workspace ↑"
                            : "Open phase →"}
                        </span>

                      </button>

                    </div>
                  );
                }
              )

            )}

          </div>

        </section>

        {/* =================================================
            PHASE WORKSPACE
        ================================================= */}

        {selectedPhase && (

          <section
            id="phase-workspace"
            className="dashboard-card phase-workspace"
          >

            <div className="phase-workspace-header">

              <div>

                <span className="dashboard-label">
                  PHASE{" "}
                  {getPhaseNumber(
                    selectedPhase,
                    activePhase
                  )}
                </span>

                <h2>
                  {getPhaseTitle(
                    selectedPhase,
                    activePhase
                  )}
                </h2>

                <p>
                  {getPhaseDescription(
                    selectedPhase
                  )}
                </p>

              </div>

              <button
                type="button"
                className="phase-close-button"
                onClick={() =>
                  setActivePhase(
                    null
                  )
                }
              >
                ✕
              </button>

            </div>

            {/* PHASE PROGRESS */}

            <div className="phase-progress">

              <div className="phase-progress-header">

                <span>
                  Phase progress
                </span>

                <strong>
                  {selectedProgress}%
                </strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${selectedProgress}%`,
                  }}
                />

              </div>

              <p>
                {selectedCompletedCount} of{" "}
                {selectedPhaseTasks.length}{" "}
                tasks completed
              </p>

            </div>

            {/* =================================================
                SUBTASKS
            ================================================= */}

            <div className="phase-panel">

              <span className="dashboard-label">
                WHAT TO BUILD
              </span>

              <h3>
                Phase objectives
              </h3>

              <div className="subtask-list">

                {selectedPhaseTasks.map(
                  (
                    task,
                    taskIndex
                  ) => {

                    const completed =
                      isSubtaskComplete(
                        activePhase,
                        taskIndex
                      );

                    return (
                      <button
                        key={taskIndex}
                        type="button"
                        className={
                          completed
                            ? "subtask completed"
                            : "subtask"
                        }
                        onClick={() =>
                          toggleSubtask(
                            activePhase,
                            taskIndex
                          )
                        }
                      >

                        <span className="subtask-checkbox">
                          {completed
                            ? "✓"
                            : ""}
                        </span>

                        <span className="subtask-number">
                          {taskIndex +
                            1}
                        </span>

                        <span className="subtask-text">
                          {task}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* =================================================
                TECHNOLOGIES
            ================================================= */}

            <div className="phase-panel">

              <span className="dashboard-label">
                TECHNOLOGIES
              </span>

              <h3>
                Tools you can use
              </h3>

              <div className="technology-list">

                {uniqueTechnologies.length ===
                0 ? (

                  <span>
                    No technologies defined yet.
                  </span>

                ) : (

                  uniqueTechnologies.map(
                    (
                      technology
                    ) => (
                      <span
                        key={
                          technology
                        }
                      >
                        💻{" "}
                        {technology}
                      </span>
                    )
                  )

                )}

              </div>

            </div>

            {/* =================================================
                COMPLETE PHASE
            ================================================= */}

            <div className="phase-action">

              {completedTasks.includes(
                activePhase
              ) ? (

                <div className="phase-completed-message">
                  ✓ This phase is
                  completed.
                </div>

              ) : (

                <button
                  type="button"
                  className="dashboard-mentor-button"
                  onClick={() =>
                    completePhase(
                      activePhase
                    )
                  }
                >
                  Complete Phase ✓
                </button>

              )}

            </div>

          </section>
        )}

        {/* =================================================
            NEXT STEP
        ================================================= */}

        <section className="dashboard-card next-step-card">

          <div className="dashboard-icon">
            🎯
          </div>

          <span className="dashboard-label">
            RECOMMENDED NEXT STEP
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

              <button
                type="button"
                className="dashboard-blueprint-button"
                onClick={() =>
                  openPhase(
                    nextTaskIndex
                  )
                }
              >
                Open This Phase →
              </button>

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

        {/* =================================================
            PROJECT STATS
        ================================================= */}

        <section className="dashboard-card summary-card">

          <span className="dashboard-label">
            PROJECT STATS
          </span>

          <h2>
            Your current build
          </h2>

          <div className="project-stats-grid">

            <div className="project-stat">

              <strong>
                🛠️ {features.length}
              </strong>

              <span>
                Features
              </span>

            </div>

            <div className="project-stat">

              <strong>
                🗺️ {roadmap.length}
              </strong>

              <span>
                Roadmap Phases
              </span>

            </div>

            <div className="project-stat">

              <strong>
                ✅ {completedCount}
              </strong>

              <span>
                Completed
              </span>

            </div>

            <div className="project-stat">

              <strong>
                ⏳ {remainingCount}
              </strong>

              <span>
                Remaining
              </span>

            </div>

            <div className="project-stat">

              <strong>
                📈 {progress}%
              </strong>

              <span>
                Progress
              </span>

            </div>

            <div className="project-stat">

              <strong>
                💻{" "}
                {uniqueTechnologies.length}
              </strong>

              <span>
                Technologies
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            AI MENTOR
        ================================================= */}

        <section className="dashboard-card mentor-dashboard-card">

          <div className="dashboard-icon">
            🤖
          </div>

          <span className="dashboard-label">
            AI PROJECT MENTOR
          </span>

          <h2>
            Need help while building?
          </h2>

          <p>
            The conversational AI Mentor
            is currently being improved.
            For now, use Smart Assistance
            and your development roadmap
            to guide your next steps.
          </p>

          <button
            type="button"
            className="dashboard-mentor-button"
            onClick={
              onOpenMentor ||
              (() => {})
            }
          >
            Open AI Mentor
          </button>

        </section>

        {/* =================================================
            NOTES
        ================================================= */}

        <section className="dashboard-card notes-card">

          <div className="dashboard-icon">
            📝
          </div>

          <span className="dashboard-label">
            PROJECT NOTES
          </span>

          <h2>
            Your development notebook
          </h2>

          <p>
            Save ideas, bugs,
            implementation plans,
            questions, or anything
            else related to your project.
          </p>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            placeholder={`Example:

- Need to build login page
- Add task database
- Improve dashboard UI
- Research AI integration`}
            rows={8}
          />

          <span className="notes-status">
            {notes.length} characters
            {" • "}
            Saved automatically
          </span>

        </section>

        {/* =================================================
            BLUEPRINT
        ================================================= */}

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