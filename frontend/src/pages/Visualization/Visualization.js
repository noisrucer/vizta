import '@fontsource/public-sans';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClassIcon from '@mui/icons-material/Class';
import TimeTable from './TimeTable';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import HorizontalBarChart from './HorizontalBarChart';
import RadarChart from './RadarChart';
import { height } from '@mui/system';

const baseURL = 'http://127.0.0.1:8000'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function calculateAverage(score, studentEvaluation){
    var sum = 0;
    var numAns = 0;
    score.map((item, index) => {
        console.log(`score: ${item} evaluation: ${studentEvaluation[index]} multiple: ${item * studentEvaluation[index]}`)
        sum += item * studentEvaluation[index]
        numAns += studentEvaluation[index]
    })
    console.log(sum/numAns)
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
            borderColor: "rgba(255,255,255)"
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

    const [delivery, setDelivery] = useState({
        labels: ["Yes", "No"],
        datasets: [{
            label: "Students Score",
            data: [0, 10],
            backgroundColor: ["blue" , "#262B31"]
        }]
    })

    const [entertaining, setEntertaining] = useState({
        labels: ["Yes", "No"],
        datasets: [{
            label: "Students Score",
            data: [0, 10],
            backgroundColor: ["green" , "#262B31"]
        }]
    })

    const [interactivity, setInteractivity] = useState({
        labels: ["Yes", "No"],
        datasets: [{
            label: "Students Score",
            data: [0, 10],
            backgroundColor: ["red" , "#262B31"]
        }]
    })

    const [overallTeachingQuality, setOverallTeachingQuality] = useState({
        labels: ["Yes", "No"],
        datasets: [{
            label: "Students Score",
            data: [0, 10],
            backgroundColor: ["purple" , "#262B31"]
        }]
    })

    const [pentagon, setPentagon] = useState({
        labels: ["Final Difficulty", "GPA", "Lecture Difficulty", "Teaching Quality", "Workload"],
        datasets: [{
            label: "Overall Score",
            data: []
        }]
    })

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

    useEffect(() => {
        const fetchCourseData = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}`,
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
                setDelivery({...delivery, datasets: [{
                    label: "Students Score",
                    data: calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values)
                }]})
                setEntertaining({...entertaining, datasets: [{
                    label: "Students Score",
                    data: calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values)
                }]})
                setInteractivity({...interactivity, datasets: [{
                    label: "Students Score",
                    data: calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                }]})
                setOverallTeachingQuality({... overallTeachingQuality, datasets: [{
                    label: "Students Score",
                    data: calculateOverallAverage(
                        calculateAverage(teachingQuality.Delivery.keys, teachingQuality.Delivery.values),
                        calculateAverage(teachingQuality.Entertaining.keys, teachingQuality.Entertaining.values),
                        calculateAverage(teachingQuality.Interactivity.keys, teachingQuality.Interactivity.values)
                        )
                }]})
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

    }, [])

    console.log("courseInfo: ", courseInfo)
    console.log("courseDescription: ", courseDescription)
    console.log("Time Table: ", timeTable)
    console.log("Grading Ratio: ", gradingRatio)
    console.log("Pentagon: ", pentagon)

  return (
    <Box sx={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        }}>

        <Box sx={{ width: '91.2%', marginTop: 10, marginBottom: 2}}>
            <h1>{courseId} - {courseDescription.Name}</h1>
            <h6>{courseDescription.Description}</h6>
        </Box>
        <Stack 
            spacing={2} 
            direction="row" 
            sx={{
                width: '100%',
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                marginBottom: 5
                }}>
            <Item sx={{ width: '30%', height: 285}}>
                Grading Ratio
                <HorizontalBarChart chartData={gradingRatio}/>
            </Item>
            <Item sx={{ width: '60%' }}>
                <TimeTable chartData={timeTable}/>
            </Item>
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
        <Box sx={{width: '91.2%', marginBottom: 5}}>
            <Stack direction='row'>
                <Item sx={{width: "25%"}}>
                    Delivery
                    <DoughnutChart chartData={delivery} />
                </Item>
                <Item sx={{width: "25%"}}>
                    Entertaining
                    <DoughnutChart chartData={entertaining} />
                </Item>
                <Item sx={{width: "25%"}}>
                    Interactivity
                    <DoughnutChart chartData={interactivity} />
                </Item>
                <Item sx={{width: "25%"}}>
                    Overall
                    <DoughnutChart chartData={overallTeachingQuality} />
                </Item>
            </Stack>
        </Box>
        <Box sx={{ width: '91.2%', marginBottom: 2}}>
            <Stack direction='row' spacing={2}>
                    <Item sx={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <GradingIcon></GradingIcon>
                        GPA
                    </Item>
                    <Item sx={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <SchoolIcon></SchoolIcon>
                        Teaching Quality
                    </Item>
                    <Item sx={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <ClassIcon></ClassIcon>
                        Lecture Difficulty
                    </Item>
                    <Item sx={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <BorderColorIcon></BorderColorIcon>
                        Final Exan Difficulty
                    </Item>
                    <Item sx={{width: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <AccessTimeFilledIcon></AccessTimeFilledIcon>
                        Workload
                    </Item>
            </Stack>
        </Box>
        <Box sx={{ width: '91.2%'}}>
            <Stack direction='row' spacing={2}>
                <Item sx={{width: "50%"}}>
                    <RadarChart chartData={pentagon} />
                </Item>
                <Item sx={{width: "50%"}}>
                    Overall Score: 
                </Item>
            </Stack>
        </Box>
    </Box>
  )
}

export default Visualization