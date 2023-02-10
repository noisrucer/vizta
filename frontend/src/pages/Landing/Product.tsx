import React from "react";

import config from "../../config/index.json";
import Divider from "./Divider";
import "../../styles/main.css";
const Product = () => {
  const { product } = config;
  const [firstItem, secondItem] = product.items;

  return (
    <section className={`bg-background py-8`} id="product">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {product.title.split(" ").map((word, index) => (
            <span key={index} className={"text-primary"}>
              {word}{" "}
            </span>
          ))}
        </h1>
        <Divider />
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6 mt-20`}>
            <h3
              className={`text-3xl font-bold leading-none mb-3`}
              style={{ color: "white" }}
            >
              {firstItem?.title}
            </h3>
            <p className={`text-gray-600`} style={{ color: "#b9b6b6" }}>
              {firstItem?.description}
            </p>
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              className="h-6/6"
              src={firstItem?.img}
              alt={firstItem?.title}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <img
              className="h-6/6"
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className={`w-full sm:w-1/2 p-6 mt-20`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl font-bold leading-none mb-3`}
                style={{ color: "white" }}
              >
                {secondItem?.title}
              </h3>
              <p className={`text-gray-600 mb-8`} style={{ color: "#b9b6b6" }}>
                {secondItem?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
