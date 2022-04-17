import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function numbermemo({ user }) {
  const router = useRouter();
  
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currHighScore, setCurrHighScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [levelIncrement, setLevelIncrement] = useState(1);

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
    return Math.floor(Math.pow(10, n-1) + Math.random() * 9*Math.pow(10, n-1));
  } 
  

  gameState.registerListener(async function () {
    await startGame();
  });

  async function startGame() {
    setLevelIncrement(levelIncrement + 1);
    setNumber(generateNumber(levelIncrement))
    setGameStarted(true);
    setIsDisplaying(true);
    await waitAnimation(1000 + levelIncrement*1000);
    setIsDisplaying(false);
  }

  const waitAnimation = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, time);
    });
  };


  return (
    <div className="numbermemo">
      {isDisplaying ? <h1 className="numbermemo__num">{number}</h1> :
        <input className="numbermemo__field" type="text"/>
      }
        <h1>Score: {score}</h1>
      <button className="startButton" onClick={() => startGame()}>
        Start Game
      </button>
    </div>
  );
}

export default numbermemo;

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
        destination: '/login',
        permanent: false,
      },
    }
  }
}