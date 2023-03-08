import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoPieChart from "../Charts/NivoPieChart";
import pieData from "./NivoData/PieData";
import TimeTable from "../Charts/TimeTable";

const CourseInfo = (courseData) => {
  console.log("coursedata: ", courseData)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        gridColumn={{ xs: "span 12", lg: "span 5" }}
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GENERAL INFO in Here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>General Information </h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              // border: "3px solid #1D2630",
              marginTop: 2,
              borderRadius: 0,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <h4 style={{ textAlign: "left" }}>
                <label style={{ color: "#FF5721" }}>
                  Department: {" "}
                </label>
              </h4>
              <h4>{courseData.description.Faculty || "None"}</h4>
            </Box>
            <Box sx={{ display: "flex" }}>
              <h4 style={{ textAlign: "left" }}>
                <label style={{ color: "#FF5721" }}>
                  Prerequisites: {" "}
                </label>
                {courseData.description.Prerequisite || "None"}
              </h4>
            </Box>
            <Box sx={{ display: "flex", }}>
              <h4 style={{ textAlign: "left" }}>
                <label style={{ color: "#FF5721" }}>
                  Blocking Courses:{" "}
                </label>
                {courseData.description.BlockingCourses.join(", ") || "None"}
              </h4>
            </Box>
            <Box sx={{ display: "flex", }}>
              {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Mutual Exclusives: </h4> */}
              <h4 style={{ textAlign: "left" }}>
                <label style={{ color: "#FF5721" }}>
                  Mutual Exclusives:{" "}
                </label>
                {courseData.description.MutualExclusives.join(", ") ||
                  "None"}
              </h4>
            </Box>
            <Box sx={{ display: "flex" }}>
              {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Description: </h4> */}
              <h4
                style={{
                  marginTop: 0,
                  marginRight: 10,
                  marginBottom: 10,
                  textAlign: "left",
                }}
              >
                <label style={{ color: "#FF5721" }}>Description: </label>
                {courseData.description.Description}
              </h4>
            </Box>
          </Box>
        </Box>

      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 7" }}
        gridRow={{ xs: "span 3", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GRADING RATIO in Here */}
        <Box sx={{ height: "200px", width: "200px" }}>
          <NivoPieChart data={pieData} />
        </Box>
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 7" }}
        gridRow={{ xs: "span 3", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put TIMETABLE in Here */}
        <TimeTable chartData={courseData.description.Timetable} />
      </Box>
    </Box>
  );
};

export default CourseInfo;
