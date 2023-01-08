import '@fontsource/public-sans';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import List from '@mui/material/list';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClassIcon from '@mui/icons-material/Class';
import BarChart from './BarChart';

const { tableau } = window;
const tableauURL = ``

const baseURL = 'http://127.0.0.1:8000'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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

    const [courseDescription, setCourseDescription] = useState({});

    useEffect(() => {
        const fetchCourseData = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}`,
                headers: userToken['headers']
            })
            .then(response => {
                setCourseInfo(response.data)
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

    }, [])

    console.log("courseInfo: ", courseInfo)
    console.log("courseDescription: ", courseDescription)

    const [pentagonParams, setPentagonParams] = useState([
        'GPA', 
        'Teaching Quality',
        'Lecture Difficulty',
        'Exam Difficulty',
        'Workload'
        ])

    const [GPA, setGPA] = useState({
        labels: ["A", "A+", "A-", "B", "B+", "B-", "C", "C+", "C-", "D", "D+", "D-", "F"],
        datasets: [{
            label: "Students Score",
            data: [0, 3, 0, 0, 0, 0, 1 ,0 ,0, 2, 0, 2]
        }]
    })

    const [LectureDifficulty, setLectureDifficulty] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [2, 1, 0, 3, 0, 0, 0 ,0, 0, 2]
        }]
    })

    const [finalDifficulty, setFinalDifficulty] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [4, 0, 0, 3, 0, 0, 0 ,0 ,0, 1]
        }]
    })

    const [workload, setWorkload] = useState({
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [{
            label: "Students Score",
            data: [3, 1, 0, 0, 0, 0, 3, 0, 0, 1]
        }]
    })

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
            <Item sx={{ width: '20%' }}>Grading Ratio</Item>
            <Item sx={{ width: '70%' }}>Time Table</Item>
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
                        <BarChart chartData={GPA}/>
                    </Item>
                    <Item sx={{ width: '45%' }}>
                        Lecture Difficulty
                        <BarChart chartData={LectureDifficulty}/>
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
                        <BarChart chartData={finalDifficulty}/>
                    </Item>
                    <Item sx={{ width: '45%' }}>
                        Workload
                        <BarChart chartData={workload}/>
                    </Item>
                </Stack>
            </Stack>
        </Box>
        <Box sx={{ width: '91.2%', marginTop: 2, marginBottom: 5}}>
            <Stack spacing={2}>
                <Item>Teaching Quality</Item>
            </Stack>
        </Box>
        <Box sx={{ width: '91.2%'}}>
            <List sx={{display: "flex", alignItems: 'center'}}>
                {pentagonParams.map((value, index) => (
                    <ListItem key={value} >
                        <ListItemButton 
                            sx={{
                                backgroundColor: 'blue'
                            }}>
                            <ListItemIcon>
                                {index === 0 ? <GradingIcon/> : <></>}
                                {index === 1 ?  <SchoolIcon /> : <></>}
                                {index === 2 ? <ClassIcon /> : <></>}
                                {index === 3 ? <BorderColorIcon /> : <></>}
                                {index === 4 ? <AccessTimeFilledIcon /> : <></>}
                            </ListItemIcon>
                            <ListItemText>
                                {value}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Stack spacing={2}>
                <Item>Pentagon</Item>
            </Stack>
        </Box>
    </Box>
  )
}

export default Visualization