import React from "react";
import "./Beat.scss";

export function Beat(props) {
  const [start, setStart] = React.useState(false);
  const [display, setDisplay] = React.useState(false);
  const [beatLength, setBeatLength] = React.useState(4);
  const [beatBtn, setBeatBtn] = React.useState(Array(beatLength).fill("btn"));
  const [count, setCount] = React.useState(0);

  function runMetronome() {
    setStart((prevRun) => !prevRun);
    setDisplay((prevD) => (prevD = true));
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
      const interval = setInterval(() => {
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

  console.log(count);

  const beatButtons = beatBtn.map((btn, idx) => (
    <div key={idx} className="beat">
      {start && display && idx === count && (
        <div className="beat--active"></div>
      )}
    </div>
  ));

  return (
    <div>
      <div className="beat--btn--container">{beatButtons}</div>
      <button onClick={runMetronome}>{start ? "stop" : "start"}</button>
      <label htmlFor="beatBtnsLength">beats: {beatLength}</label>
      <input
        name="beatBtnsLength"
        onChange={pasteBeatBtns}
        type="range"
        value={beatLength}
        min="1"
        max="16"
      ></input>
    </div>
  );
}
