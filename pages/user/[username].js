import React from "react";
import Card from "react-bootstrap/Card";
import { FaUser } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";
import { IoSchoolOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { BsGlobe } from "react-icons/bs";

function username({ user }) {
  return (
    <div>
      {user ? (
        <Card className="user-card" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{`${user.firstname} ${user.lastname}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <FaUser className="user-icon" />
              {user.username}
            </Card.Subtitle>
            <img className="userpfp" src={user.pfpurl}/>
            <ReactCountryFlag
              countryCode="US" // replace with user.country
              svg
              style={{
                width: "2em",
                height: "2em",
              }}
              title="US"
            />
            <div className="user-school">
              <IoSchoolOutline />
              <p className="school">UC Berkeley</p>
            </div>
            <Card.Text>
              <div className="user-email">
                <GoMail />
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
              <div className="user-website">
                <BsGlobe />
                <a href={user.website} rel="noreferrer" target="_blank">
                  {user.website}
                </a>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
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
