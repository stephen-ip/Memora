import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PlacementTest from "../components/PlacementTest/PlacementTest";
import LineChart from "../components/Charts/LineChart";
import GroupedBarChart from "../components/Charts/GroupedBarChart";
import DoughnutChart from "../components/Charts/DoughnutChart";

function dashboard({ user, matchhistory, bestscores }) {
  const router = useRouter();
  const [placementTest, setPlacementTest] = useState(user.placementtest);
  const [profilePicture, setProfilePicture] = useState(user.pfpurl);
  const [pfpFile, setPfpFile] = useState(null);
  const [game, setGame] = useState("memorytiles");

  async function logOut() {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          console.log("logged out");
          router.push("/");
        } else {
          console.log(json);
        }
      });
  }

  const handlePfp = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file == null) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
      setPfpFile(file);
    };
    reader.readAsDataURL(file);
  };

  function uploadPfp() {
    if (pfpFile == null) return;
    let formdata = new FormData();
    formdata.append("file", pfpFile);
    formdata.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET);
    setPfpFile(null);
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formdata,
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        const pfpurl = data.secure_url;
        fetch("/api/user/uploadpfp", {
          method: "POST",
          body: JSON.stringify({
            username: user.username,
            url: pfpurl,
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          });
      })
      .catch((err) => console.log(err));
  }

  const getFormattedTime = (rawtime) => {
    const mins = ("0" + Math.floor((rawtime / 60000) % 60)).slice(-2);
    const secs = ("0" + Math.floor((rawtime / 1000) % 60)).slice(-2);
    const milisecs = ("0" + ((rawtime / 10) % 100)).slice(-2);
    return (mins == 0 && secs == 0 && milisecs == 0) ? null : `${mins}:${secs}:${milisecs}`;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Link href={"/"}>
          <button className="home__header-menu-button2">Home</button>
        </Link>
        <Link href={"/games"}>
          <button className="home__header-menu-button2">Games</button>
        </Link>
        <Link href={"/leaderboards"}>
          <button className="home__header-menu-button2">Leaderboards</button>
        </Link>
        <button className="home__header-menu-button" onClick={() => logOut()}>
          Log Out
        </button>
      </div>
      {!placementTest ? (
        <div>
          <PlacementTest
            user={user}
            onComplete={() => {
              setPlacementTest(true);
              router.reload(window.location.pathname); // may reload before user.placementtest is updated solved with async?
            }}
          />
        </div>
      ) : null}
      <p className="welcome-message">
        Welcome {user.firstname} {user.lastname} AKA {user.username}!
      </p>
      <div className="profile-picture-changer">
        <label htmlFor="photo-upload" className="custom-file-upload fas">
          <div className="img-wrap img-upload">
            <img htmlFor="photo-upload" src={profilePicture} />
          </div>
          <input id="photo-upload" type="file" onChange={handlePfp} />
        </label>
        {pfpFile ? (
          <button onClick={() => uploadPfp()}>Upload profile picture</button>
        ) : null}
      </div>

      <p className="best-scores">
        best memorytiles score: {bestscores["memorytiles"]}
      </p>
      <p className="best-scores">
        best numbermemo score: {bestscores["numbermemo"]}
      </p>
      <p className="best-scores">
        best cardflip score: {bestscores["cardflip"]}
      </p>
      <p className="best-scores">
        best slidingpuzzle score: {getFormattedTime(bestscores["slidepuzzle"])}
      </p>

      <div className="dashboard__charts">
        <div className="DoughnutChart-container">
          <DoughnutChart
            className="chart"
            username={user.username}
            matchhistory={matchhistory}
          />
        </div>
        <select
          onChange={(e) => setGame(e.target.value)}
          className="dashboard__dropdown"
          name="games"
          id="games"
        >
          <option value="memorytiles">Memory Tiles</option>
          <option value="numbermemo">Number Memo</option>
          <option value="cardflip">Card Flip</option>
          <option value="slidepuzzle">Sliding Puzzle</option>
        </select>
        <div className="dashboard__charts-box">
          <LineChart
            className="chart"
            username={user.username}
            game={game}
            matchhistory={matchhistory}
          />
          <GroupedBarChart
            className="chart"
            username={user.username}
            game={game}
            matchhistory={matchhistory}
            title="Player vs Average"
          />
        </div>
      </div>
    </div>
  );
}

export default dashboard;

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
    const matchhistory = await fetch(
      `http://localhost:3000/api/stats/matchhistory/`
    ).then(async (response) => {
      let responsejson = await response.json();
      return responsejson;
    });
    const games = ["memorytiles", "numbermemo", "cardflip", "slidepuzzle"];
    const bestScores = {
      memorytiles: null,
      numbermemo: null,
      cardflip: null,
      slidepuzzle: null,
    };
    for (var i = 0; i < games.length; i++) {
      const game = games[i];
      // best score high score
      await fetch(`http://localhost:3000/api/stats/scores/desc/${game}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          for (var i = 0; i < json.length; i++) {
            const record = json[i];
            if (record.username == data.user.username) {
              if (game != "slidepuzzle" && game != "cardflip") {
                bestScores[game] = json[i].score;
                break;
              } else {
                bestScores[game] = json[i].score;
              }
            }
          }
        });
    }
    return {
      props: {
        user: data.user,
        matchhistory: matchhistory,
        bestscores: bestScores,
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
