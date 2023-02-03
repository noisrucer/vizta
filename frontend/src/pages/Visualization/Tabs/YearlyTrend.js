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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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

const YearlyTrend = () => {
    
    const params = useParams()
    const courseId = params.courseId

    const {UserToken} = useContext(UserContext)
    const [userToken, setUserToken] = UserToken

    const [isOpen, setIsOpen] = useState(false);
    const [isCriteria, setIsCriteria] = useState(true);

    const [professorList, setProfessorList] = useState([]);

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

    const [chartDataProfessor, setChartDataProfessor] = useState({
      labels: [],
      datasets: []
    })

    useEffect(() => {

      if (!isCriteria) {
        axios.request({
          method: 'get',
          url: `${baseURL}/visualization/${courseId}/by_years`,
          headers: userToken['headers']
        })
        .then(response => {
          const yearData = response.data;

          console.log("YearData in yearprof: ", yearData);

          const fed = {
            label: "Final Exam Difficulty",
            data: yearData.FinalExamDifficulty[0]
          };
          const gpa = {
            label: "GPA",
            data: yearData.GPA[0]
          };
          const ld = {
            label: "Lecture Difficulty",
            data: yearData.LectureDifficulty[0]
          };
          // const tq = {
          //   label: "Teaching Quality",
          //   data: yearData.TeachingQuality[0]
          // };
          const w = {
            label: "Workload",
            data: yearData.Workload[0]
          };

          const tempData = [fed, gpa, ld, w];

          setChartDataProfessor({...chartDataProfessor, 
            labels: yearData.years,
            datasets: tempData
            });

        })
        .catch(error => {
            console.log("error from /visualization/course_id/by_years: ", error)
        })
        console.log("professor List: ", professorList)
      }
    },[isCriteria])

    const handleProfessorClick = (index) => {
      axios.request({
        method: 'get',
        url: `${baseURL}/visualization/${courseId}/by_years`,
        headers: userToken['headers']
      })
      .then(response => {
        const yearData = response.data;

        console.log("YearData in yearprof: ", yearData);

        const fed = {
          label: "Final Exam Difficulty",
          data: yearData.FinalExamDifficulty[index]
        };
        const gpa = {
          label: "GPA",
          data: yearData.GPA[index]
        };
        const ld = {
          label: "Lecture Difficulty",
          data: yearData.LectureDifficulty[index]
        };
        // const tq = {
        //   label: "Teaching Quality",
        //   data: yearData.TeachingQuality[0]
        // };
        const w = {
          label: "Workload",
          data: yearData.Workload[index]
        };

        const tempData = [fed, gpa, ld, w];

        setChartDataProfessor({...chartDataProfessor, 
          labels: yearData.years,
          datasets: tempData
          });

      })
      .catch(error => {
          console.log("error from /visualization/course_id/by_years: ", error)
      })
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    console.log("byYear chartData: ", chartData);
    console.log("by year chartDataProfessor: ", chartDataProfessor);
    console.log("professorList: ", professorList);

    return (
      <Box sx={{width: "250%", height: "520px"}}>
          <TextField 
            id="select-view"
            select
            variant="standard"
            label="Select Criteria"
            defaultValue="Final Exam"
            sx={{position: "absolute", left: 1260, top: 110, width: "128px"}}
            >
            {criteria.map((option) => (
              <MenuItem key={option.label} value={option.label} onClick={() => changeCriteria(option.value)}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        <Box
          sx={{ flexGrow: 1, bgcolor: '#1D2630', display: 'flex', height: 520 }}
        > { isCriteria ?
          <Box sx={{height: "520px", width: "1200px"}}>
            <LineChart chartData={isCriteria ? chartData : chartDataProfessor} />
          </Box>
          : 
          <>
            <Box sx={{ marginLeft: 10, marginRight: 10, height: "520px", display: "flex", alignItems: "center"}}>
              <Stack direction='column' spacing={2} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                {
                  professorList.map((item, index) => (
                    <Button onClick={() => handleProfessorClick(index)}>{item}</Button>
                  ))
                }
              </Stack>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifycontent: 'center', 
              width: "1200px", 
              height: "520px",
              }}>
                <LineChart chartData={isCriteria ? chartData : chartDataProfessor} />
            </Box>
          </> 
          }
        </Box>
      </Box>
    )};

    export default YearlyTrend;