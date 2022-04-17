import React, { useState, useEffect } from "react";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import LBRow from "../components/lbrow";
import Trophy from "../components/Trophy";

function leaderboards() {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState("overall");
  const categories = ["overall", "memorytiles", "slidingpuzzle"];

  // redo this one to use another backend route
  const getScoresOverall = async () => {
    await fetch("/api/stats/scores/overallscore", {
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
        console.log(json);
        const newUsers = [];
        for (let i in json) {
          newUsers.push(json[i]);
        }
        console.log(newUsers);
        // newUsers.sort((a, b) => {
        //   if (aggregateScore(a) > aggregateScore(b)) {
        //     return -1;
        //   }
        //   if (aggregateScore(a) < aggregateScore(b)) {
        //     return 1;
        //   }
        //   return 0;
        // });
        setUsers(newUsers);
      });
  };

  const getScoresMemoryTiles = async () => {
    await fetch(`/api/stats/scores/desc/${"memorytiles"}`, {
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
        console.log(json);
        const newUsers = [];
        for (let i in json) {
          newUsers.push(json[i]);
        }
        console.log(newUsers);
        setUsers(newUsers);
      });
  };

  const getScoresSlidingPuzzle = async () => {
    await fetch(`/api/stats/scores/asc/${"slidepuzzle"}`, {
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
        console.log(json);
        const newUsers = [];
        for (let i in json) {
          newUsers.push(json[i]);
        }
        console.log(newUsers);
        for (let i in newUsers) {
          newUsers[i].score = -newUsers[i].score * 1000;
        }
        setUsers(newUsers);
      });
  };

  const getFormattedTime = (rawtime) => {
    const mins = ("0" + Math.floor((rawtime / 60000) % 60)).slice(-2);
    const secs = ("0" + Math.floor((rawtime / 1000) % 60)).slice(-2);
    const milisecs = ("0" + ((rawtime / 10) % 100)).slice(-2);
    return `${mins}:${secs}:${milisecs}`;
  };

  const getPfpOfUser = (username) => {
    fetch(`/api/user/${username}`, {
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
        console.log(json);
        return json.user.pfpurl;
      });
  };

  useEffect(() => {
    if (category == "overall") {
      getScoresOverall();
    } else if (category == "memorytiles") {
      getScoresMemoryTiles();
    } else if (category == "slidingpuzzle") {
      getScoresSlidingPuzzle();
    }
  }, [category]);

  return (
    <div className="leaderboards">
      <div className="usernav">
        <Link href={"/games"}>
          <button className="home__header-menu-button2">GAMES</button>
        </Link>
        <Link href={"/dashboard"}>
          <button className="home__header-menu-button2">PROFILE</button>
        </Link>
      </div>
      <DropdownButton
        className="dropdownbtn"
        id="dropdown-basic-button"
        title={category}
      >
        {categories
          .filter((catgry) => {
            if (catgry != category) {
              return catgry;
            }
          })
          .map((catgry, i) => (
            <Dropdown.Item
              key={i}
              as="button"
              onClick={() => {
                setCategory(catgry);
              }}
            >
              {catgry}
            </Dropdown.Item>
          ))}
      </DropdownButton>
      <div className="trophycase">
        <div className="trophycase__winner">
          <Trophy color="gold" rank={1} />
        </div>
        <div className="trophycase__losers">
          <Trophy color="silver" rank={2} />
          <Trophy color="#CD7F32" rank={3} />
        </div>
      </div>
      {users.map((user, i) => (
        <LBRow
          key={i}
          user={user}
          pfp={getPfpOfUser(user.username)}
          rank={i}
          score={user.score}
        />
      ))}
    </div>
  );
}

export default leaderboards;
