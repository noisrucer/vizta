import React from "react";
import LectureQualityScoreProvider from "./LectureQualityScoreProvider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// this is a overallscore calculation for the lecture quality in Overview page
const LectureQualityScore = (props) => {
  let { score } = props;
  if (isNaN(score)) {
    score = 0;
  }

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return "hsl(" + c + ", 100%, 50%)";
  };

  return (
    <LectureQualityScoreProvider valueStart={0} valueEnd={score}>
      {(value) => (
        <CircularProgressbar
          value={value}
          text={`${value} %`}
          circleRatio={1} /* Make the circle only 0.7 of the full diameter */
          styles={buildStyles({
            pathColor: "#4BCEAC",
            trailColor: "#266756",
            textColor: "#4BCEAC",
          })}
          strokeWidth={10}
        />
      )}
    </LectureQualityScoreProvider>
  );
};

export default LectureQualityScore;
