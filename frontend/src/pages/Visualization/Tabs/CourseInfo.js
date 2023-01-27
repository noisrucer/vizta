import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DoughnutChart from '../Charts/DoughnutChart';
import Item from "../Boxes/Item";
import TimeTable from "../Charts/TimeTable";
import LockIcon from '@mui/icons-material/Lock';
import Divider from '@mui/material/Divider';

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

  return (
    <Box sx={{height: "550px", width: "1450px", overflowX: "hidden"}}>
      <Box sx={{marginLeft: 1}}>
        <Stack sx={{display: "flex", flexDirection: "row"}}>
          <CourseDescriptionGrid sx={{marginRight: 3}}>
            <Box sx={{marginBottom: 1}}>
              <h2>Course Description</h2>
            </Box>
            <Box sx={{display:"flex", flexDirection: "column", alignItems: "flex-start"}}>
              <h2 style={{marginTop:10}}>Department: {courseData.description.Faculty}</h2>
              <h2>Prerequisites: </h2>
              <Box sx={{display:"flex"}}>
                <h2 style={{marginRight: 20}}>Description: </h2>
                <Box sx={{border: "4px solid #1D2630", borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "flex-start", overflowY: "scroll", height: "135px"}}>
                  <h5 style={{marginTop:5, marginLeft: 10, marginRight: 10, marginBottom: 10}}>{courseData.description.Description}</h5>
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
            <h3>Final Exam: </h3>
            <h3>Midterm: </h3>
            <h3>Assignments: </h3>
            <h3>Project: </h3>
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