import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import DoughnutChart from '../Charts/DoughnutChart';
import { useSpring, animated } from "react-spring";
import Item from "../Boxes/Item";
import TimeTable from "../Charts/TimeTable";

const CourseDescriptionGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "484px"
}))

const TimeTableGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "884px"
}))

const GradingRatioGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "584px"
}))

const OverallScoreGrid = styled(Item)(({theme}) => ({
  height: "270px",
  width: "784px"
}))

function Number({ n }) {
  const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 200,
      config: {mass: 1, tension: 20, friction: 10},
  });
  return ( 
      <animated.div style={{ fontSize: '72px'}}>
              {number.to((n) => n.toFixed(0))}
      </animated.div>
  )
}

const CourseInfo = (courseData) => {
  console.log("CourseData in courseInfo: ",courseData);

  return (
    <Box sx={{height: "550px", width: "1450px"}}>
      <Box sx={{marginLeft: 1}}>
        <Stack sx={{display: "flex", flexDirection: "row"}}>
          <CourseDescriptionGrid sx={{marginRight: 2}}>
            <h2>Department: {courseData.description.Faculty}</h2>
            <h2>Prerequisites: </h2>
            <h5>Description: {courseData.description.Description}</h5>
          </CourseDescriptionGrid>
          <TimeTableGrid>
            Time Table
            <TimeTable chartData={courseData.description.Timetable}/>
          </TimeTableGrid>
        </Stack>
      </Box>
      <Box sx={{marginLeft: 1, marginTop: 2}}>
        <Stack sx={{ display: "flex", flexDirection: "row"}}>
          <GradingRatioGrid sx={{marginRight: 2}}>
            Grading Ratio
          </GradingRatioGrid>
          <OverallScoreGrid>
            OverallScore
            <Number n={courseData.overallScore} />
          </OverallScoreGrid>
        </Stack>
      </Box>
    </Box>
  )
}

export default CourseInfo