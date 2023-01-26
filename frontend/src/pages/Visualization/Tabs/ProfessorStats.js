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
        // position: 'right'
      }
    }
  }

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
    }, [isOpen]);
  
    return (
        <>
            <Button variant="contained" onClick={() => setIsOpen(true)} sx={{ width: "100%" }}>
                View By Professor
            </Button>
            <Drawer
            PaperProps={{
              sx: { 
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
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
                By Professor
                </Typography>
            </Box>
            <Box sx={{ width: "60%", height: "400px", display:'flex', alignItems: "center", justifyContent: "center"}}>
                <Radar data={chartData} options={options}/>
            </Box>
            </Drawer>
        </>
    )};

export default ProfessorStats