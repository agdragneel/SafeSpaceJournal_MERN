import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import
import './Journal.css';

const Journal = ({ token }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [heading, setHeading] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null); // Track selected entry
  const [isWriting, setIsWriting] = useState(false); // Toggle between writing mode
  const [isAddMode, setIsAddMode] = useState(false); // Check if the "Add" button is in use
  const [analysis, setAnalysis] = useState(""); // Store analysis response
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Show loading state for analysis

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/journal/entries",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Sort entries by createdAt in descending order
      const sortedEntries = data.entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Set the sorted entries
      setJournalEntries(sortedEntries);
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    }
  };

  // Fetch entries on component mount or when token changes
  useEffect(() => {
    fetchEntries();
  }, [token]);

  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will format it to a readable date and time string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Decode the token to extract user info
      const decoded = jwtDecode(token);

      const userId = decoded.userId; // Extract userId
      const createdBy = decoded.email; // Extract email (ensure token contains email)

      if (!userId || !createdBy) {
        alert("Error: User information is missing in the token.");
        return;
      }

      // Create a new journal entry
      const newJournalEntry = {
        userId, // Store the user's ID
        heading, // Journal heading
        entryText: newEntry, // Journal content
        createdAt: new Date().toISOString(), // Current timestamp
        createdBy, // Store the user's email
      };

      // Send the journal entry to the backend
      await axios.post(
        "http://localhost:5001/api/journal/entries",
        newJournalEntry,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch the updated list of journal entries
      await fetchEntries();

      // Reset the input fields
      setNewEntry("");
      setHeading("");
      alert("Journal entry added!");
      setIsWriting(false); // Switch back to reading mode
      setIsAddMode(false); // Switch Add to Cancel
    } catch (error) {
      console.error("Error adding journal entry:", error.message);
    }
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
    setAnalysis(""); // Clear previous analysis
    setIsWriting(false); // Ensure it's not in writing mode when an entry is clicked
    setIsAddMode(false); // Reset the Add mode button
  };

  const handleAddClick = () => {
    if (isAddMode) {
      setIsWriting(false); // Cancel writing mode and go back to reading
      setIsAddMode(false); // Reset Add to Cancel
    } else {
      setIsWriting(true); // Enable writing mode and show the form
      setIsAddMode(true);
      setSelectedEntry(null); // Clear the selected entry when adding a new one
    }
  };

  const handleAnalyzeEntry = async () => {
    if (!selectedEntry) return;

    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/analyze_mood",
        { entry_text: selectedEntry.entryText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnalysis(response.data.mood_analysis);
    } catch (error) {
      console.error("Error analyzing entry:", error.message);
      setAnalysis("Error: Unable to analyze the entry.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="journal-page">
      <div className="journal-container">
        {/* Left Pane: Journal Entries */}
        <div className="left-pane">
          {isAddMode ? (
            <button className="add-button" onClick={handleAddClick}>
              Cancel
            </button>
          ) : (
            <button className="add-button" onClick={handleAddClick}>
              + Add
            </button>
          )}

          {/* Display list of journal entries */}
          <div className="entry-list">
            {journalEntries.map((entry) => (
              <h3
                key={entry._id}
                className={selectedEntry && selectedEntry._id === entry._id ? "selected" : ""}
                onClick={() => handleEntryClick(entry)}
              >
                {entry.heading}
                <br />
                <span style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#666' }}>
                  {formatDate(entry.createdAt)}
                </span>
              </h3>
            ))}
          </div>
        </div>

        {/* Right Pane: Display selected entry or the writing form */}
        <div className="right-pane">
          {/* Show the form if in writing mode */}
          {isWriting ? (
            <div className="writing-pane visible">
              <h2>Add Journal Entry</h2>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Journal Heading"
                required
              />
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="What's on your mind?"
                required
              />
              <button type="submit" onClick={handleSubmit}>
                Post
              </button>
            </div>
          ) : selectedEntry ? (
            <>
              <div className="entry-header">
                <h2>{selectedEntry.heading}</h2>
                <span style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#666' }}>
                  {formatDate(selectedEntry.createdAt)}
                </span>
                <button className="analyze-button" onClick={handleAnalyzeEntry}>
                  {isAnalyzing ? (
                    <>
                      Analyzing... <div className="spinner"></div>
                    </>
                  ) : (
                    "Analyze Entry"
                  )}
                </button>
              </div>
              <p>{selectedEntry.entryText}</p>
              {analysis && (
                <div className="analysis-response">
                  <strong>Therapist's Words:</strong>
                  <p>{analysis}</p>
                </div>
              )}
            </>
          ) : (
            <div className="no-entry">No Entry Selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
