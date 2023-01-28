import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import{ Radar } from 'react-chartjs-2';

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

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
          usePointStyle: true,
          pointStyle: 'circle',
          useBorderRadius: "false"
        }
      },
      labels: {
        fontColor: "white"
      }
    },
    scale: {
      suggestedMax: 5
    },
    scales: {
      r: {
        beginAtZero: true,
        angleLines: {
          color: "#282F3C"
        },
        grid: {
          color: ["#282F3C", "#282F3C", "#282F3C", "#282F3C", "#282F3C", "#282F3C"]
        },
        pointLabels: {
          color: "white"
        },
        ticks: {
          color: "white",
          stepSize: 1,
          backdropColor: 'transparent'
        }
      }
    }
  };

const ProfessorStats = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);

    const [chartData, setChartData] = useState({
      labels: ['Lecture Difficulty', 'Final Difficulty', 'Workload', 'Teaching Quality'],
      datasets: []
    });

    useEffect(() => {
        const getProfStats = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/by_professors`,
                headers: userToken['headers']
            })
            .then(response => {
              const profData = response.data;
              console.log("by professor: ", response.data)
              const tempData = [];
              for (const key in profData) {
                const newDataset = { 
                  label: key, 
                  data: [profData[key].LectureDifficulty, profData[key].FinalDifficulty, profData[key].Workload, profData[key].TeachingQuality]
                };
                tempData.push(newDataset);
              };
              if (tempData.length > Object.keys(profData).length - 1){
                setChartData({
                  ...chartData,
                  datasets: tempData
                });
              }
            })
            .catch(error => {
                console.log("error from /visualization/course_id/by_professors: ", error)
            })
        };
        getProfStats();
    }, []);
  
    return (
        <Box sx={{width: "180%", height:"520px", display: 'flex', flexDirection: "column", alignItems: 'center'}}>
            <Box sx={{width:"520px", height:"520px"}}>
                <Radar data={chartData} options={options}/>
            </Box>
        </Box>
    )};

export default ProfessorStats