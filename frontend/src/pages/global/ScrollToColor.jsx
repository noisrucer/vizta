import React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const ScrollHandler = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: props.window ? window() : undefined,
  });

  return React.cloneElement(props.children, {
    style: {
      backgroundColor: trigger ? "white" : "transparent",
      color: trigger ? "#70d8bd" : "white",
      transition: trigger ? "0.3s" : "0.5s",
      borderBottom: trigger ? "solid" : "none",
      boxShadow: "none",
      padding: "10px 0px",
    },
  });
};

const ScrollToColor01 = (props) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

export default ScrollToColor01;
