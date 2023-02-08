import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import DoughnutChart from "../Charts/DoughnutChart";
import Item from "../Boxes/Item";
import TimeTable from "../Charts/TimeTable";
import LockIcon from "@mui/icons-material/Lock";
import Divider from "@mui/material/Divider";
import Textfield from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const CourseDescriptionGrid = styled(Item)(({ theme }) => ({
  height: "260px",
  width: "500px",
}));

const TimeTableGrid = styled(Item)(({ theme }) => ({
  height: "260px",
  width: "900px",
}));

const GradingRatioGrid = styled(Item)(({ theme }) => ({
  height: "260px",
  width: "600px",
}));

const OverallScoreGrid = styled(Item)(({ theme }) => ({
  height: "260px",
  width: "800px",
}));

const CourseInfo = (courseData) => {
  console.log("CourseData in courseInfo: ", courseData);

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

  const gradingRatioList = courseData.description.GradingRatio.Values;

  console.log("gradingRatioList: ", Object.keys(gradingRatioList));

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

  console.log("GradingRatio: ", gradingRatio);

  return (
    <Box sx={{ width: windowSize[0] /1.03, height:windowSize[1]/1.4, overflowX: "hidden", overflowY: "hidden" }}>
      <Box sx={{ marginLeft: 1 }}>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <CourseDescriptionGrid sx={{ width: windowSize[0]/3.05, height: windowSize[1]/3.05, marginRight: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
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
                    height: "195px",
                    overflowY: "scroll",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: 0.5,
                      marginLeft: 1,
                      marginBottom: 1,
                    }}
                  >
                    <h4 style={{ color: "#FF5721", marginRight: 10 }}>
                      Department:{" "}
                    </h4>
                    <h4>{courseData.description.Faculty}</h4>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: 1, marginBottom: 1 }}>
                    {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Prerequisites: </h4> */}
                    <h4 style={{ textAlign: "left" }}>
                      <label style={{ color: "#FF5721" }}>
                        Prerequisites:{" "}
                      </label>
                      {courseData.description.Prerequisite || "None"}
                    </h4>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: 1, marginBottom: 1 }}>
                    {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Blocking Courses: </h4> */}
                    <h4 style={{ textAlign: "left" }}>
                      <label style={{ color: "#FF5721" }}>
                        Blocking Courses:{" "}
                      </label>
                      {courseData.description.BlockingCourses.join(", ") ||
                        "None"}
                    </h4>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: 1, marginBottom: 1 }}>
                    {/* <h4 style={{color: "#FFC106", marginRight: 10}}>Mutual Exclusives: </h4> */}
                    <h4 style={{ textAlign: "left" }}>
                      <label style={{ color: "#FF5721" }}>
                        Mutual Exclusives:{" "}
                      </label>
                      {courseData.description.MutualExclusives.join(", ") ||
                        "None"}
                    </h4>
                  </Box>
                  <Box sx={{ display: "flex", marginLeft: 1 }}>
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
          </CourseDescriptionGrid>
          <TimeTableGrid sx={{ width: windowSize[0]/1.7, height: windowSize[1]/3.05, overflowX: "scroll" }}>
            <Box sx={{ marginBottom: 1 }}>
              <h2>Time Table</h2>
            </Box>
            <TimeTable chartData={courseData.description.Timetable} />
          </TimeTableGrid>
        </Stack>
      </Box>
      <Box sx={{ marginLeft: 1, marginTop: 3 }}>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <GradingRatioGrid sx={{ width: windowSize[0]/2.4, height: windowSize[1]/3.05, marginRight: 3 }}>
            <Stack 
              sx={{ 
                display: "flex", 
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                }}>
              <Box sx={{width: "200px"}}></Box>
              <h2>Grading Ratio</h2>
              <Box sx={{ width: "200px" }}>
                  <Textfield
                    id="get-grading-ratio"
                    select
                    // label="select professor"
                    variant="standard"
                    defaultValue={Object.values(gradingRatioList)[0]}
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
              </Stack>
            <Box
              sx={{
                marginLeft: 18,
                marginTop: -3,
                width: windowSize[1] / 3,
                height: windowSize[0] / 3.1,
              }}
            >
              <DoughnutChart chartData={gradingRatio} />
            </Box>
          </GradingRatioGrid>
          <OverallScoreGrid sx={{
            width: windowSize[0]/2.005, 
            height: windowSize[1]/3.05,
            display: "flex",
            flexDirection: "column",

            }}>
            <Box sx={{ marginBottom: windowSize[1] / 140 }}>
              <h2>Comments</h2>
            </Box>
            <Box>
              <LockIcon sx={{ fontSize: 80, color: "grey" }} />
              <h3 style={{ color: "grey" }}>To be released</h3>
            </Box>
          </OverallScoreGrid>
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseInfo;
