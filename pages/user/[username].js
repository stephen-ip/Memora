import React from "react";

function username({ user, bestscores }) {
  return (
    <div>
      {user ? (
        <div>
          <img className="userpfp" src={user.pfpurl}/>
          <p>user firstname: {user.firstname}</p>
          <p>user lastname: {user.lastname}</p>
          <p>user username: {user.username}</p>
          <p>user email: {user.email}</p>
          <p>best scores: {JSON.stringify(bestscores)}</p>
        </div>
      ) : (
        "no user with this username"
      )}
    </div>
  );
}

export default username;

export async function getServerSideProps(context) {
  const { username } = context.query;
  const data = await fetch(`memora-stephen-ip.vercel.app/api/user/${username}`).then(
    async (response) => {
      let datajson = await response.json();
      return datajson;
    }
  );
  const games = ["memorytiles", "numbermemo", "cardflip", "slidepuzzle"];
  const bestScores = {
    memorytiles: null,
    numbermemo: null,
    cardflip: null,
    slidepuzzle: null,
  };
  if (data.user) {
    for (var i = 0; i < games.length; i++) {
      const game = games[i];
      await fetch(`memora-stephen-ip.vercel.app/api/stats/scores/desc/${game}`, {
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
  }
  return {
    props: {
      user: data.user,
      bestscores: bestScores,
    },
  };
}
