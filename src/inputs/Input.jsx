import React from "react";

export function Input(props) {
  return (
    <div>
      <input
        onChange={props.handleChange}
        type={props.type}
        value={props.value}
        name={props.name}
        min={props.min}
        max={props.max}
      ></input>
    </div>
  );
}
