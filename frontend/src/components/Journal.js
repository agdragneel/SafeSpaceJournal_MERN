import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import

const Journal = ({ token }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [heading, setHeading] = useState("");

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5001/api/journal/entries",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJournalEntries(data.entries);
    } catch (error) {
      console.error("Error fetching journal entries:", error.message);
    }
  };

  // Fetch entries on component mount or when token changes
  useEffect(() => {
    fetchEntries();
  });

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
    } catch (error) {
      console.error("Error adding journal entry:", error.message);
    }
  };

  return (
    <div>
      <h2>Journal Entries</h2>

      {/* Form for adding new journal entries */}
      <form onSubmit={handleSubmit}>
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
          placeholder="Write your journal entry..."
          required
        />
        <button type="submit">Add Entry</button>
      </form>

      {/* Display existing journal entries */}
      <div>
        {journalEntries.map((entry) => (
          <div key={entry._id}>
            <h3>{entry.heading}</h3>
            <p>{entry.entryText}</p>
            <small>{new Date(entry.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;
