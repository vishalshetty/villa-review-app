import React from "react";

const Button = props => {

  return (
    <button
      style={props.style}
      className={
        props.cls == "primary" ? "btn btn-primary" : "btn btn-secondary"
      }
      type = {props.type}
      onClick={props.action}
    >
      {props.title}
    </button>
  );
};

export default Button;
