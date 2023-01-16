import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import SchoolIcon from '@mui/icons-material/School';
import GradingIcon from '@mui/icons-material/Grading';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ClassIcon from '@mui/icons-material/Class';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  }));
  
  const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
  }));

  const viewOptions = [
    {
      value: "byCriteria",
      label: "By Criteria"
    },
    {
      value: "byProfessor",
      label: "By Professor"
    }
  ];

export const ByYearDrawer = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);
    const [isCriteria, setIsCriteria] = useState(true);

    function checkIsCriteria(value) {
      if(value === "byCriteria"){
        setIsCriteria(true);
      } else {
        setIsCriteria(false);
      }
    }

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
            console.log("yearData: ", yearData);
            const tempData = []

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

    const [title, setTitle] = useState("Final Exam Difficulty")

    function changeCriteria(criteria) {
      setTitle(criteria)
      axios.request({
        method: 'get',
        url: `${baseURL}/visualization/${courseId}/by_years`,
        headers: userToken['headers']
      })
      .then(response => {
          const yearData = response.data;
          console.log("yearData: ", yearData);
          const tempData = []

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

    const [chartDataProfessor, setChartDataProfessor] = useState({
      labels: [],
      datasets: []
    })

    // if (!isCriteria) {
    //   axios.request({
    //     method: 'get',
    //     url: `${baseURL}/visualization/${courseId}/by_years`,
    //     headers: userToken['headers']
    //   })
    //   .then(response => {
    //     const yearData = response.data;
    //     const tempData = [];
    //     yearData.professors.map((item, index) => {
    //       const FED = {
    //         label: "Final Exam Difficulty",
    //         data: yearData.FinalExamDifficulty[index]
    //       };
    //       const 
    //     })
    //   })
    //   .catch(error => {
    //       console.log("error from /visualization/course_id/by_years: ", error)
    //   })
    // }

    console.log("byYear chartData: ", chartData)

    return (
        <>
            <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ width: "100%" }}>
                View By Year
            </Button>
            <Drawer 
            PaperProps={{
              sx: { 
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }
            }}
            anchor="bottom"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            sx={{
                height: "80%",
                display:"flex",
                }}
            >
              <Box 
                  textAlign='center' 
                  role='presentation' 
                  sx={{
                      backgroundColor: "pink",
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30
                      }} >
                <Puller/>
              </Box>
              <Box 
                p={4} 
                textAlign='center' 
                role='presentation' 
                sx={{
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: "center",
                  }}>
                  {isCriteria ? 
                  <Typography variant="h5" component='div' sx={{marginRight: 50}}>
                    By Criteria - {title}
                  </Typography> : 
                  <Typography variant="h5" component='div' sx={{marginRight: 50}}>
                    By Professor
                  </Typography>
                  }
                  <TextField 
                    id="select-view"
                    select
                    label="Select View"
                    defaultValue="byCriteria"
                    >
                    {viewOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value} onClick={() => checkIsCriteria(option.value)}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
              </Box>
              {isCriteria ? 
              <>
                <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifycontent: 'center', 
                      width: "50%", 
                      height: "370px",
                      }}>
                    <Line data={chartData} />
                </Box>
                <Box sx={{ width: '100%', marginTop: 2, marginBottom: 4}}>
                  <Stack direction='row' spacing={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <Button variant="contained" startIcon={<BorderColorIcon />} onClick={() => changeCriteria("FinalExamDifficulty")}>
                          Final Exam Difficulty
                      </Button>
                      <Button variant="contained" startIcon={<GradingIcon />} onClick={() => changeCriteria("GPA")}>
                          GPA
                      </Button>
                      <Button variant="contained" startIcon={<ClassIcon />} onClick={() => changeCriteria("LectureDifficulty")}>
                          Lecture Difficulty
                      </Button>
                      <Button variant="contained" startIcon={<SchoolIcon />} onClick={() => changeCriteria("TeachingQuality")}>
                          Teaching Quality
                      </Button>
                      <Button variant="contained" startIcon={<AccessTimeFilledIcon />} onClick={() => changeCriteria("Workload")}>
                          Workload
                      </Button>
                  </Stack>
                </Box>
              </>
              : 
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifycontent: 'center', 
                width: "50%", 
                height: "370px",
                }}>
                  <Line data={chartData} />
              </Box>
              }
            </Drawer>
        </>
    )}