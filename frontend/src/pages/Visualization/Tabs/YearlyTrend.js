import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import LineChart from '../Charts/LineChart';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;

const criteria = [
  {
    value: "FinalExamDifficulty",
    label: "Final Exam"
  },
  {
    value: "GPA",
    label: "GPA"
  },
  {
    value: "LectureDifficulty",
    label: "Lecture Difficulty"
  },
  {
    value: "CourseDelivery",
    label: "Delivery"
  },
  {
    value: "CourseEntertainment",
    label: "Entertainment"
  },
  {
    value: "CourseInteractivity",
    label: "Interactivity"
  },
  {
    value: "Workload",
    label: "Workload"
  },
];

const YearlyTrend = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [professorList, setProfessorList] = useState([]);

    const [chartData, setChartData] = useState({
      labels: [],
      datasets: []
    })

    useEffect(() => {
      const getYearlyTrend = async () => {
        axios.request({
            method: 'get',
            url: `${baseURL}/visualization/${courseId}/by_years`,
            headers: userToken['headers']
        })
        .then(response => {
            const yearData = response.data;
            const tempData = []

            setProfessorList(yearData.professors);

            yearData.professors.map((item, index) => {

              const newDataSet = {
                label: item,
                data: yearData.FinalExamDifficulty[index]
              };
              tempData.push(newDataSet);
            });
            if (tempData.length > Object.keys(yearData.professors).length - 1){
              setChartData({...chartData, labels: yearData.years, datasets: tempData});
            }
        })
        .catch(error => {
            console.log("error from /visualization/course_id/by_years: ", error)
        })
    };
    getYearlyTrend();
    }, [])

    const [title, setTitle] = useState("Final Exam")

    function changeCriteria(criteria, name) {
      setTitle(name)
      axios.request({
        method: 'get',
        url: `${baseURL}/visualization/${courseId}/by_years`,
        headers: userToken['headers']
      })
      .then(response => {
          const yearData = response.data;
          const tempData = []
          console.log("hello: ", yearData)

          yearData.professors.map((item, index) => {

            const newDataSet = {
              label: item,
              data: yearData[criteria][index]
            };
            tempData.push(newDataSet);
          });
          if (tempData.length > Object.keys(yearData.professors).length - 1) {
            setChartData({...chartData, labels: yearData.years, datasets: tempData});
          }
      })
      .catch(error => {
          console.log("error from /visualization/course_id/by_years: ", error)
      })
    }

    console.log("byYear chartData: ", chartData);
    console.log("professorList: ", professorList);

    return (
      <Box sx={{width: "100%", height: "520px"}}>
          <TextField 
            id="select-view"
            select
            variant="standard"
            label="Select Criteria"
            defaultValue="Final Exam"
            sx={{position: "absolute", left: 1260, top: 110, width: "128px"}}
            >
            {criteria.map((option) => (
              <MenuItem key={option.label} value={option.label} onClick={() => changeCriteria(option.value, option.label)}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        <Box
          sx={{marginLeft: 20, bgcolor: '#1D2630', display:"flex", flexDirection: "column", alignItems: 'center', height: 520 }}
        >
          <h1>{title}</h1>
          <Box sx={{height: "520px", width: "900px"}}>
            <LineChart chartData={chartData} />
          </Box>
        </Box>
      </Box>
    )};

    export default YearlyTrend;