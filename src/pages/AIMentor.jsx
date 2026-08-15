import { useState } from "react";

function AIMentor({ project }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi! I'm your AI Project Mentor. Ask me anything about your project, roadmap, features, technology, or how to get started.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // ==================================================
  // SEND MESSAGE TO BACKEND
  // ==================================================

  const handleSend = async () => {
    const userMessage = message.trim();

    if (!userMessage || loading) {
      return;
    }

    // Add user's message to chat
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      // ==================================================
      // CALL BACKEND
      // ==================================================

      const response = await fetch(
        "http://localhost:5000/api/mentor",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            question: userMessage,

            project: project || null,
          }),
        }
      );

      const data = await response.json();

      console.log("MENTOR RESPONSE:", data);

      // ==================================================
      // ERROR CHECK
      // ==================================================

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to get mentor response."
        );
      }

      // ==================================================
      // ADD MENTOR RESPONSE
      // ==================================================

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text:
            data.answer ||
            "I couldn't generate a response.",
        },
      ]);

    } catch (error) {
      console.error(
        "Mentor error:",
        error
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          text:
            "Sorry, I couldn't connect to the AI Mentor backend. Make sure your Node.js server is running on port 5000.",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };


  // ==================================================
  // ENTER KEY
  // ==================================================

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };


  // ==================================================
  // QUICK QUESTIONS
  // ==================================================

  const quickQuestions = [
    "How should I start this project?",
    "What features should I build first?",
    "Which technology should I use?",
    "How can I make this project better?",
  ];


  return (
    <div className="ai-mentor-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="ai-mentor-header">

        <div className="ai-mentor-badge">
          ✦ AI PROJECT MENTOR
        </div>

        <h1>
          Build smarter with your
          <span> AI Mentor</span>
        </h1>

        <p>
          Get guidance, ideas, and development advice
          for your project.
        </p>

      </div>


      {/* ==================================================
          PROJECT CONTEXT
      ================================================== */}

      {project && (
        <div className="mentor-project-context">

          <div>
            <small>PROJECT</small>

            <h3>
              {project.title}
            </h3>
          </div>

          <p>
            {project.idea}
          </p>

        </div>
      )}


      {/* ==================================================
          CHAT CONTAINER
      ================================================== */}

      <div className="mentor-chat-container">

        {/* ==================================================
            MESSAGES
        ================================================== */}

        <div className="mentor-messages">

          {messages.map(
            (item, index) => (

              <div
                key={index}
                className={
                  item.role === "user"
                    ? "mentor-message user-message"
                    : "mentor-message assistant-message"
                }
              >

                <div className="mentor-avatar">
                  {item.role === "user"
                    ? "👤"
                    : "✦"}
                </div>

                <div className="mentor-message-content">

                  <span className="mentor-message-name">
                    {item.role === "user"
                      ? "You"
                      : "AI Mentor"}
                  </span>

                  <p>
                    {item.text}
                  </p>

                </div>

              </div>

            )
          )}


          {/* ==================================================
              LOADING
          ================================================== */}

          {loading && (
            <div className="mentor-message assistant-message">

              <div className="mentor-avatar">
                ✦
              </div>

              <div className="mentor-message-content">

                <span className="mentor-message-name">
                  AI Mentor
                </span>

                <p>
                  Thinking...
                </p>

              </div>

            </div>
          )}

        </div>


        {/* ==================================================
            QUICK QUESTIONS
        ================================================== */}

        <div className="mentor-quick-questions">

          <p>
            Try asking:
          </p>

          <div>

            {quickQuestions.map(
              (question) => (

                <button
                  key={question}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setMessage(question)
                  }
                >
                  {question}
                </button>

              )
            )}

          </div>

        </div>


        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="mentor-input-area">

          <textarea
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI mentor anything..."
            rows={3}
            disabled={loading}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={
              loading ||
              !message.trim()
            }
            className="mentor-send-button"
          >
            {loading
              ? "Thinking..."
              : "Send ✦"}
          </button>

        </div>

        <p className="mentor-input-hint">
          Press Enter to send • Shift + Enter for a new line
        </p>

      </div>

    </div>
  );
}

export default AIMentor;