import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Gamecard from "../../components/Gamecard";

function games({ user }) {
  const router = useRouter();
  return (
    <div className="games">
      <h1 className="games__header">Games</h1>
      <div className="gamemenu">
        <Gamecard
          image="/memtiles.png"
          name="Memory Tiles"
          dest="/games/memorytiles"
        />

        <Gamecard
          image="/slidepuzzle.png"
          name="Sliding Puzzle"
          dest="/games/slidingpuzzle"
        />

        <Gamecard
          image="/numbermemo.png"
          name="Memorize Numbers"
          dest="/games/numbermemo"
        />

        <Gamecard
          image="/cardflip.png"
          name="Card Flip"
          dest="/games/cardflip"
        />

        {/* <Link href={"/games/wordle"}>
        <button>Wordle</button>
      </Link> */}
        <div>
          {!user ? <p>you must be signed in to play these games</p> : null}
        </div>
      </div>
    </div>
  );
}

export default games;

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/auth/loggedin", {
    headers: {
      Cookie: `token=${context.req.cookies.token}`,
    },
  }).then(async (response) => {
    let datajson = await response.json();
    return datajson;
  });
  return {
    props: {
      user: data.user ? data.user : null,
    },
  };
}
