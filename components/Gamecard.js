import React from "react";
import Link from "next/link";

const Gamecard = (props) => {
  console.log(props);
  return (
    <Link href={props.dest}>
      <div className="gamecard">
        <div className="gamecard__imagebox">
          <img className="gamecard__image" src={props.image} alt="game" />
        </div>
        <h2 className="gamecard__game">{props.name}</h2>
      </div>
    </Link>
  );
};

export default Gamecard;