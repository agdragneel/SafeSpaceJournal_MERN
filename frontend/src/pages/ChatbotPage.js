import React from "react";
import Chatbot from "../components/Chatbot";
import StarryNightBG from "../components/StarryNightBG";
import "./ChatbotPage.css"; // Import the scoped CSS

const ChatbotPage = () => {
  return (
    <div className="chatbot-page-container">
      <StarryNightBG className="particles-background" />
      <div className="chatbot-content">
        <h1>Be yourself</h1>
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotPage;
