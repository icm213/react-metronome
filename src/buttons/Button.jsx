import React from "react";

export function Button(props) {
  return <button onClick={props.handleClick}> {props.value}</button>;
}
