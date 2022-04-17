import React, { useState, useEffect } from "react";
import Tile from "../puzzle/Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "../puzzle/constants";
import { canSwap, shuffle, swap, isSolved } from "../puzzle/helpers";

function SlidingPuzzlePlacement(props) {
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [score, setScore] = useState();

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles);
    setTiles(shuffledTiles);
  };

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(
        tiles,
        tileIndex,
        tiles.indexOf(tiles.length - 1)
      );
      setTiles(swappedTiles);
    }
  };

  const handleTileClick = (index) => {
    swapTiles(index);
  };

  const handleShuffleClick = () => {
    shuffleTiles();
    setTime(0);
    setTimerOn(true);
  };

  const handleStartClick = () => {
    shuffleTiles();
    setIsStarted(true);
    setTimerOn(true);
  };

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  const hasWon = isSolved(tiles);
  useEffect(() => {
    if (hasWon == true) {
      setTimerOn(false);
      if (isStarted) {
        console.log(-time / 10000.0);
        fetch("/api/stats/placements/add", {
          method: "PATCH",
          body: JSON.stringify({
            user: props.user.username,
            game: "slidepuzzle",
            score: score,
          }),
        });
        fetch("/api/stats/matchhistory/add", {
          method: "POST",
          body: JSON.stringify({
            user: props.user.username,
            game: "slidepuzzle",
            score: score,
          }),
        });
        props.updateScores("slidepuzzle", score);
        props.onComplete();
      }
    }
  }, [hasWon]);

  return (
    <>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={props.imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      {!isStarted ? (
        <button onClick={() => handleStartClick()}>Start game</button>
      ) : (
        <button onClick={() => handleShuffleClick()}>Restart game</button>
      )}
      <div className="Timers">
        <div id="display">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
      </div>
      <button onClick={() => props.onComplete()}>done</button>
    </>
  );
}

export default SlidingPuzzlePlacement;
