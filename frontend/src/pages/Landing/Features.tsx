import React from "react";

import config from "../../config/index.json";
import "../../styles/main.css";

const Features = () => {
  const { features } = config;
  const { subtitle, description, items: featuresList } = features;
  return (
    <div className={`py-12 bg-background`} id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          {/* <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
            style={{ color: 'white' }}
          >
            {title}
          </h2> */}
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl text-primary">
            {subtitle}
          </p>
          <p
            className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto"
            style={{ color: "#b9b6b6" }}
          >
            {description}
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {featuresList.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div
                    className={`absolute flex items-center justify-center h-12 w-12 rounded-md bg-background text-tertiary border-primary border-4`}
                  >
                    <img
                      className={`inline-block h-6 w-6 rounded-full`}
                      src={feature.icon}
                      alt={feature.name}
                    />
                  </div>
                  <p
                    className="ml-16 text-lg leading-6 font-medium text-gray-900"
                    style={{ color: "white" }}
                  >
                    {feature.name}
                  </p>
                </dt>
                <dd
                  className="mt-2 ml-16 text-base text-gray-500"
                  style={{ color: "#b9b6b6" }}
                >
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
