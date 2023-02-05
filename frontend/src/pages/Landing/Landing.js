import React from "react";
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
  const { IsLanding } = React.useContext(UserContext);
  const [isLanding, setIsLanding] = IsLanding;

  setIsLanding(true);
  return (
    <div className={`bg-background grid gap-y-16 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}
          >
            <Header />
            <MainHero />
          </div>
        </div>
        <MainHeroImage />
      </div>
      <Canvas />
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
