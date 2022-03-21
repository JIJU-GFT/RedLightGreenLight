import React from "react";
import PropTypes from "prop-types";

const ScoreboardEntry = ({scoreEntry}) => {
    return (<div className="Score-entry">
        <p>{scoreEntry.username}</p><p>{scoreEntry.highScore}</p>
    </div>);
};

ScoreboardEntry.propTypes = {
    scoreEntry: PropTypes.object.isRequired
};

export default ScoreboardEntry;