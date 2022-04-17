import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LineChart from "../components/Charts/LineChart";
import GroupedBarChart from "../components/Charts/GroupedBarChart";

function dashboard({ user, matchhistory }) {
  const router = useRouter();
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
    fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formdata,
    })
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

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Link href={"/"}>
          <button className="home__header-menu-button2">Home</button>
        </Link>
        <Link href={"/games"}>
          <button className="home__header-menu-button2">Games</button>
        </Link>
        <button className="home__header-menu-button" onClick={() => logOut()}>
          Log Out
        </button>
      </div>
      <p className="welcome-message">
        Welcome {user.firstname} {user.lastname}! AKA {user.username}
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

      <div className="dashboard__charts">
        <select
          onChange={(e) => setGame(e.target.value)}
          className="dashboard__dropdown"
          name="games"
          id="games"
        >
          <option value="memorytiles">Memory Tiles</option>
          <option value="slidepuzzle">Sliding Puzzle</option>
        </select>
        <div className="dashboard__charts-box">
          <LineChart
            className="chart"
            game={game}
            matchhistory={matchhistory}
          />
          <GroupedBarChart
            className="chart"
            game={game}
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
      `http://localhost:3000/api/stats/matchhistory/${data.user.username}`
    ).then(async (response) => {
      let responsejson = await response.json();
      return responsejson;
    });
    return {
      props: {
        user: data.user,
        matchhistory: matchhistory,
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