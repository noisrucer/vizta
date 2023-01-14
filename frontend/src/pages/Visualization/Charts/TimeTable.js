import * as React from 'react';
import Box from "@mui/material/Box";

export default function TimeTable(chartData) {

  const timeTableInfo = chartData.chartData;

  const CreateTimeTableElements = (subclass, timeslots, instructor) => {
    return (
      <Box sx={{
          height: "95%", 
          width:"90%", 
          backgroundColor: "black", 
          border: "2px solid white",
          borderRadius: "10%",
          marginTop: 1,
          marginBottom: 1,
          display: "flex",
          flexDirection: "column",
          }}>
        <h1>{subclass}</h1>
        <h3>Instructor:</h3>
        <h4>{instructor}</h4>
        <h3>TimeSlots:</h3>
        {timeslots.map((item) => (
          <>
            <h4>{item.Weekday}: </h4>
            <h5>{item.StartTime} ~ {item.EndTime} {item.Location}</h5>
          </>
        ))}
      </Box>
    )}

  function createTimeTable(table){
    const elements = [];
    for (const key in table) {
      elements.push(CreateTimeTableElements(key, table[key].Timeslots, table[key].Instructor))
    }
    return elements;
  };


  return (
    <Box>
      <Box 
      sx={{
          height: "230px", 
          width: "100%", 
          display: "flex", 
          flexDirection: "row", 
          flexWrap: "wrap",
          alignItems: "center", 
          justifyContent: "center",
          overflowX: "hidden",
          overflowY: "scroll" 
          }}>
        {createTimeTable(timeTableInfo)}
      </Box>
    </Box>
  );
}