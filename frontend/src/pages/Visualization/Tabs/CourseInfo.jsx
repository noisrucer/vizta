import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Textfield from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoPieChart from "../Charts/NivoPieChart";
import TimeTable from "../Charts/TimeTable";
import MenuItem from "@mui/material/MenuItem";
import {
  Heading24,
  Heading32,
  Paragraph32,
  Paragraph20,
  Paragraph16,
  Paragraph24,
} from "../../../components/GlobalStyledComponents";

const CourseInfo = (courseData) => {
  const courseInfoData = courseData.description;
  const profList = Object.keys(courseInfoData.GradingRatio);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const defaultGR =
    courseInfoData.GradingRatio[Object.keys(courseInfoData.GradingRatio)[0]];

  const [gradingRatio, setGradingRatio] = useState(defaultGR);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={2}
      height="71.5vh"
    >
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 7", lg: "span 6" }}
        backgroundColor={colors.primary[400]}
        borderRadius="2%"
      >
        {/*Put GENERAL INFO in Here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Heading24>General Information </Heading24>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // border: "3px solid #1D2630",
              borderRadius: 0,
              padding: 2,
              height: "full",
              overflowY: "scroll",
            }}
          >
            <Box
              sx={{
                border: "0.05px solid #70D9BD",
                borderRadius: "5px",
                boxShadow: 2,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2,
              }}
            >
              <Heading24 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Department:{" "}
                </label>
              </Heading24>
              <Paragraph16>
                {courseData.description.Faculty || "None"}
              </Paragraph16>
            </Box>
            <Box
              sx={{
                border: "0.05px solid #70D9BD",
                borderRadius: "5px",
                boxShadow: 2,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2,
              }}
            >
              <Heading24 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Prerequisites:{" "}
                </label>
              </Heading24>
              <Paragraph16>
                {courseData.description.Prerequisite || "None"}
              </Paragraph16>
            </Box>
            <Box
              sx={{
                border: "0.05px solid #70D9BD",
                borderRadius: "5px",
                boxShadow: 2,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2,
              }}
            >
              <Heading24 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Blocking Courses:{" "}
                </label>
              </Heading24>
              <Paragraph16>
                {courseData.description.BlockingCourses.join(", ") || "None"}
              </Paragraph16>
            </Box>
            <Box
              sx={{
                border: "0.05px solid #70D9BD",
                borderRadius: "5px",
                boxShadow: 2,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2,
              }}
            >
              <Heading24 style={{ marginBottom: "-10px" }}>
                <label style={{ color: colors.greenAccent[400] }}>
                  Mutual Exclusives:{" "}
                </label>
              </Heading24>
              <Paragraph16>
                {courseData.description.MutualExclusives.join(", ") || "None"}
              </Paragraph16>
            </Box>
            <Box
              sx={{
                border: "0.05px solid #70D9BD",
                borderRadius: "5px",
                boxShadow: 2,
                paddingLeft: 1,
                paddingRight: 1,
                marginBottom: 2,
              }}
            >
              {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Description: </h4> */}
              <Heading24
                style={{
                  marginBottom: "-10px",
                }}
              >
                <label style={{ color: colors.greenAccent[400] }}>
                  Description:{" "}
                </label>
              </Heading24>
              <Paragraph16>{courseData.description.Description}</Paragraph16>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 3", lg: "span 3" }}
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
            // justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box width="35%"></Box>
            <Heading24>GradingRatio</Heading24>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "35%",
              }}
            >
              <Textfield
                id="get-grading-ratio"
                select
                // label="select professor"
                variant="standard"
                defaultValue={profList[0]}
                sx={{
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
                {profList.map((key) => {
                  // const filteredGradingRatioList = gradingRatioList[key].filter(function(val) { return val != 0})
                  return (
                    <MenuItem
                      key={key}
                      value={key}
                      onClick={() => {
                        setGradingRatio(courseInfoData.GradingRatio[key]);
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
            width={{ xs: "350px", sm: "350px" }}
            height={{ xs: "250px", sm: "250px", lg: "200px", xl: "200px" }}
          >
            <NivoPieChart data={gradingRatio} />
          </Box>
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 6" }}
        gridRow={{ xs: "span 5", lg: "span 3" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="2%"
      >
        <Heading24>Add Course</Heading24>

        {/*Put TIMETABLE in Here */}
        <TimeTable chartData={courseData.description.Timetable} />
      </Box>
    </Box>
  );
};

export default CourseInfo;
