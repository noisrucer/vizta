import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";

export default function TimeTable(chartData) {

    const timeTableInfo = chartData.chartData;

    const CreateTimeTableElements = (subclass, timeslots, instructor) => {
        return (
            <Box
                sx={{
                    height: "200px",
                    width: "200px",
                    backgroundColor: "#1F2B3F", //#333A46
                    border: "0.05px solid #70D9BD",
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
                    <h1 style={{ color: "#70D9BD", marginLeft: 15, marginTop: 4 }}>
                        {subclass}
                    </h1>
                    <h3 style={{ color: "#70D9BD", marginLeft: 15, marginTop: -20 }}>Instructor:</h3>
                    <h4 style={{ marginLeft: 15, fontWeight: "400", marginTop: -20 }}>{instructor}</h4>
                    <h3 style={{ color: "#70D9BD", marginLeft: 15, marginTop: -15 }}>Time slots:</h3>
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
                        <h4 style={{ marginLeft: 15, fontWeight: "600", marginTop: -20 }}>
                            {item.Weekday}:{" "}
                        </h4>
                        <h5 style={{ marginLeft: 15, fontWeight: "400", marginTop: -20 }}>
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
        <Box
            sx={{ width: "100%" }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    overflowX: "hidden",
                    overflowY: "hidden"
                }}
            >
                {createTimeTable(timeTableInfo)}
            </Box>
        </Box>
    );
}