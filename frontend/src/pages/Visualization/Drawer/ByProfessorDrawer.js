import {useState, useEffect, useContext, useRef} from 'react';
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

export const ByProfessorDrawer = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getProfStats = async () => {
            axios.request({
                method: 'get',
                url: `${baseURL}/visualization/${courseId}/by_professors`,
                headers: userToken['headers']
            })
            .then(response => {
                console.log("getProfStats: ", response.data)
            })
            .catch(error => {
                console.log("error from /visualization/course_id/by_professors: ", error)
            })
        };
        getProfStats();
    }, [])

    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [1, 2, 3, 4, 5],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }
      ]
    });
  
    const addDataset = () => {
      if(chartRef && chartRef.current && chartRef.current.chartInstance) {
        const newDataset = {
          label: 'New dataset',
          data: [1, 2, 3, 4, 5],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        };
    
        chartRef.current.chartInstance.data.datasets.push(newDataset);
        chartRef.current.chartInstance.update();
        setChartData({...chartData});
      }
    };
  
    const removeDataset = () => {
      if(chartRef && chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.data.datasets.pop();
        chartRef.current.chartInstance.update();
        setChartData({...chartData});
      }
    };

    return (
        <>
            <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ width: "100%" }}>
                View By Professor
            </Button>
            <Drawer 
            anchor="bottom"
            open={isOpen}
            onClose={() => setIsOpen(false)}
            sx={{
                height: "80%",
                }}
            >
            <Box 
                textAlign='center' 
                role='presentation' 
                sx={{
                    backgroundColor: "white",
                    borderTopRightRadius: 20
                    }} >
                <Typography variant="h5" component='div'>
                By Professor
                </Typography>
            </Box>
            <Box p={2} textAlign='center' role='presentation' >
                <Typography variant="h5" component='div'>
                By Professor
                </Typography>
            </Box>
            <Box sx={{width: "300px", height: "300px"}}>
                <Radar data={chartData} ref={chartRef} />
            </Box>
            <Button onClick={addDataset}>Add dataset</Button>
            <Button onClick={removeDataset}>Remove dataset</Button>

            </Drawer>
        </>
    )}