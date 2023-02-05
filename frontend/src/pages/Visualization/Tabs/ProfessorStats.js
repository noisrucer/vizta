import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import{ Radar } from 'react-chartjs-2';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;

const chartBorderColor = ["#36A2EB", "#FF6384", "#FF9F3F", "#FFCD56"]
const chartBackgroundColor = ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 63, 0.5)', 'rgba(255, 205, 86, 0.5)']


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
      suggestedMax: 5,
      pointLabels: {
        fontSize: 30
      }
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
          font: {
            size: 12
          },
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

    const [conditionalChartData, setConditionalChartData] = useState({
      labels: ['Lecture Difficulty', 'Final Difficulty', 'Workload', 'Lecture Quality', 'GPA'],
      datasets: []
    })

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
              setProfList(Object.keys(profData))
              const tempData = [];
              let count = 0;
              for (const key in profData) {
                const newDataset = { 
                  label: key, 
                  data: [profData[key].LectureDifficulty, profData[key].FinalDifficulty, profData[key].Workload, profData[key].LectureQuality, profData[key].GPA],
                  borderColor: chartBorderColor[count],
                  backgroundColor: chartBackgroundColor[count]
                };
                tempData.push(newDataset);
                count += 1;
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

    const initialState = chartData.datasets.reduce((acc, dataset) => {
      acc[dataset.label] = false;
      return acc;
    }, {});

    initialState[Object.keys(initialState)[0]] = true;
    initialState[Object.keys(initialState)[1]] = true;

    const [state, setState] = useState(initialState);
    const [switchClicked, setSwitchClicked] = useState(false)

    useEffect(() => {
      setState(initialState);
    }, [chartData]);


    function renderSwitch(prof){
    
      const handleChange = (event) => {
        setSwitchClicked(true);
        setState({
          ...state, 
          [event.target.name]: !state[event.target.name]
        });
      };

      const label = { inputProps: { 'aria-label': 'Switch demo' } };
    
      return (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch {...label} checked={state[prof.label]} onClick={handleChange} name={prof.label} />
              }
              label={prof.label}
            />
          </FormGroup>
      )
    };

    useEffect(() => {
      let temp = [];
      for (const key in state){
        if (state[key] === true){
          for (const data in chartData.datasets){
            if (chartData.datasets[data].label === key) {
              temp.push(chartData.datasets[data])
            }
          }
        }
      }
      setConditionalChartData({...conditionalChartData, datasets: temp});
    },[state])
  
    return (
      <Box sx={{diaplay: "flex", flexDirection: "column", alignItems: "center"}}>
        {/* <Box sx={{width: "180%", marginLeft: -20, display: "flex", justifyContent: "center"}}>
          <h1>Overall</h1>
        </Box> */}
        <Box sx={{width: "180%", height:"540px", display: 'flex', flexDirection: "row", justifyContent: 'center'}}>
          <Box sx={{marginRight: 10, width:"570px", height:"570px"}}>
            <Radar data={ conditionalChartData } options={options}/>
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "520px"}}>
            <FormControl component="fieldset" variant="standard">
              {chartData.datasets.map((item) => {
                return renderSwitch(item)
              })}
            </FormControl>
          </Box>
        </Box>
      </Box>
    )};

export default ProfessorStats