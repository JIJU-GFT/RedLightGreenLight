import React from 'react';
import PropTypes from 'prop-types';

const ScoreboardEntry = ({ scoreEntry }) => {
  return (
      <div className="score-entry-row">
        <span className="user-entry">{scoreEntry.username}</span>
        <span className="score-entry">{scoreEntry.highScore} pts.</span>
      </div>
  );
};

ScoreboardEntry.propTypes = {
  scoreEntry: PropTypes.object.isRequired,
};

export default ScoreboardEntry;
