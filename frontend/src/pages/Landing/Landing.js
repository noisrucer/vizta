import {useContext, useEffect, useState} from "react";
import { UserContext } from "../../UserContext";
import About from "./About";
import Canvas from "./Canvas";
import Features from "./Features";
import Header from "./Header";
import LazyShow from "./LazyShow";
import MainHero from "./MainHero";
import MainHeroImage from "./MainHeroImage";
import Product from "./Product";

import "../../styles/main.css";

const Landing = () => {

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  console.log("window size: ", windowSize);

  const { IsLanding } = useContext(UserContext);
  const [isLanding, setIsLanding] = IsLanding;

  setIsLanding(true);
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`} style={{display: "flex", flexDirection: "column", justifyContent: "center", height: windowSize[1]}}>
      <div className={`relative bg-background`} style={{display: "flex", height: windowSize[1], flexDirection: "column", justifyContent: "center", alignItems: "flex-start"}}>
        <div style={{ marginLeft: 100 * windowSize[0] / 1440, zIndex: 1}}>
          <div style={{position: "absolute", left: -20, top: -10}}>
            <Header />
          </div>
          <MainHero />
        </div>
        <div style={{zIndex: 0}}>
          <MainHeroImage />
        </div>
      </div>
      <Canvas/>
      {/* <LazyShow>
        <>
          <Product />
          <Canvas />
        </>
      </LazyShow> */}
      {/* <LazyShow>
        <>
          <Features />
          <Canvas />
        </>
      </LazyShow>
      <LazyShow>
        <>
          <About />
        </>
      </LazyShow> */}
    </div>
  );
};

export default Landing;
