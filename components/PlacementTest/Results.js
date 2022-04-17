import React from "react";

function Results(props) {
  return (
    <div>
      <p>memory tiles score: {props.scores.memorytiles}</p>
      <p>number memo score: {props.scores.numbermemo}</p>
      <p>slide puzzle score: {props.scores.slidepuzzle}</p>
      <button onClick={() => props.onComplete()}>done</button>
    </div>
  );
}

export default Results;
