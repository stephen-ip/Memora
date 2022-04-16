import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home({ user }) {
  return (
    <div className="home">
      <div className="home__header">
        <nav className="home__header-menu">
          {/* <Link href={"/games"}>
            <button>Games</button>
          </Link>
          <Link href={"/leaderboards"}>
            <button>Leaderboards</button>
          </Link> */}
          {user == null ? (
            <div className="authheader">
              <Link href={"*"}>
                <button className="home__header-menu-button2">RESOURCES</button>
              </Link>
              <Link href={"/login"}>
                <button className="home__header-menu-button2">LOGIN</button>
              </Link>
              <Link href={"/signup"}>
                <button className="home__header-menu-button">REGISTER</button>
              </Link>
            </div>
          ) : (
            <div className="usernav">
              <Link href={"/dashboard"}>
                <button className="home__header-menu-button2">PROFILE</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <div className="home__brain">
        <img src="/splitbrain.png" alt="brain" />
      </div>
    </div>
  );
}

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