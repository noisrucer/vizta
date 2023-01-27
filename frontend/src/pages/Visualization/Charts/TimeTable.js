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
          margin: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          }}>
        <Box sx={{
            width: "200px", 
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
            }}>
          <h1 style={{color: "#FFC106", marginLeft: 15}}>{subclass}</h1>
          <h3 style={{marginLeft: 20}}>Instructor:</h3>
          <h4 style={{marginLeft: 25, fontWeight: "100"}}>{instructor}</h4>
          <h3 style={{marginLeft: 20}}>TimeSlots:</h3>
        </Box>
        {timeslots.map((item) => (
          <Box sx={{
              width: "200px", 
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
              }}>
              <h4 style={{marginLeft: 20}}>{item.Weekday}: </h4>
              <h5 style={{marginLeft: 25, fontWeight: "100"}}>{item.StartTime} ~ {item.EndTime} {item.Location}</h5>
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
          height: "210px",  
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center", 
          overflowX: "scroll",
          }}>
        {createTimeTable(timeTableInfo)}
      </Box>
    </Box>
  );
}