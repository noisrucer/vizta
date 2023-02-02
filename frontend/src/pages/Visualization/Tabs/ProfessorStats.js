import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import{ Radar } from 'react-chartjs-2';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;


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
          color: "grey"
        },
        grid: {
          color: "grey"
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

    const [chartData, setChartData] = useState({
      labels: ['Lecture Difficulty', 'Final Difficulty', 'Workload', 'Lecture Quality', 'GPA'],
      datasets: []
    });

    const [profList, setProfList] = useState({})

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
              setProfList(Object.keys(profData))
              console.log("profList: ", profList);
              const tempData = [];
              for (const key in profData) {
                const newDataset = { 
                  label: key, 
                  data: [profData[key].LectureDifficulty, profData[key].FinalDifficulty, profData[key].Workload, profData[key].LectureQuality, profData[key].GPA]
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
    const [state, setState] = useState({
      "Zhao Hengshuang": false,
      "Lo Yu Sum": false,
      "Kong Lingpeng": false,
      "Yu Y Z": false
    });

    function renderSwitch(prof){
    
      const handleChange = (event) => {
        console.log("what: ", Object.keys(state))
        console.log(event)
        setState({
          ...state, 
          [event.target.name]: true
        });
      };

      const label = { inputProps: { 'aria-label': 'Switch demo' } };

      console.log("state: ", state)
    
      return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch {...label} checked={state} onClick={handleChange} name={prof.label} />
              }
              label={prof.label}
            />
          </FormGroup>
      )
    };
  
    return (
        <Box sx={{width: "180%", height:"520px", display: 'flex', flexDirection: "row", justifyContent: 'space-evenly'}}>
            <Box sx={{width:"520px", height:"520px"}}>
                <Radar data={chartData} options={options}/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "520px"}}>
              <FormControl component="fieldset" variant="standard">
                {chartData.datasets.map((item) => {
                  return renderSwitch(item)
                })}
              </FormControl>
            </Box>
        </Box>
    )};

export default ProfessorStats