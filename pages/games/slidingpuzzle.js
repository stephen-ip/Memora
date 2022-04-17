import React from "react";
import Board from "../../components/puzzle/Board.js";
import { useRouter } from "next/router";
import Link from "next/link";

function Slidingpuzzle({ user }) {
  const router = useRouter();
  return (
    <div className="slidingpuzzle">
      <div className="usernav">
        <Link href={"/games"}>
          <button className="home__header-menu-button2">GAMES</button>
        </Link>
        <Link href={"/dashboard"}>
          <button className="home__header-menu-button2">PROFILE</button>
        </Link>
      </div>
      <Board currUser={user} />
    </div>
  );
}

export default Slidingpuzzle;

export async function getServerSideProps(context) {
  const data = await fetch("https://memora-azt1wq38c-stephen-ip.vercel.app/api/auth/loggedin", {
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
