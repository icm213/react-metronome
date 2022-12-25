import React from "react";

export function Input(props) {
  return (
    <div>
      <input
        onChange={props.setBeatsPerMinute}
        type="range"
        value={props.tempo}
        name="tempo"
        min="30"
        max="330"
      ></input>
    </div>
  );
}
