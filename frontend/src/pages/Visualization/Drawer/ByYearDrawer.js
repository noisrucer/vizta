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
import { Line } from "react-chartjs-2";

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

export const ByYearDrawer = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const getYearlyTrend = async () => {
        axios.request({
            method: 'get',
            url: `${baseURL}/visualization/${courseId}/by_years`,
            headers: userToken['headers']
        })
        .then(response => {
            console.log("getYearlyTrends: ", response.data)
        })
        .catch(error => {
            console.log("error from /visualization/course_id/by_years: ", error)
        })
    };
    getYearlyTrend();
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

    return (
        <>
            <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ width: "100%" }}>
                View By Year
            </Button>
            <Drawer 
            PaperProps={{
              sx: { 
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30
              }
            }}
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
                      backgroundColor: "pink",
                      borderTopRightRadius: 30,
                      borderTopLeftRadius: 30
                      }} >
                <Puller/>
              </Box>
              <Box p={4} textAlign='center' role='presentation' >
                  <Typography variant="h5" component='div'>
                  By Year
                  </Typography>
              </Box>
              <Box sx={{width: "300px", height: "300px"}}>
                  <Line data={chartData} ref={chartRef} />
              </Box>
            </Drawer>
        </>
    )}