import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function memorytiles({ user }) {
  const router = useRouter();
  var bgColors = {
    Default: "#FFFFFF",
    Computer: "#37BC9B",
    Correct: "#8CC152",
    Wrong: "#E9573F",
  };

  const numToWord = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
  };

  const wordToNum = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const [tiles, setTiles] = useState({
    one: bgColors.Default,
    two: bgColors.Default,
    three: bgColors.Default,
    four: bgColors.Default,
    five: bgColors.Default,
    six: bgColors.Default,
    seven: bgColors.Default,
    eight: bgColors.Default,
    nine: bgColors.Default,
  });

  const [order, setOrder] = useState([]);

  const [index, setIndex] = useState([
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
    bgColors.Default,
  ]);

  const [isDisplaying, setIsDisplaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currHighScore, setCurrHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [levelIncrement, setLevelIncrement] = useState(1);

  useEffect(() => {
    checkLoggedIn();
    // getScores();

    const newIndex = [];
    for (var tile in tiles) {
      newIndex.push(tiles[tile]);
    }
    setIndex(newIndex);
  }, [tiles]);

  const checkLoggedIn = async () => {
    await fetch("/api/auth/loggedin")
      .then((response) => response.json())
      .then((json) => {
        if (!json.user) {
          router.push("/login");
        }
      });
  };

  // const getScores = async () => {
  //   await fetch(`/api/stats/scores/${user.username}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((json) => {
  //       if (json[0].memorytiles) {
  //         setCurrHighScore(json[0].memorytiles);
  //       } else {
  //         setCurrHighScore(0);
  //       }
  //     });
  // };

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

  gameState.registerListener(async function () {
    await startGame();
  });

  async function startGame() {
    setLevelIncrement(levelIncrement + 1);
    setGameStarted(true);
    await waitAnimation(250);
    setIsDisplaying(true);
    const currOrder = [];
    for (let i = 0; i < levelIncrement; i++) {
      const randomTile = Math.floor(Math.random() * 9 + 1);
      currOrder.push(numToWord[randomTile]);
    }
    console.log(currOrder);
    for (let i = 0; i < currOrder.length; i++) {
      let tile = currOrder[i];

      setTile(tile, bgColors.Computer);
      await waitAnimation(500);
      setTile(tile, bgColors.Default);
      await waitAnimation(200);
    }

    setOrder(currOrder);
    setIsDisplaying(false);
    clearBoard();
  }

  const waitAnimation = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, time);
    });
  };

  function setTile(tile, color) {
    setTiles({ ...tiles, [tile]: color });
  }

  function clearBoard() {
    setTiles({
      one: bgColors.Default,
      two: bgColors.Default,
      three: bgColors.Default,
      four: bgColors.Default,
      five: bgColors.Default,
      six: bgColors.Default,
      seven: bgColors.Default,
      eight: bgColors.Default,
      nine: bgColors.Default,
    });
  }

  const onClickBox = async (num) => {
    if (isDisplaying || !gameStarted) {
      return;
    }
    if (numToWord[num] !== order[0]) {
      setTile(numToWord[num], bgColors.Wrong);
      await waitAnimation(500);
      setTile(numToWord[num], bgColors.Default);
      setOrder([]);
      clearBoard();
      setGameStarted(false);
      setLevelIncrement(1);
      alert(`Your score was ${score}`);
      console.log("Current highest score is " + currHighScore);
      if (score > currHighScore) {
        fetch("/api/stats/matchhistory/add", {
          method: "POST",
          body: JSON.stringify({
            user: user.username,
            game: "memorytiles",
            score: score,
          }),
        });
      }
      setScore(0);
    } else if (numToWord[num] === order[0] && order.length === 1) {
      setTile(order[0], bgColors.Correct);
      setIsDisplaying(true);
      await waitAnimation(500);
      setIsDisplaying(false);
      setTile(order[0], bgColors.Default);
      clearBoard();
      gameState.level = gameState.level + 1;
      setScore(score + 1);
    } else {
      var temp = order[0];
      setTile(order[0], bgColors.Correct);
      setOrder(order.slice(1));
      setIsDisplaying(true);
      await waitAnimation(500);
      setIsDisplaying(false);
      setTile(temp, bgColors.Default);
    }
  };

  return (
    <div className="memorytiles">
      <div className="usernav">
        <Link href={"/games"}>
          <button className="home__header-menu-button2">GAMES</button>
        </Link>
        <Link href={"/dashboard"}>
          <button className="home__header-menu-button2">PROFILE</button>
        </Link>
      </div>
      <h1 className="memorytiles__score">Score: {score}</h1>
      <div className="container-tiles">
        {index.map((t, i) => (
          <div
            className="memoryTile"
            key={i}
            style={{ backgroundColor: t }}
            onClick={() => onClickBox(i + 1)}
          ></div>
        ))}
      </div>

      <button className="starButton" onClick={() => startGame()}>
        Start Game
      </button>
    </div>
  );
}

export default memorytiles;

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/auth/loggedin", {
    headers: {
      Cookie: `token=${context.req.cookies.token}`,
    },
  }).then(async (response) => {
    let datajson = await response.json();
    return datajson;
  });
  if (data.user) {
    return {
      props: {
        user: data.user,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
