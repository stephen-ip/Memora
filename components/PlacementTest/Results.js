import React from "react";

function Results(props) {
  return (
    <div className="placement-results-container">
      <p className="placement-results">memory tiles score: {props.scores.memorytiles}</p>
      <p className="placement-results">number memo score: {props.scores.numbermemo}</p>
      <p className="placement-results">card flip score: {props.scores.cardflip}</p>
      <p className="placement-results">slide puzzle score: {props.scores.slidepuzzle}</p>
      <button onClick={() => props.onComplete()}>done</button>
    </div>
  );
}

export default Results;
