import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Textfield from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoPieChart from "../Charts/NivoPieChart";
import pieData from "./NivoData/PieData";
import TimeTable from "../Charts/TimeTable";
import MenuItem from "@mui/material/MenuItem";
import {
  Heading48,
  Heading32,
  Paragraph32,
  Paragraph20,
  Paragraph16,
  Paragraph24,
  Heading20,
} from "../../../components/GlobalStyledComponents";

const gradingRatioList = {
  "Lo Yu Sum": [25, 25, 25, 25],
  "Lee Kwak Lam": [0, 50, 0, 50],
};

const CourseInfo = (courseData) => {
  console.log("coursedata: ", courseData);
  const courseInfoData = courseData.description;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [gradingRatio, setGradingRatio] = useState({
    labels: courseData.description.GradingRatio.Constitution,
    datasets: [
      {
        label: "students answer",
        data: gradingRatioList[Object.keys(gradingRatioList)[0]],
        backgroundColor: ["#36A2EB", "#FF6384", "#FF9F3F", "#FFCD56"],
        borderColor: "#333A46",
      },
    ],
  });

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={4}
      marginBottom={3}
      sx={{ height: "100%" }}
    >
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 7", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        borderRadius="2%"
      >
        {/*Put GENERAL INFO in Here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Heading32>General Information </Heading32>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "3px solid #1D2630",
              marginTop: 2,
              borderRadius: 0,
              marginLeft: "10px",
            }}
          >
            <Box sx={{}}>
              <Heading20 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Department:{" "}
                </label>
              </Heading20>
              <Paragraph16>
                {courseData.description.Faculty || "None"}
              </Paragraph16>
            </Box>
            <Box sx={{}}>
              <Heading20 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Prerequisites:{" "}
                </label>
                <Paragraph16>
                  {courseData.description.Prerequisite || "None"}
                </Paragraph16>
              </Heading20>
            </Box>
            <Box sx={{}}>
              <Heading20 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Blocking Courses:{" "}
                </label>
              </Heading20>
              <Paragraph16>
                {courseData.description.BlockingCourses.join(", ") || "None"}
              </Paragraph16>
            </Box>
            <Box sx={{}}>
              {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Mutual Exclusives: </h4> */}
              <Heading20 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Mutual Exclusives:{" "}
                </label>
              </Heading20>
              <Paragraph16>
                {courseData.description.MutualExclusives.join(", ") || "None"}
              </Paragraph16>
            </Box>
            <Box sx={{}}>
              {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Description: </h4> */}
              <Heading20
                style={{
                  marginBottom: "-10px",
                }}
              >
                <label style={{ color: colors.greenAccent[400] }}>
                  Description:{" "}
                </label>
              </Heading20>
              <Paragraph16>{courseData.description.Description}</Paragraph16>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 3", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GRADING RATIO in Here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
          }}
        >
          <Heading32>GradingRatio</Heading32>
          <Box width="300px" height="300px">
            <NivoPieChart data={pieData} />
          </Box>
        </Box>
        <Box sx={{ width: "20%", height: "100%", marginTop: "40px" }}>
          <Textfield
            id="get-grading-ratio"
            select
            // label="select professor"
            variant="standard"
            defaultValue={Object.values(gradingRatioList)[0]}
            sx={{
              marginLeft: "auto",
              "& label.Mui-focused": {
                color: `${colors.greenAccent[500]}`,
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: `${colors.greenAccent[500]}`,
                },
              },
            }}
          >
            {Object.keys(gradingRatioList).map((key) => {
              // const filteredGradingRatioList = gradingRatioList[key].filter(function(val) { return val != 0})
              return (
                <MenuItem
                  key={key}
                  value={gradingRatioList[key]}
                  onClick={() => {
                    setGradingRatio({
                      ...gradingRatio,
                      datasets: [
                        {
                          label: "students answer",
                          data: gradingRatioList[key],
                        },
                      ],
                    });
                  }}
                >
                  {key}
                </MenuItem>
              );
            })}
          </Textfield>
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 5", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        <Heading32 style={{ marginTop: "-70px" }}>Add Course</Heading32>

        {/*Put TIMETABLE in Here */}
        <TimeTable chartData={courseData.description.Timetable} />
      </Box>
    </Box>
  );
};

export default CourseInfo;
