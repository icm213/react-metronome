import React from "react";
import { Input } from "../inputs/Input";
import { Button } from "../buttons/Button";
import { BeatContainer } from "./BeatContainer";
import "./Beat.scss";
import sound from "../sounds/ping-82822.wav";

export function Beat(props) {
  const [start, setStart] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [beatLength, setBeatLength] = React.useState(4);
  const [beatBtn, setBeatBtn] = React.useState(Array(beatLength).fill("btn"));
  const [count, setCount] = React.useState(0);

  function runMetronome() {
    setCount((prevC) => (prevC = 0));
    setStart((prevRun) => (prevRun = !prevRun));
    setDisplay((prevD) => (prevD = true));
  }

  function playSound() {
    new Audio(sound).play();
  }

  function pasteBeatBtns(event) {
    const { value } = event.target;
    setBeatLength((prev) => (prev = parseInt(value)));
  }

  React.useEffect(() => {
    setBeatBtn((prevBtns) => (prevBtns = Array(beatLength).fill("btn")));
  }, [beatLength]);

  React.useEffect(() => {
    if (start) {
      playSound();
      const interval = setInterval(() => {
        playSound();
        setCount((prevC) => {
          prevC = prevC + 1;
          if (prevC >= beatLength) {
            prevC = 0;
          }
          return prevC;
        });
        setDisplay((prevD) => !prevD);
      }, 60000 / props.tempo);
      return () => clearInterval(interval);
    }
  }, [start, beatLength, props.tempo]);

  React.useEffect(() => {
    if (display) {
      const interval = setInterval(() => {
        setDisplay((prevD) => !prevD);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [start, display, props.tempo]);

  const beatButtons = beatBtn.map((btn, idx) => (
    <div key={idx} className="beat">
      {start && display && idx === count && (
        <div className="beat--active"></div>
      )}
    </div>
  ));

  return (
    <div className="beat--container">
      <BeatContainer beatButtons={beatButtons} />
      <Button
        className="start--btn"
        handleClick={runMetronome}
        value={start ? "stop" : "start"}
      />
      <label htmlFor="beatBtnsLength">beats: {beatLength}</label>
      <Input
        handleChange={pasteBeatBtns}
        type="range"
        value={beatLength}
        name="beatBtnsLength"
        min="1"
        max="16"
      />
    </div>
  );
}
