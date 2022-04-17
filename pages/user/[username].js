import React from "react";

function username({ user }) {
  return (
    <div>
      {user ? (
        <div>
          <p>user firstname: {user.firstname}</p>
          <p>user lastname: {user.lastname}</p>
          <p>user username: {user.username}</p>
          <p>user email: {user.email}</p>
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
  const data = await fetch(`http://localhost:3000/api/user/${username}`).then(
    async (response) => {
      let datajson = await response.json();
      return datajson;
    }
  );
  return {
    props: {
      user: data.user,
    },
  };
}
