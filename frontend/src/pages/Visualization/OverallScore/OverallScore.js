import React from 'react';
import OverallScoreProvider from './OverallScoreProvider';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const OverallScore = (props) => {
  const { score } = props;

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  return (
    <OverallScoreProvider valueStart={0} valueEnd={score}>
      {(value) => (
        <CircularProgressbar
          value={value}
          text={`${value} %`}
          circleRatio={0.7} /* Make the circle only 0.7 of the full diameter */
          styles={{
            trail: {
              strokeLinecap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
            },
            path: {
              strokeLinecap: 'butt',
              transform: 'rotate(-126deg)',
              transformOrigin: 'center center',
              stroke: calcColor(value, 0, 120),
            },
            text: {
              fill: '#ddd',
            },
          }}
          strokeWidth={5}
        />
      )}
    </OverallScoreProvider>
  );
};

export default OverallScore;