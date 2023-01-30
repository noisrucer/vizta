import { useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DoughnutChart from '../Charts/DoughnutChart';
import Item from "../Boxes/Item";
import TimeTable from "../Charts/TimeTable";
import LockIcon from '@mui/icons-material/Lock';
import Divider from '@mui/material/Divider';
import Textfield from '@mui/material/Textfield';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const CourseDescriptionGrid = styled(Item)(({theme}) => ({
  height: "260px",
  width: "460px"
}))

const TimeTableGrid = styled(Item)(({theme}) => ({
  height: "260px",
  width: "860px"
}))

const GradingRatioGrid = styled(Item)(({theme}) => ({
  height: "260px",
  width: "560px"
}))

const OverallScoreGrid = styled(Item)(({theme}) => ({
  height: "260px",
  width: "760px"
}))

const CourseInfo = (courseData) => {
  console.log("CourseData in courseInfo: ",courseData);

  const gradingRatioList = courseData.description.GradingRatio.Values

  console.log("gradingRatioList: ", Object.keys(gradingRatioList))

  const [gradingRatio, setGradingRatio] = useState({
    labels: courseData.description.GradingRatio.Constitution,
    datasets: [{
      label: "students answer",
      data: gradingRatioList[Object.keys(gradingRatioList)[0]],
    }]
  })

  console.log("GradingRatio: ", gradingRatio)

  return (
    <Box sx={{height: "550px", width: "1450px", overflowX: "hidden"}}>
      <Box sx={{marginLeft: 1}}>
        <Stack sx={{display: "flex", flexDirection: "row"}}>
          <CourseDescriptionGrid sx={{marginRight: 3}}>
            <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start"}}>
              <Box sx={{
                display:"flex", 
                flexDirection: "column", 
                alignItems: "center",
                }}>
                <h2>General Information </h2>
                <Box sx={{
                  display: "flex", 
                  flexDirection: "column", 
                  alignItems: "flex-start",
                  border: "4px solid #1D2630",
                  marginTop: 2,
                  borderRadius: 5,
                  height: "195px",
                  overflowY: "scroll"
                  }}>
                  <Box sx={{display: "flex", marginTop: 0.5, marginLeft:1}}>
                    <h4 style={{color: "#FF5721", marginRight: 10}}>Department: </h4>
                    <h4>{courseData.description.Faculty}</h4>
                  </Box>
                  <Box sx={{display:"flex", marginLeft:1}}>
                    <h4 style={{color: "#FF5721", marginRight: 10}}>Prerequisites: </h4>
                    <h4 style={{textAlign:"left"}}>{courseData.description.Prerequisite}</h4>
                  </Box>
                  <Box sx={{display: "flex", marginLeft:1}}>
                    <h4 style={{color: "#FF5721", marginRight: 10}}>Blocking Courses: </h4>
                    <h4 style={{textAlign:"left"}}>{courseData.description.BlockingCourses.join(", ")}</h4>
                  </Box>
                  <Box sx={{display: "flex", marginLeft:1}}>
                    <h4 style={{color: "#FF5721", marginRight: 10}}>Mutual Exclusives: </h4>
                    <h4 style={{textAlign:"left"}}>{courseData.description.MutualExclusives.join(", ")}</h4>
                  </Box>
                  <Box sx={{display:"flex", marginLeft: 1}}>
                      <h4 style={{color: "#FF5721", marginRight: 10}}>Description: </h4>
                      <h4 style={{marginTop:5, marginLeft: 10, marginRight: 10, marginBottom: 10, textAlign:"left"}}>{courseData.description.Description}</h4>
                    </Box>
                </Box>
              </Box>
            </Box>
          </CourseDescriptionGrid>
          <TimeTableGrid sx={{overflowX: "scroll"}}>
            <Box sx={{marginBottom: 1}}>
              <h2>Time Table</h2>
            </Box>
            <TimeTable chartData={courseData.description.Timetable}/>
          </TimeTableGrid>
        </Stack>
      </Box>
      <Box sx={{marginLeft: 1, marginTop: 3}}>
        <Stack sx={{ display: "flex", flexDirection: "row"}}>
          <GradingRatioGrid sx={{marginRight: 3}}>
            <h2>Grading Ratio</h2>
            <Box sx={{display: "flex", flexDirection: "row"}}>
              <Box sx={{ marginLeft: 2, marginTop: -3, height: "250px", width: "250px"}}>
                <DoughnutChart chartData={gradingRatio} />
              </Box>
              <Box sx={{ marginLeft: 10, height: "200px", width: "200px"}}>
                <Textfield
                  id="get-grading-ratio"
                  select
                  label="select professor"
                  variant="outlined"
                  sx={{width: "160px"}}
                  defaultValue={Object.values(gradingRatioList)[0]}
                >
                  { Object.keys(gradingRatioList).map((key) => {
                    return <MenuItem 
                      key={key} 
                      value={gradingRatioList[key]} 
                      onClick={() => {setGradingRatio({...gradingRatio, datasets: [{
                        label: "students answer",
                        data: gradingRatioList[key]
                      }]})}}>
                      {key}
                    </MenuItem>
                  })}
                </Textfield>
              </Box>
            </Box>
          </GradingRatioGrid>
          <OverallScoreGrid>
            <Box sx={{marginBottom: 4}}>
              <h2>Comments</h2>
            </Box>
            <Box>
              <LockIcon sx={{fontSize: 80, color: "grey"}}/>
              <h3 style={{ color: "grey"}}>To be released</h3>
            </Box>
          </OverallScoreGrid>
        </Stack>
      </Box>
    </Box>
  )
}

export default CourseInfo