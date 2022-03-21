import React from 'react';
import PropTypes from 'prop-types';

const ScoreboardEntry = ({ scoreEntry }) => {
  return (
      <div className="Score-entry">
        <span className="user">{scoreEntry.username}</span>
        <span className="score">{scoreEntry.highScore} pts.</span>
      </div>
  );
};

ScoreboardEntry.propTypes = {
  scoreEntry: PropTypes.object.isRequired,
};

export default ScoreboardEntry;
