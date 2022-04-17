import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function NumberMemoPlacement(props) {
  const router = useRouter();

  const [isDisplaying, setIsDisplaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [levelIncrement, setLevelIncrement] = useState(0);

  useEffect(() => {
    checkLoggedIn();
    // getScores();
  });

  const checkLoggedIn = async () => {
    await fetch("/api/auth/loggedin")
      .then((response) => response.json())
      .then((json) => {
        if (!json.user) {
          router.push("/login");
        }
      });
  };

  const gameState = {
    levelInternal: 3,
    levelListener: function (val) {},
    set level(val) {
      this.levelInternal = val;
      this.levelListener(val);
    },
    get level() {
      return this.levelInternal;
    },
    registerListener: function (listener) {
      this.levelListener = listener;
    },
  };

  const generateNumber = (n) => {
    return Math.floor(
      Math.pow(10, n - 1) + Math.random() * 9 * Math.pow(10, n - 1)
    );
  };

  gameState.registerListener(async function () {
    await startGame();
  });

  async function startGame() {
    setLevelIncrement(levelIncrement + 1);
    setNumber(generateNumber(levelIncrement + 1));
    setGameStarted(true);
    setIsDisplaying(true);
    await waitAnimation(1000 + levelIncrement * 1000);
    setIsDisplaying(false);
  }

  const waitAnimation = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, time);
    });
  };

  const onChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = (e) => {
    if (userInput === String(number)) {
      setScore(score + 1);
      setIsDisplaying(true);
      startGame();
    } else {
      alert(`Your score was ${score}`);
      setGameStarted(false);
      fetch("/api/stats/placements/add", {
        method: "PATCH",
        body: JSON.stringify({
          user: props.user.username,
          game: "numbermemo",
          score: score,
        }),
      });
      fetch("/api/stats/matchhistory/add", {
        method: "POST",
        body: JSON.stringify({
          user: props.user.username,
          game: "numbermemo",
          score: score,
        }),
      });
      props.updateScores("numbermemo", score);
      props.onComplete();
      setScore(0);
      setLevelIncrement(0);
    }
  };

  const handleClickStart = (e) => {
    if (gameStarted) {
      return;
    } else {
      startGame();
    }
  };

  return (
    <div className="numbermemo">
      <h1 className="numbermemo__score">{score}</h1>
      {gameStarted ? (
        <div className="numbermemo__game">
          {isDisplaying ? (
            <h1 className="numbermemo__game-num">{number}</h1>
          ) : (
            <div className="numbermemo__game-field">
              <input onChange={onChangeInput} type="text" />
              <button
                onClick={handleClick}
                className="numbermemo__game-field-btn"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <h1 className="numbermemo__header">Remember the Number!</h1>
      )}

      {!gameStarted ? (
        <button className="startButton" onClick={handleClickStart}>
          Start Game
        </button>
      ) : null}
    </div>
  );
}

export default NumberMemoPlacement;
