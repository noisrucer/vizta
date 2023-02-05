import {useState, useEffect, useContext} from 'react';
import { UserContext } from '../../../UserContext';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
import LineChart from '../Charts/LineChart';
import TextField from '@mui/material/Textfield';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const baseURL = 'http://127.0.0.1:8000';

const drawerBleeding = 56;

const chartBorderColor = ["#36A2EB", "#FF6384", "#FF9F3F", "#FFCD56"]
const chartBackgroundColor = ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 63, 0.5)', 'rgba(255, 205, 86, 0.5)']

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

    const [conditionalChartData, setConditionalChartData] = useState(chartData)

    useEffect(() => {
      const getYearlyTrend = async () => {
        axios.request({
            method: 'get',
            url: `${baseURL}/visualization/${courseId}/by_years`,
            headers: userToken['headers']
        })
        .then(response => {
            const yearData = response.data;
            const tempData = [];
            let count = 0;
            setProfessorList(yearData.professors);

            yearData.professors.map((item, index) => {

              const newDataSet = {
                label: item,
                data: yearData.FinalExamDifficulty[index],
                borderColor: chartBorderColor[count],
                backgroundColor: chartBackgroundColor[count]
              };
              tempData.push(newDataSet);
              count += 1;
            });
            if (tempData.length > Object.keys(yearData.professors).length - 1){
              setChartData({...chartData, labels: yearData.years, datasets: tempData});
              setConditionalChartData({...conditionalChartData, labels: yearData.years})
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
          let count = 0;
          yearData.professors.map((item, index) => {

            const newDataSet = {
              label: item,
              data: yearData[criteria][index],
              borderColor: chartBorderColor[count],
              backgroundColor: chartBackgroundColor[count]
            };
            tempData.push(newDataSet);
            count += 1;
          });
          if (tempData.length > Object.keys(yearData.professors).length - 1) {
            setChartData({...chartData, labels: yearData.years, datasets: tempData});
          }
      })
      .catch(error => {
          console.log("error from /visualization/course_id/by_years: ", error)
      })
    }

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
            <FormControlLabel sx={{width: "250px"}}
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
      <Box sx={{marginLeft: 10, width: "100%", height: "520px", display: "flex", alignItems: "center"}}>
          <TextField 
            id="select-view"
            select
            variant="standard"
            label="Select Criteria"
            defaultValue="Final Exam"
            sx={{position: "absolute", left: 870, top: 180, width: "150px"}}
            >
            {criteria.map((option) => (
              <MenuItem key={option.label} value={option.label} onClick={() => changeCriteria(option.value, option.label)}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        <Box
          sx={{bgcolor: '#1D2630', marginRight: 5, display:"flex", flexDirection: "column", alignItems: 'center', height: 520 }}
        >
          <h2>{title}</h2>
          <Box sx={{height: "520px", width: "1000px", marginLeft: -10}}>
            <LineChart chartData={conditionalChartData} />
          </Box>
        </Box>
        <Box sx={{marginLeft: 10}}>
          {chartData.datasets.map((item) => {
            return renderSwitch(item)
          })}
        </Box>
      </Box>
    )};

    export default YearlyTrend;