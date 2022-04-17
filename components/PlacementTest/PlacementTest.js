import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import MemoryTilesPlacement from "./MemoryTilesPlacement";
import SlidingPuzzlePlacement from "./SlidingPuzzlePlacement";
import Results from "./Results";

function PlacementTest(props) {
  const [show, setShow] = useState(true);
  const [scores, setScores] = useState({
    memorytiles: null,
    slidepuzzle: null,
  });
  const [placementGameIndex, setPlacementGameIndex] = useState(0);
  const games = [
    <MemoryTilesPlacement
      user={props.user}
      updateScores={updateScores}
      onComplete={swapGame}
    />,
    <SlidingPuzzlePlacement
      user={props.user}
      updateScores={updateScores}
      onComplete={swapGame}
    />,
    <Results scores={scores} onComplete={swapGame} />,
    "done",
  ];

  function updateScores(game, score) {
    setScores({ ...score, [game]: score });
  }

  function swapGame() {
    if (placementGameIndex + 1 > games.length) return;
    if (games[placementGameIndex + 1] == "done") {
      fetch("/api/stats/placements/complete", {
        method: "POST",
        body: JSON.stringify({
          username: props.user.username,
        }),
      });
      props.onComplete();
    } else {
      setPlacementGameIndex(placementGameIndex + 1);
    }
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        dialogClassName="modalplacementtest"
      >
        <Modal.Header>
          <Modal.Title>Placement Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="placementgame">{games[placementGameIndex]}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlacementTest;