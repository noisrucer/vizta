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
import { height } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import {ByYearDrawer} from "./Drawer/ByYearDrawer";
import { ByProfessorDrawer } from './Drawer/ByProfessorDrawer';
import { useSpring, animated } from "react-spring";

const baseURL = 'http://127.0.0.1:8000';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

const Visualization = () => {

    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [selectYear, setSelectYear] = useState([])
    const [selectProfessor, setSelectProfessor] = useState([])
    
    const [courseInfo, setCourseInfo] = useState({
        FinalDifficulty: {},
        GPA: {},
        LectureDifficulty: {},
        Pentagon: {},
        TeachingQuality: {},
        TimeTable: {},
        Workload: {}
    });

    const [GPA, setGPA] = useState({
        labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"],
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: ["#00FF00", "#35FF00", "#6AFF00", "#9FFF00", "#D4FF00", "#FFF600", "#FFC100", "#FF8C00", "#FF5700", "#FF2300", "#FF0000", "#FF0000"],
        }]
    })

    const [lectureDifficulty, setLectureDifficulty] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: ["#FF0000", "#FF3400", "#FF6900", "#FF9E00", "#FFE400", "#E5FF00", "#B0FF00", "#7CFF00", "#35FF00", "#00FF00"]
        }]
    })

    const [finalDifficulty, setFinalDifficulty] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: ["#FF0000", "#FF3400", "#FF6900", "#FF9E00", "#FFE400", "#E5FF00", "#B0FF00", "#7CFF00", "#35FF00", "#00FF00"]
        }]
    })

    const [workload, setWorkload] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [],
            backgroundColor: ["#FF0000", "#FF3400", "#FF6900", "#FF9E00", "#FFE400", "#E5FF00", "#B0FF00", "#7CFF00", "#35FF00", "#00FF00"]
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
            data: [10, 10, 10, 10, 10],
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
                setCourseInfo(response.data)
                setGPA({...GPA, datasets: [{
                    label: "Students Score",
                    data: response.data.GPA.values
                }]})
                setLectureDifficulty({...lectureDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.LectureDifficulty.values
                }]})
                setFinalDifficulty({...finalDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.FinalDifficulty.values
                }]})
                setWorkload({...workload, datasets: [{
                    label: "Students Score",
                    data: response.data.Workload.values
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
        const refreshCourseData = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/?year=${selectedYear}`,
                headers: userToken['headers']
            })
            .then(response => {
                console.log(response.data)
                setGPA({...GPA, datasets: [{
                    label: "Students Score",
                    data: response.data.GPA.values
                }]})
                setLectureDifficulty({...lectureDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.LectureDifficulty.values
                }]})
                setFinalDifficulty({...finalDifficulty, datasets: [{
                    label: "Students Score",
                    data: response.data.FinalDifficulty.values
                }]})
                setWorkload({...workload, datasets: [{
                    label: "Students Score",
                    data: response.data.Workload.values
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
        
    }, [selectedYear])

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
        // let dynamicPentagonLabel = conditionalPentagon.labels;
        let count = 0;
        let dynamicPentagonData = conditionalPentagon.datasets[0].data;

        [FEDVariant, GPAVariant, LDVariant, TQVariant, WVariant].map((item, index) => {
            if(item === 'outlined'){
                // dynamicPentagonLabel.splice(index, 1, "");
                dynamicPentagonData.splice(index, 1, 0);
                if (count === 0){
                    count += 1
                }
            }
            if(item === 'contained'){
                // dynamicPentagonLabel.splice(index, 1, pentagon.labels[index]);
                count += 1;
                dynamicPentagonData.splice(index, 1, pentagon.datasets[0].data[index]);
            }
        });

        const sum = dynamicPentagonData.reduce((acc, curr) => (acc + Math.round(curr * 100) / 100), 0);

        setConditionalPentagon({...conditionalPentagon, 
            datasets: [{
                labels: "students score",
                data: dynamicPentagonData
                }]
        });

        setConditionalOverallScore(Math.round((sum/count) * 10));

    }, [FEDVariant, GPAVariant, LDVariant, TQVariant, WVariant])

    const [viewByYear, setViewByYear] = useState(false);
    const [viewByProfessor, setViewByProfessor] = useState(false);

  return (
    <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row"
        }}>
        <Box sx={{
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            width: "75%",
            justifyContent: "center"
            }}>

            <Box sx={{ width: '91.2%', marginTop: 10, marginBottom: 2}}>
                <h1>{courseId} - {courseDescription.Name}</h1>
                <h6>{courseDescription.Description}</h6>
            </Box>
            <Stack 
                spacing={2} 
                direction="row"
                sx={{
                    width: "91.2%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 2
                }}>
                <Item sx={{ width: '51.5%'}}>
                    {selectedYear} {selectedProfessor}
                </Item>
                <TextField 
                    id="get-by-year"
                    select
                    label="Select Year"
                    sx={{ width: '25%'}}
                    defaultValue=""
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
                    sx={{ width: '25%'}}
                    defaultValue=""
                >
                    {selectProfessor.map((option) => (
                        <MenuItem key={option} value={option} onClick={() => setSelectedProfessor(option)}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            <Box sx={{ 
                width: '100%', 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                }}>
                <Stack spacing={2} sx={{
                    width: '100%', 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    }}>
                    <Stack 
                        spacing={2} 
                        direction="row" 
                        sx={{
                            width: '100%',
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                            }}>
                        <Item sx={{ width: '45%' }}>
                            GPA
                            <BarChart chartData={GPA} />
                        </Item>
                        <Item sx={{ width: '45%' }}>
                            Lecture Difficulty
                            <BarChart chartData={lectureDifficulty} />
                        </Item>
                    </Stack>
                    <Stack 
                        spacing={2} 
                        direction="row" 
                        sx={{
                            width: '100%',
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                            }}>
                        <Item sx={{ width: '45%' }}>
                            Exam Difficulty
                            <BarChart chartData={finalDifficulty} />
                        </Item>
                        <Item sx={{ width: '45%' }}>
                            Workload
                            <BarChart chartData={workload} />
                        </Item>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={{ width: '91.2%', marginTop: 2}}>
                <Stack spacing={2}>
                    <Item>Teaching Quality</Item>
                </Stack>
            </Box>
            <Box sx={{width: '91.2%', marginBottom: 2}}>
                <Stack direction='row'>
                    <Item sx={{width: "25%"}}>
                        Delivery
                        <OverallScore score={Math.round(delivery[0] * 10)}/>
                    </Item>
                    <Item sx={{width: "25%"}}>
                        Entertaining
                        <OverallScore score={Math.round(entertaining[0] * 10)}/>
                    </Item>
                    <Item sx={{width: "25%"}}>
                        Interactivity
                        <OverallScore score={Math.round(interactivity[0] * 10)}/>
                    </Item>
                    <Item sx={{width: "25%"}}>
                        Overall
                        <OverallScore score={Math.round(overallTeachingQuality[0] * 10)}/>
                    </Item>
                </Stack>
            </Box>
            <Box sx={{ width: '91.2%', marginBottom: 2}}>
                <Stack direction='row' spacing={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button variant={FEDVariant} startIcon={<BorderColorIcon />} onClick={handleFEDButtonClick}>
                        Final Exam Difficulty
                    </Button>
                    <Button variant={GPAVariant} startIcon={<GradingIcon />} onClick={handleGPAButtonClick}>
                        GPA
                    </Button>
                    <Button variant={LDVariant} startIcon={<ClassIcon />} onClick={handleLDButtonClick}>
                        Lecture Difficulty
                    </Button>
                    <Button variant={TQVariant} startIcon={<SchoolIcon />} onClick={handleTQButtonClick}>
                        Teaching Quality
                    </Button>
                    <Button variant={WVariant} startIcon={<AccessTimeFilledIcon />} onClick={handleWButtonClick}>
                        Workload
                    </Button>
                </Stack>
            </Box>
            <Box sx={{ width: '91.2%', marginBottom: 5}}>
                <Stack direction='row' spacing={2}>
                    <Item sx={{width: "50%", backgroundColor: "white"}}>
                        <RadarChart chartData={buttonClick ? conditionalPentagon : pentagon} />
                    </Item>
                    <Item sx={{width: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Item sx={{width: "70%"}}>
                            {/* <OverallScore score={buttonClick ? conditionalOverallScore : overallScore}/> */}
                            <h3>Overall Score:</h3>
                            <Stack direction='row' spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Number n={buttonClick ? conditionalOverallScore : overallScore}/>
                                <div style={{ fontSize: "24px"}}>/ 100</div>
                            </Stack>
                        </Item>
                    </Item>
                </Stack>
            </Box>
        </Box>
        <AppBar 
            component="nav" 
            sx={{
                backgroundColor: '#000000',
                width: "20%",
                height: '100%',
                marginTop: 10,
                marginRight: 6,
                }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                // width: "20%",
                // marginTop: 11
                }}>
                <Stack 
                    spacing={2} 
                    sx={{
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginBottom: 5,
                        }}>
                    <Button variant="contained" startIcon={<ReviewsIcon />} sx={{width: "100%"}}>
                        Add Review
                    </Button>
                    <Item sx={{ width: "100%" }}>
                        Grading Ratio
                        <HorizontalBarChart chartData={gradingRatio}/>
                    </Item>
                    <Item sx={{ width: '100%'}}>
                        <TimeTable chartData={timeTable}/>
                    </Item>

                    <ByYearDrawer status={viewByYear}></ByYearDrawer>
                    <ByProfessorDrawer status={viewByProfessor}></ByProfessorDrawer>
                </Stack>
            </Box>
        </AppBar>
    </Box>
  )
}

export default Visualization