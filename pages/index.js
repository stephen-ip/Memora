import React, { useEffect } from "react";
import Link from "next/link";
import { Fragment } from "react";

export default function Home({ user }) {

  return (
    <Fragment>
      <div className="home">
        <div className="home__header">
          <img className="home__header-logo" src="/Memora.png" alt="logo" />
          <nav className="home__header-menu">
            {user == null ? (
              <div className="authheader">
                <Link href={"*"}>
                  <button className="home__header-menu-button2">RESOURCES</button>
                </Link>
                <Link href={"/games"}>
                  <button className="home__header-menu-button2">GAMES</button>
                </Link>
                <Link href={"/leaderboards"}>
                  <button className="home__header-menu-button2">LEADERBOARDS</button>
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
                  <Link href={"/games"}>
                    <button className="home__header-menu-button2">GAMES</button>
                  </Link>
                  <Link href={"/leaderboards"}>
                    <button className="home__header-menu-button2">LEADERBOARDS</button>
                  </Link>
                  <Link href={"/dashboard"}>
                    <button className="home__header-menu-button2">PROFILE</button>
                  </Link>
                </div>
              )}
          </nav>
        </div>
        <div className="home__paragraph">
          <h1>Train Your Brain</h1>
          <h4>Improve your memory and get a risk assessment for Alzheimers</h4>
        </div>
        <div className="home__brain">
          <img src="/splitbrain.png" alt="brain" />
        </div>
        <button className="home__getstarted">Try it out</button>
      </div>
      <div className="home__info">
          <div className="home__info-mask">
            <div className="home__info-mask-text">
              <h1>Alzheimers is a progressive disease associated with memory loss and other
                cognitive abilities that can heavily impact the daily lives of victims.  
              </h1>
              <h1>It most frequently affects those above 65 and has no cure.  On average, victims
                only have 4-8 years of life after diagnosis.
              </h1>
            </div>
          </div>
      </div>
      <div className="home__types">
            <div className="home__types-header">
              Types of Alzheimers
            </div>
            <div className="home__types-info">
              <div className="home__types-info-text">
                <h1>Early Onset
                </h1>
                <h3>
                  This is the rarer of the two types and generally affects 
                  those between 30 and 60 who are genetically predisposed. Many
                  genetic variants are still undiscovered.
                </h3>
              </div>
              <div className="home__types-info-text">
                <h1>Late Onset
                </h1>
                <h3>
                  This is the more common type and generally affects 
                  those 60 and up who are genetically predisposed. There
                  is also a genetic risk factor known as APOE.
                </h3>
              </div>
            </div>
      </div>
      <div className="home__resources">
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch("https://memora-pi.vercel.app/api/auth/loggedin", {
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
