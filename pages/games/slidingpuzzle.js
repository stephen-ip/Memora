import React from "react";
import Board from "../../components/puzzle/Board.js";
import { useRouter } from "next/router";

function slidingpuzzle({ user }) {
  const router = useRouter();
  return (
    <div className="slidingpuzzle">
      <Board currUser={user} />
    </div>
  );
}

export default slidingpuzzle;

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
        destination: '/login',
        permanent: false,
      },
    }
  }
}