import React from 'react';
import Journal from '../components/Journal';
import StarryNightBG from '../components/StarryNightBG';
import './JournalPage.css';

const JournalPage = ({ token }) => {
  return (
    <div className="journal-page">
      <StarryNightBG id="particles-background" />
      <div className="content-wrapper">
        <div className="journal-text-container">
          <p className="journal-text">Feeling Stressed? Try adding some stars to the background :)</p>
        </div>
        <Journal token={token} />
      </div>
    </div>
  );
};

export default JournalPage;
