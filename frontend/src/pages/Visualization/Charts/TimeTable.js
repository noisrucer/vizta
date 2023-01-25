import * as React from 'react';
import Box from "@mui/material/Box";

export default function TimeTable(chartData) {

  const timeTableInfo = chartData.chartData;

  const CreateTimeTableElements = (subclass, timeslots, instructor) => {
    return (
      <Box sx={{
          height: "200px", 
          width: "200px", 
          backgroundColor: "#333A46", 
          border: "2px solid #1D2630",
          borderRadius: 5,
          marginTop: 1,
          marginBottom: 1,
          margin: 1
          }}>
        <h1>{subclass}</h1>
        <h3>Instructor:</h3>
        <h4>{instructor}</h4>
        <h3>TimeSlots:</h3>
        {timeslots.map((item) => (
          <Box>
            <h4>{item.Weekday}: </h4>
            <h5>{item.StartTime} ~ {item.EndTime} {item.Location}</h5>
          </Box>
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
          display: "flex", 
          flexDirection: "row", 
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