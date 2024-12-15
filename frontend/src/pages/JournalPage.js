import React from 'react';
import Journal from '../components/Journal';

const JournalPage = ({ token, onLogout }) => {
  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <Journal token={token} />
    </div>
  );
};

export default JournalPage;
