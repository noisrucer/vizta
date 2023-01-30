import '@fontsource/public-sans';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ClassIcon from '@mui/icons-material/Class';
import TimeTable from './Charts/TimeTable';
import BarChart from './Charts/BarChart';
import DoughnutChart from './Charts/DoughnutChart';
import HorizontalBarChart from './Charts/HorizontalBarChart';
import RadarChart from './Charts/RadarChart';
import OverallScore from './OverallScore/OverallScore';
import AppBar from '@mui/material/AppBar';
import { ByYearDrawer } from "./Drawer/ByYearDrawer";
import { ByProfessorDrawer } from './Drawer/ByProfessorDrawer';
import { useSpring, animated } from "react-spring";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Overview from './Tabs/Overview';
import CourseInfo from './Tabs/CourseInfo';
import YearlyTrend from './Tabs/YearlyTrend';
import ProfessorStats from './Tabs/ProfessorStats';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Item from "./Boxes/Item";
import Popper from "@mui/material/Popper";
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';


const baseURL = 'http://127.0.0.1:8000';
const dataColor = ["#DF6E53", "#EC8B33", "#F4BA41", "#5772B3", "#50B19E"];
const workloadLabel = ["Very Heavy", "Heavy", "Medium", "Light", "Very Light"];
const lectureFinalLabel = ["Very Difficult", "Difficult", "Medium", "Easy", "Very Easy"];
const GPALabel = ["A range", "B range", "C range", "D range", "F"];

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

function calculateAverage(score, studentEvaluation){
    var sum = 0;
    var numAns = 0;
    score.map((item, index) => {
        sum += item * studentEvaluation[index]
        numAns += studentEvaluation[index]
    })
    return [sum/numAns, 10 - sum/numAns]
  }

function calculateOverallAverage(delivery, entertaining, interactivity){
    const overall = (delivery[0] + entertaining[0] + interactivity[0]) / 3
    return [overall, 10 - overall]
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

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

    const [gradingRatio, setGradingRatio] = useState({
        labels: ["Final Exam", "Midterm", "Assignments", "Project"],
        datasets: [{
            label: "",
            data: [50, 0, 50, 0]
        }]
    });

    const [timeTable, setTimeTable] = useState({});

    useEffect(() => { // get request from courseInfo, courseDescription, available year and professor
        const fetchCourseData = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}`,
                // year: 2022,
                // professor: "Lo Yu Sum",
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
                const teachingQuality = response.data.TeachingQuality
                setDelivery(calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values))
                setEntertaining(calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values))
                setInteractivity(calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values))
                setOverallTeachingQuality(
                    calculateOverallAverage(
                        calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values),
                        calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values),
                        calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                        ))
                setPentagon({...pentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.TeachingQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
                const sum = [response.data.Pentagon.FinalDifficulty, response.data.Pentagon.GPA, response.data.Pentagon.LectureDifficulty, response.data.Pentagon.TeachingQuality, response.data.Pentagon.Workload].reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);
                setOverallScore(Math.round((sum/5) * 10));
                setConditionalPentagon({...conditionalPentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.TeachingQuality,
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
                // setGradingRatio({...gradingRatio, datasets: [{
                //     label: "",
                //     data: response.data.GradingRatio.Values
                // }]})
                setTimeTable(response.data.Timetable)
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

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");

    useEffect(() => { // render component again when select year
        const formatProfessor = selectedProfessor.replace(/ /g, "%20");
        let path = ""
        if (selectedYear !== "" && selectedProfessor !== "") {
            path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}&professor=${formatProfessor}`
        }
        else if (selectedYear !== "" && selectedProfessor === "") {
            path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}`
        }
        else if (selectedYear === "" && selectedProfessor !== "") {
            path = `${baseURL}/visualization/${courseId}/?professor=${formatProfessor}`
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
                const teachingQuality = response.data.TeachingQuality
                setDelivery(calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values))
                setEntertaining(calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values))
                setInteractivity(calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values))
                setOverallTeachingQuality(
                    calculateOverallAverage(
                        calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values),
                        calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values),
                        calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                        ))
                setPentagon({...pentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.TeachingQuality,
                        response.data.Pentagon.Workload
                    ]
                }]})
                const sum = [response.data.Pentagon.FinalDifficulty, response.data.Pentagon.GPA, response.data.Pentagon.LectureDifficulty, response.data.Pentagon.TeachingQuality, response.data.Pentagon.Workload].reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);
                setOverallScore(Math.round((sum/5) * 10));
                setConditionalPentagon({...conditionalPentagon, datasets: [{
                    label: "Overall Score",
                    data: [
                        response.data.Pentagon.FinalDifficulty,
                        response.data.Pentagon.GPA,
                        response.data.Pentagon.LectureDifficulty,
                        response.data.Pentagon.TeachingQuality,
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

    const [buttonClick, setButtonClick] = useState(false);

    const [FEDVariant, setFEDVariant] = useState('contained');
    const handleFEDButtonClick = () => {
        setButtonClick(true)
        setFEDVariant(FEDVariant === 'contained' ? 'outlined' : 'contained')
    }

    const [GPAVariant, setGPAVariant] = useState('contained');
    const handleGPAButtonClick = () => {
        setButtonClick(true)
        setGPAVariant(GPAVariant === 'contained' ? 'outlined' : 'contained')
    }

    const [LDVariant, setLDVariant] = useState('contained');
    const handleLDButtonClick = () => {
        setButtonClick(true)
        setLDVariant(LDVariant === 'contained' ? 'outlined' : 'contained')
    }

    const [TQVariant, setTQVariant] = useState('contained');
    const handleTQButtonClick = () => {
        setButtonClick(true)
        setTQVariant(TQVariant === 'contained' ? 'outlined' : 'contained')
    }

    const [WVariant, setWVariant] = useState('contained');
    const handleWButtonClick = () => {
        setButtonClick(true)
        setWVariant(WVariant === 'contained' ? 'outlined' : 'contained')
    }

    const [conditionalPentagon, setConditionalPentagon] = useState(pentagon);
    const [conditionalOverallScore, setConditionalOverallScore] = useState(0);

    useEffect(() => { // for dynamic pentagon
        const criteria = ["Final", "GPA", "Lecture", "Teaching", "Workload"]
        let dynamicPentagonLabel = conditionalPentagon.labels;
        let dynamicPentagonData = conditionalPentagon.datasets[0].data;
        let count = 0;

        [FEDVariant, GPAVariant, LDVariant, TQVariant, WVariant].map((item, index) => {
            if(item === 'outlined'){
                dynamicPentagonLabel.splice(index, 1, "");
                dynamicPentagonData.splice(index, 1, 0);
            }
            else {
                dynamicPentagonLabel.splice(index, 1, criteria[index]);
                dynamicPentagonData.splice(index, 1, pentagon.datasets[0].data[index]);
                count += 1;
            }
        });

        if(count === 0){
            count += 1
        }

        for ( let i = 4; i >= 0; i--){
            if (dynamicPentagonLabel[i] === "") {
                dynamicPentagonLabel.splice(i, 1);
                dynamicPentagonData.splice(i, 1);
            }
        }

        const sum = dynamicPentagonData.reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);

        setConditionalPentagon({...conditionalPentagon, 
            labels: dynamicPentagonLabel,
            datasets: [{
                labels: "students score",
                data: dynamicPentagonData
                }]
        });

        setConditionalOverallScore(Math.round((sum/count) * 10));

    }, [FEDVariant, GPAVariant, LDVariant, TQVariant, WVariant])

    const [viewByYear, setViewByYear] = useState(false);
    const [viewByProfessor, setViewByProfessor] = useState(false);

    const [viewBar, setViewBar] = useState(true);

    const theme = useTheme();
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
        // alignItems: "center"
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
                <AppBar position="static" sx={{marginLeft: 4, bgcolor: '#1D2630'}}>
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
                {/* <FormGroup>
                    <FormControlLabel 
                    control={<MaterialUISwitch defaultChecked />} 
                    label="Label" 
                    onClick={() => {setViewBar(!viewBar)}}
                    />
                </FormGroup> */}
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