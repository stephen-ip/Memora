import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Link from "next/link";

function dashboard({ user, matchhistory }) {
  const router = useRouter();

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

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Link href={"/"}>
          <Button className="home__header-menu-button2">Home</Button>
        </Link>
        <Link href={"/games"}>
          <Button className="home__header-menu-button2">Games</Button>
        </Link>
        <Button className="home__header-menu-button" onClick={() => logOut()}>
          Log Out
        </Button>
      </div>
      <p>
        Welcome {user.firstname} {user.lastname}!
      </p>
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