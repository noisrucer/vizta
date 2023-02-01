import '@fontsource/public-sans';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Overview from './Tabs/Overview';
import CourseInfo from './Tabs/CourseInfo';
import YearlyTrend from './Tabs/YearlyTrend';
import ProfessorStats from './Tabs/ProfessorStats';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';


const baseURL = 'http://127.0.0.1:8000';
const dataColor = ["#DF6E53", "#EC8B33", "#F4BA41", "#5772B3", "#50B19E"];
const workloadLabel = ["Very Heavy", "Heavy", "Medium", "Light", "Very Light"];
const lectureFinalLabel = ["Very Difficult", "Difficult", "Medium", "Easy", "Very Easy"];
const GPALabel = ["A range", "B range", "C range", "D range", "F"];

function calculateAverage(score, studentEvaluation){
    var sum = 0;
    var numAns = 0;
    score.map((item, index) => {
        sum += item * studentEvaluation[index]
        numAns += studentEvaluation[index]
    })
    return [sum/numAns, 5 - sum/numAns]
  }

function calculateOverallAverage(delivery, entertaining, interactivity){
    const overall = (delivery[0] + entertaining[0] + interactivity[0]) / 3
    return [overall, 5 - overall]
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Visualization = () => {

    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [selectYear, setSelectYear] = useState([])
    const [selectProfessor, setSelectProfessor] = useState([])

    const [GPA, setGPA] = useState({
        labels: GPALabel,
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: dataColor,
        }]
    })

    const [lectureDifficulty, setLectureDifficulty] = useState({
        labels: lectureFinalLabel,
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: dataColor
        }]
    })

    const [finalDifficulty, setFinalDifficulty] = useState({
        labels: lectureFinalLabel,
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: dataColor
        }]
    })

    const [workload, setWorkload] = useState({
        labels: workloadLabel,
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: dataColor
        }]
    })

    const [delivery, setDelivery] = useState([])
    const [entertaining, setEntertaining] = useState([])
    const [interactivity, setInteractivity] = useState([])
    const [overallTeachingQuality, setOverallTeachingQuality] = useState([])

    const [pentagon, setPentagon] = useState({
        labels: ["Final Difficulty", "GPA", "Lecture Difficulty", "Teaching Quality", "Workload"],
        datasets: [{
            label: "Overall Score",
            data: [5, 5, 5, 5, 5],
        }]
    })

    const [overallScore, setOverallScore] = useState(0)

    const [courseDescription, setCourseDescription] = useState({
        CourseID: "",
        Description: "",
        Faculty: "",
        GradingRatio: {},
        Name: "",
        Timetable: {}
    });

    useEffect(() => { // get request from courseInfo, courseDescription, available year and professor
        const fetchCourseData = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}`,
                headers: userToken['headers']
            })
            .then(response => {
                setGPA({...GPA, datasets: [{
                    label: "Students Score",
                    data: response.data.GPA,
                    backgroundColor: dataColor
                }]})
                setLectureDifficulty({...lectureDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.LectureDifficulty.values,
                    backgroundColor: dataColor
                }]})
                setFinalDifficulty({...finalDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.FinalDifficulty.values,
                    backgroundColor: dataColor
                }]})
                setWorkload({...workload, datasets: [{
                    label: "Students Score",
                    data: response.data.Workload.values,
                    backgroundColor: dataColor
                }]})
                const teachingQuality = response.data.LectureQuality
                console.log("viz: ", response.data)
                console.log("teaching quality: ", teachingQuality)
                setDelivery(calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values))
                setEntertaining(calculateAverage(teachingQuality.Entertainment.keys, teachingQuality.Entertainment.values))
                setInteractivity(calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values))
                setOverallTeachingQuality(
                    calculateOverallAverage(
                        calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values),
                        calculateAverage(teachingQuality.Entertainment.keys, teachingQuality.Entertainment.values),
                        calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                        ))
                setPentagon({...pentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.LectureQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
                const sum = [response.data.Pentagon.FinalDifficulty, response.data.Pentagon.GPA, response.data.Pentagon.LectureDifficulty, response.data.Pentagon.LectureQuality, response.data.Pentagon.Workload].reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);
                setOverallScore(Math.round((sum/5) * 10));
                setConditionalPentagon({...conditionalPentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.LectureQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
            })
            .catch(error => {
                console.log("error from /visualization/course_id: ", error)
            })
        };
        fetchCourseData();

        const fecthCourseGeneralInfo = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/general_info`,
                headers: userToken['headers']
            })
            .then(response => {
                setCourseDescription(response.data)
            })
            .catch(error => {
                console.log("error from /visualization/course_id/general_info: ", error)
            })
        };
        fecthCourseGeneralInfo();

        const getAvailableYears = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/years`,
                headers: userToken['headers']
            })
            .then(response => {
                setSelectYear(response.data)
            })
            .catch(error => {
                console.log("error from /visualization/course_id/years: ",error)
            })
        };
        getAvailableYears();

        const getAvailableProfessors = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/professors`,
                headers: userToken['headers']
            })
            .then(response => {
                setSelectProfessor(response.data)
            })
            .catch(error => {
                console.log("error from /visualization/course_id/professors: ",error)
            })
        };
        getAvailableProfessors();

    }, [])

    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedProfessor, setSelectedProfessor] = useState("All");

    useEffect(() => { // render component again when select year
        const formatProfessor = selectedProfessor.replace(/ /g, "%20");
        let path = ""
        if (selectedYear !== "All" && selectedProfessor !== "All") {
            path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}&professor=${formatProfessor}`
        }
        else if (selectedYear !== "All" && selectedProfessor === "All") {
            path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}`
        }
        else if (selectedYear === "All" && selectedProfessor !== "All") {
            path = `${baseURL}/visualization/${courseId}/?professor=${formatProfessor}`
        } else {
            path = `${baseURL}/visualization/${courseId}`
        }
        const refreshCourseData = async () => {
            axios.request({
                method: 'get',
                url: path,
                headers: userToken['headers']
            })
            .then(response => {
                console.log("render component when select year: ", response.data)
                setGPA({...GPA, datasets: [{
                    label: "Students Score",
                    data: response.data.GPA,
                    backgroundColor: dataColor
                }]})
                setLectureDifficulty({...lectureDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.LectureDifficulty.values,
                    backgroundColor: dataColor
                }]})
                setFinalDifficulty({...finalDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.FinalDifficulty.values,
                    backgroundColor: dataColor
                }]})
                setWorkload({...workload, datasets: [{
                    label: "Students Score",
                    data: response.data.Workload.values,
                    backgroundColor: dataColor
                }]})
                const teachingQuality = response.data.LectureQuality
                setDelivery(calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values))
                setEntertaining(calculateAverage(teachingQuality.Entertainment.keys, teachingQuality.Entertainment.values))
                setInteractivity(calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values))
                setOverallTeachingQuality(
                    calculateOverallAverage(
                        calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values),
                        calculateAverage(teachingQuality.Entertainment.keys, teachingQuality.Entertainment.values),
                        calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                        ))
                setPentagon({...pentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.LectureQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
                const sum = [response.data.Pentagon.FinalDifficulty, response.data.Pentagon.GPA, response.data.Pentagon.LectureDifficulty, response.data.Pentagon.LectureQuality, response.data.Pentagon.Workload].reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);
                setOverallScore(Math.round((sum/5) * 10));
                setConditionalPentagon({...conditionalPentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.LectureQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
            })
            .catch(error => {
                console.log("error from courseInfo with select year, prof: ", error)
            })
        };
        refreshCourseData();
        
    }, [selectedYear,selectedProfessor])

    const [conditionalPentagon, setConditionalPentagon] = useState(pentagon);

    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const [isOverview, setIsOverview] = useState(true);

  return (
    <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        }}>
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            width: "100%",
            justifyContent: "center"
            }}>

            <Box sx={{ 
                width: '93%', 
                marginTop: 8, 
                marginBottom: 1, 
                display: "flex", 
                flexDirection: "row",
                alignItems: 'center',
                }}>
                <h2>
                    <span style={{color: "#4FB19E"}}>
                        {courseId} {" "}
                    </span>
                    <span>
                        / {courseDescription.Name}
                    </span>
                </h2>
                <Box sx={{marginLeft: "auto"}}>
                    <Button variant="outlined">
                        {'>'} Add review
                    </Button>
                </Box>
            </Box>
        </Box>
        <Box sx={{display: "flex", marginLeft:2}}>
            <Box sx={{ bgcolor: '#1D2630', width: 800 }}>
                <AppBar position="static" sx={{marginLeft: 4, bgcolor: "#1D2630"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                    <Tab label="Overview" {...a11yProps(0)} onClick={() => {setIsOverview(true)}}/>
                    <Tab label="Course Information" {...a11yProps(1)} onClick={() => {setIsOverview(false)}}/>
                    <Tab label="Yearly Trend" {...a11yProps(2)} onClick={() => {setIsOverview(false)}}/>
                    <Tab label="Professor Statistics" {...a11yProps(3)} onClick={() => {setIsOverview(false)}}/>
                    </Tabs>
                </AppBar>
                    <TabPanel value={value} index={0}>
                        <Overview 
                            GPA={GPA} 
                            lectureDifficulty={lectureDifficulty} 
                            finalDifficulty={finalDifficulty} 
                            workload={workload} 
                            pentagon={pentagon} 
                            teachingQuality={overallTeachingQuality}
                            interactivity={interactivity}
                            entertaining={entertaining}
                            delivery={delivery}
                            overallScore={overallScore}
                            />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CourseInfo 
                            description={courseDescription}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <YearlyTrend />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ProfessorStats />
                    </TabPanel>
            </Box>
            <Box>
             <Stack 
                spacing={2} 
                direction="row"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 28.5
                }}>
                { isOverview ? 
                    <>
                        <TextField 
                            id="get-by-year"
                            select
                            label="Select Year"
                            variant='standard'
                            sx={{ width: '150px'}}
                            defaultValue={selectedYear}
                        >
                            {selectYear.map((option) => (
                                <MenuItem key={option} value={option} onClick={() => setSelectedYear(option)}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField 
                            id="get-by-professor"
                            select
                            label="Select Professor"
                            variant='standard'
                            sx={{ width: '180px'}}
                            defaultValue={selectedProfessor}
                        >
                            {selectProfessor.map((option) => (
                                <MenuItem key={option} value={option} onClick={() => setSelectedProfessor(option)}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </> : 
                    <></> 
                }
            </Stack>
            </Box>
        </Box>
    </Box>
  )
}

export default Visualization