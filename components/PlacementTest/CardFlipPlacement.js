import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function CardFlipPlacement(props) {
  const router = useRouter();

  //   const [gameStarted, setGameStarted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [flip, setFlip] = useState(null);
  const [numLeft, setNumLeft] = useState(6);
  const [COLORS, setCOLORS] = useState(
    [
      "#301466",
      "#301466",
      "#5C3D99",
      "#5C3D99",
      "#38A3A5",
      "#38A3A5",
      "#57CC99",
      "#57CC99",
      "#80ED99",
      "#80ED99",
      "#FFFF00",
      "#FFFF00",
    ].sort(() => 0.5 - Math.random())
  );

  useEffect(() => {
    if (numLeft == 0) {
      alert("You win!");
      fetch("/api/stats/placements/add", {
        method: "PATCH",
        body: JSON.stringify({
          user: props.user.username,
          game: "cardflip",
          score: moves,
        }),
      });
      fetch("/api/stats/matchhistory/add", {
        method: "POST",
        body: JSON.stringify({
          user: props.user.username,
          game: "cardflip",
          score: moves,
        }),
      });
      props.updateScores("cardflip", moves);
      props.onComplete();
    }
  }, [numLeft]);

  async function startGame() {
    setGameStarted(true);
  }

  const waitAnimation = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, time);
    });
  };

  const handleClickTile = (e) => {
    console.log(
      flip,
      e.target.parentNode.childNodes.item(1).style.backgroundColor
    );
    e.target.parentNode.style.transform = "rotateY(180deg)";
    e.target.parentNode.style.transition = "transform 0.5s";
    if (!flip) {
      setFlip(e.target.parentNode.childNodes.item(1));
    } else if (
      flip &&
      e.target.parentNode.childNodes.item(1).style.backgroundColor !=
        flip.style.backgroundColor
    ) {
      setMoves(moves + 1);
      e.target.parentNode.style.transform = "rotateY(0deg)";
      flip.parentNode.style.transform = "rotateY(0deg)";
      setFlip(null);
    } else if (
      flip &&
      e.target.parentNode.childNodes.item(1).style.backgroundColor ==
        flip.style.backgroundColor
    ) {
      setNumLeft(numLeft - 1);
      flip.style.backgroundColor = "#FFFFFF";
      e.target.parentNode.childNodes.item(1).style.backgroundColor = "#FFFFFF";
      let cols = COLORS;
      cols[flip.parentNode.parentNode.key] = "#FFFFFF";
      cols[e.target.parentNode.parentNode.key] = "#FFFFFF";
      setCOLORS(cols);
      setFlip(null);
    }
  };

  return (
    <div className="cardflip">
      <div className="cardflip__instructions">
        <h2>Instructions</h2>
        <p>
          This is a variation of the classic card flip memory game designed to
          test episodic memory where only one card is revealed at once and each
          second flip that does not match will increase your move count by 1.
          The goal is to match all tiles with the fewest move count.
        </p>
      </div>
      <div className="cardflip__board">
        {COLORS.map((color, i) => {
          return (
            <div
              key={i}
              onClick={handleClickTile}
              className="cardflip__board-tile"
            >
              <div className="cardflip__board-tile-content">
                <div className="cardflip__board-tile-content-front"></div>
                <div
                  style={{ backgroundColor: color }}
                  className="cardflip__board-tile-content-back"
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cardflip__moves">
        <h2>Moves</h2>
        <h4>{moves}</h4>
      </div>
    </div>
  );
}

export default CardFlipPlacement;
