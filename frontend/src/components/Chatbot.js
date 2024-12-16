import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const userId = "default_user"; // Replace with dynamic user ID if needed
  const chatWindowRef = useRef(null); // Reference to chat window

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Prevent sending empty messages or double sending
    setIsLoading(true); // Start loading spinner

    // Add the user's message to the conversation
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await axios.post("http://localhost:5005/chat", {
        user_id: userId,
        message: input,
      });

      const botMessage = {
        role: "assistant",
        content: response.data.response,
      };

      // Add the bot's response to the conversation
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      const errorMessage = {
        role: "assistant",
        content: "I'm sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput(""); // Clear the input field
    setIsLoading(false); // Stop loading spinner
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearHistory = async () => {
    try {
      await axios.post(`http://localhost:5005/clear-history/${userId}`);
      setMessages([]); // Clear messages in the UI
    } catch (error) {
      console.error("Error clearing conversation history:", error);
      alert("Failed to clear history. Please try again.");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : "Send"}
        </button>
        <button onClick={clearHistory} className="clear-history-btn">
          Clear History
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
