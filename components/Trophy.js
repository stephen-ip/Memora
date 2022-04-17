import React from "react";

const Trophy = (props) => {
  return (
    <div className="trophy">
      <div className="trophy__cup" style={{ backgroundColor: props.color }}>
        <img className="trophy__cup-image" src="/default.jpg" alt="user" />
      </div>
      <div
        className="trophy__stem"
        style={{ backgroundColor: props.color }}
      ></div>
      <div className="trophy__base" style={{ backgroundColor: props.color }}>
        {props.rank}
      </div>
    </div>
  );
};

export default Trophy;
