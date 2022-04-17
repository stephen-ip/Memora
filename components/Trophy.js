import React, { useEffect, useState } from "react";

const LBRow = (props) => {
  const medals = ["gold", "silver", "#CD7F32"];
  const [pfp, setPfp] = useState();

  useEffect(() => {
    fetch(`/api/user/${props.user.username}`, {
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
        console.log(json.user.pfpurl);
        setPfp(json.user.pfpurl);
      });
  }, []);

  return (
    <div className="lbrow">
      <div
        className="lbrow__number"
        style={
          props.rank + 1 < 4
            ? { backgroundColor: medals[props.rank] }
            : { backgroundColor: "white" }
        }
      >
        {props.rank + 1}
      </div>
      <div
        className="lbrow__stats"
        style={
          props.rank + 1 < 4
            ? { backgroundColor: medals[props.rank] }
            : { backgroundColor: "white" }
        }
      >
        <div className="flexcenterer">
          <div className="lbrow__stats-user">
            <img className="flag-img" src={pfp} alt="test" />
            <h1 className="lbrow__stats-user-username">
              {props.user.username}
            </h1>
          </div>
        </div>

        <h2 className="lbrow__stats-score">{props.score}</h2>
        <div className="flexcenterer">
          <img
            className="flag-img"
            src="https://flagicons.lipis.dev/flags/1x1/us.svg"
            alt="flag"
          />
        </div>
      </div>
    </div>
  );
};

export default LBRow;