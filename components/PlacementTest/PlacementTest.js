import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import MemoryTilesPlacement from "./MemoryTilesPlacement";
import SlidingPuzzlePlacement from "./SlidingPuzzlePlacement";
import NumberMemoPlacement from "./NumberMemoPlacement";
import CardFlipPlacement from "./CardFlipPlacement";
import Results from "./Results";

function PlacementTest(props) {
  const [show, setShow] = useState(true);
  const [scores, setScores] = useState({
    memorytiles: null,
    numbermemo: null,
    cardflip: null,
    slidepuzzle: null,
  });
  const [placementGameIndex, setPlacementGameIndex] = useState(0);

  function updateScores(game, score) {
    const temp = scores;
    scores[game] = score;
    setScores(temp);
  }

  async function swapGame() {
    if (placementGameIndex + 1 > games.length) return;
    if (games[placementGameIndex + 1] == "done") {
      await fetch("/api/stats/placements/complete", {
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

  const games = [
    <MemoryTilesPlacement
      user={props.user}
      updateScores={updateScores}
      onComplete={swapGame}
    />,
    <NumberMemoPlacement
      user={props.user}
      updateScores={updateScores}
      onComplete={swapGame}
    />,
    <CardFlipPlacement
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

  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        dialogClassName="modalplacementtest"
      >
        <Modal.Header className="modal-header">
          <Modal.Title>Placement Test</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="placementgame">{games[placementGameIndex]}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlacementTest;
