import {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

export default function TimeTable(chartData) {

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

  const timeTableInfo = chartData.chartData;

  const CreateTimeTableElements = (subclass, timeslots, instructor) => {
    return (
      <Box
        sx={{
          height: "200px",
          width: "200px",
          backgroundColor: "#333A46", //#333A46
          border: "0.05px solid #DEE2E2",
          borderRadius: 2,
          marginTop: 1,
          marginBottom: 1,
          margin: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "white", marginLeft: 15, marginTop: 4 }}>
            {subclass}
          </h1>
          {/* <Divider
            sx={{
              marginTop: -0.1,
              marginLeft: 0.4,
              marginBottom: 0.5,
              width: "195px",
              borderWidth: 1,
              backgroundColor: "black",
            }}
          ></Divider> */}
          <h3 style={{ color: "#FFC106", marginLeft: 15 }}>Instructor:</h3>
          <h4 style={{ marginLeft: 15, fontWeight: "400" }}>{instructor}</h4>
          <h3 style={{ color: "#FFC106", marginLeft: 15 }}>Time slots:</h3>
        </Box>
        {timeslots.map((item) => (
          <Box
            sx={{
              width: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h4 style={{ marginLeft: 15, fontWeight: "600" }}>
              {item.Weekday}:{" "}
            </h4>
            <h5 style={{ marginLeft: 15, fontWeight: "400" }}>
              {item.StartTime} ~ {item.EndTime} {item.Location}
            </h5>
          </Box>
        ))}
      </Box>
    );
  };

  function createTimeTable(table) {
    const elements = [];
    for (const key in table) {
      elements.push(
        CreateTimeTableElements(
          key,
          table[key].Timeslots,
          table[key].Instructor
        )
      );
    }
    return elements;
  }

  return (
    <Box>
      <Box
        sx={{
          height: windowSize[1] / 3.8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflowX: "scroll",
        }}
      >
        {createTimeTable(timeTableInfo)}
      </Box>
    </Box>
  );
}
