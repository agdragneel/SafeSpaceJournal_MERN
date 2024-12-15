import React from 'react';
import Journal from '../components/Journal';

const JournalPage = ({ token }) => {
  return (
    <div>
      
      <Journal token={token} />
    </div>
  );
};

export default JournalPage;
