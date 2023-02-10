import { FC } from "react";

import { useCanvasContext } from "../../hooks/useCanvas";
import useResponsiveSize from "../../hooks/useResponsiveSize";
import WaveObj from "../../utils/wave";
import "../../styles/main.css";
const Wave: FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 600;
  let frequency = 0.013;
  const waves = {
    frontWave: new WaveObj([0.0211, 0.028, 0.015], "rgba(54, 162, 235, 0.1)"), // 'rgb(236, 71, 85, 0.1)'
    backWave: new WaveObj([0.0122, 0.018, 0.005], "rgba(255, 99, 132, 0.1)"), // rgb(249, 168, 168, 0.1)
  };

  const render = () => {
    context?.clearRect(0, 0, width, height);
    Object.entries(waves).forEach(([, wave]) => {
      wave.draw(context!, width, height, frequency);
    });
    frequency += 0.013;
    requestAnimationFrame(render);
  };
  if (context) render();
  return null;
};

export default Wave;
