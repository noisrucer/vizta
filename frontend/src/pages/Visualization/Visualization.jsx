import { useEffect, useContext, useState, forwardRef } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Switch from "@mui/material/Switch";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "../../components/Snackbar";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import {
  Heading32,
  ContentWrap,
} from "../../components/GlobalStyledComponents";
import Overview from "./Tabs/Overview";
import PropTypes from "prop-types";
import CourseInfo from "./Tabs/CourseInfo";
import YearlyTrend from "./Tabs/YearlyTrend";
import ProfessorStats from "./Tabs/ProfessorStats";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const baseURL = process.env.REACT_APP_BASEURL;

const dataColor = ["#50B19E", "#5772B3", "#F4BA41", "#EC8B33", "#DF6E53"];

const criteria = [
  {
    value: "FinalExamDifficulty",
    label: "Final Exam",
  },
  {
    value: "GPA",
    label: "GPA",
  },
  {
    value: "LectureDifficulty",
    label: "Lecture Difficulty",
  },
  {
    value: "CourseDelivery",
    label: "Delivery",
  },
  {
    value: "CourseEntertainment",
    label: "Entertainment",
  },
  {
    value: "CourseInteractivity",
    label: "Interactivity",
  },
  {
    value: "Workload",
    label: "Workload",
  },
];

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ height: "100%" }}
    >
      {value === index && (
        <Box sx={{ height: "100%" }}>
          {children}
          {/* <Typography sx={{ height: "90%" }}>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Visualization = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { UserToken, UserData } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;

  const [selectYear, setSelectYear] = useState([]);
  const [selectProfessor, setSelectProfessor] = useState([]);

  const [isOverview, setIsOverview] = useState(true);
  const [isYearlyTrend, setIsYearlyTrend] = useState(false);
  const [numReviews, setNumReviews] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedProfessor, setSelectedProfessor] = useState("All");

  const [overviewData, setOverviewData] = useState({
    TotalNumReviews: 0,
    GPA: [
      {
        group: "A group",
        "A+": 0,
        "A+Color": "hsl(132, 70%, 50%)",
        A: 0,
        AColor: "hsl(85, 70%, 50%)",
        "A-": 0,
        "A-Color": "hsl(237, 70%, 50%)",
      },
      {
        group: "B group",
        "B+": 0,
        "B+Color": "hsl(132, 70%, 50%)",
        B: 0,
        BColor: "hsl(85, 70%, 50%)",
        "B-": 0,
        "B-Color": "hsl(237, 70%, 50%)",
      },
      {
        group: "C group",
        "C+": 0,
        "C+Color": "hsl(132, 70%, 50%)",
        C: 0,
        CColor: "hsl(85, 70%, 50%)",
        "C-": 0,
        "C-Color": "hsl(237, 70%, 50%)",
      },
      {
        group: "D group",
        "D+": 0,
        "D+Color": "hsl(132, 70%, 50%)",
        D: 0,
        DColor: "hsl(85, 70%, 50%)",
      },
      {
        group: "Fail",
        F: 0,
        FColor: "hsl(132, 70%, 50%)",
      },
    ],
    LectureDifficulty: [
      {
        group: "Very Easy",
        VeryEasy: 0,
        VeryEasyColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Easy",
        Easy: 0,
        EasyColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Medium",
        Medium: 0,
        MediumColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Difficult",
        Difficult: 0,
        DifficultColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Very Difficult",
        VeryDifficult: 0,
        VeryDifficultColor: "hsl(132, 70%, 50%)",
      },
    ],
    FinalDifficulty: [
      {
        group: "Very Easy",
        VeryEasy: 0,
        VeryEasyColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Easy",
        Easy: 0,
        EasyColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Medium",
        Medium: 0,
        MediumColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Difficult",
        Difficult: 0,
        DifficultColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Very Difficult",
        VeryDifficult: 0,
        VeryDifficultColor: "hsl(132, 70%, 50%)",
      },
    ],
    Workload: [
      {
        group: "Very Light",
        VeryLight: 0,
        VeryLightColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Light",
        Light: 0,
        LightColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Medium",
        Medium: 0,
        MediumColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Heavy",
        Heavy: 0,
        HeavyColor: "hsl(132, 70%, 50%)",
      },
      {
        group: "Very Heavy",
        VeryHeavy: 0,
        VeryHeavyColor: "hsl(132, 70%, 50%)",
      },
    ],
    LectureQuality: {
      Entertainment: 0,
      Delivery: 0,
      Interactivity: 0,
    },
    Badges: {
      LectureDifficulty: "HELL",
      FinalDifficulty: "CUTE",
      Workload: "CUTE",
      GPA: "Avg: C",
    },
    Pentagon: [
      {
        Pentagon: "OverallScore",
        GPA: 0,
        LectureDifficulty: 0,
        FinalDifficulty: 0,
        Workload: 0,
        LectureQuality: 0,
      },
    ],
    Timetable: null,
  });

  const [courseDescription, setCourseDescription] = useState({
    CourseID: "",
    Description: "",
    Faculty: "",
    GradingRatio: {},
    Name: "",
    Timetable: {},
  });

  const [yearlyTrends, setYearlyTrends] = useState({});

  const [profStats, setProfStats] = useState({});

  const [isFavorite, setIsFavorite] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  axios
    .request({
      // checks reviewed status
      method: "get",
      url: `${baseURL}/users/check-reviewed/${userData}/${courseId}`,
      headers: userToken["headers"],
    })
    .then((response) => {
      console.log("has reviewed: ", response.data);
      setHasReviewed(response.data);
    });

  const handleFavoriteClick = () => {
    setOpen(true);
    const data = {
      email: userData,
      course_id: courseId,
    };
    if (isFavorite === false) {
      const addFavorite = async () => {
        axios
          .request({
            method: "post",
            url: `${baseURL}/courses/favorite`,
            data,
            headers: userToken["headers"],
          })
          .then((response) => {
            console.log("response from /courses/favorite: ", response);
          })
          .catch((error) => {
            console.log("error in addFavorite: ", error);
          });
      };
      addFavorite();
      setAlertMessage("Successfully added to favorites!");
    } else {
      const deleteFavorite = async () => {
        axios
          .request({
            method: "delete",
            url: `${baseURL}/courses/favorite/${userData}/${courseId}`,
            headers: userToken["headers"],
          })
          .then((response) => {
            console.log(
              "response from /courses/favorite/email/courses delete: ",
              response
            );
          })
          .catch((error) => {
            console.log("error in delete favorite: ", error);
          });
      };
      deleteFavorite();
      setAlertMessage("Successfully removed from favorites!");
    }
    setIsFavorite(!isFavorite);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // get request from courseInfo, courseDescription, available year and professor, favorites
    const fetchCourseData = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/visualization/${courseId}`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setOverviewData(response.data);
          setNumReviews(response.data.TotalNumReviews);
        })
        .catch((error) => {
          console.log("error from /visualization/course_id: ", error);
        });
    };
    fetchCourseData();

    const fecthCourseGeneralInfo = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/visualization/${courseId}/general_info`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setCourseDescription(response.data);
        })
        .catch((error) => {
          console.log(
            "error from /visualization/course_id/general_info: ",
            error
          );
        });
    };
    fecthCourseGeneralInfo();

    const getAvailableYears = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/visualization/${courseId}/years`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setSelectYear(response.data);
        })
        .catch((error) => {
          console.log("error from /visualization/course_id/years: ", error);
        });
    };
    getAvailableYears();

    const getAvailableProfessors = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/visualization/${courseId}/professors`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setSelectProfessor(response.data);
        })
        .catch((error) => {
          console.log(
            "error from /visualization/course_id/professors: ",
            error
          );
        });
    };
    getAvailableProfessors();

    const getFavorites = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/users/check-favorite/${userData}/${courseId}`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setIsFavorite(response.data.isFavorite);
        })
        .catch((error) => {
          console.log("error from /users/check-favorites: ", error);
        });
    };
    getFavorites();

    const getYearlyTrends = async () => {
      axios.request({
        method: "get",
        url: `${baseURL}/visualization/${courseId}/by_years`,
        headers: userToken["headers"],
      }).then((response) => {
        setYearlyTrends(response.data)
      }).catch((error) => {
        navigate("/sign-in")
      })
    };
    getYearlyTrends();

    const getProfStats = async () => {
      axios
        .request({
          method: "get",
          url: `${baseURL}/visualization/${courseId}/by_professors`,
          headers: userToken["headers"],
        })
        .then((response) => {
          setProfStats(response.data)
        })
        .catch((error) => {
          console.log(
            "error from /visualization/course_id/by_professors: ",
            error
          );
        });
    };
    getProfStats();
  }, []);

  useEffect(() => {
    // render component again when select year
    const formatProfessor = selectedProfessor.replace(/ /g, "%20");
    let path = "";
    if (selectedYear !== "All" && selectedProfessor !== "All") {
      path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}&professor=${formatProfessor}`;
    } else if (selectedYear !== "All" && selectedProfessor === "All") {
      path = `${baseURL}/visualization/${courseId}/?year=${selectedYear}`;
    } else if (selectedYear === "All" && selectedProfessor !== "All") {
      path = `${baseURL}/visualization/${courseId}/?professor=${formatProfessor}`;
    } else {
      path = `${baseURL}/visualization/${courseId}`;
    }
    const refreshCourseData = async () => {
      // request sent everytime user clicks the select textfield option with different values, change GPA, LectrueQuality, LectureDifficulty, FinalDifficulty, Workload, and pentagon values
      axios
        .request({
          method: "get",
          url: path,
          headers: userToken["headers"],
        })
        .then((response) => {
          setOverviewData(response.data);
          setNumReviews(response.data.TotalNumReviews); // also, number of reviews update upon year and professor change
        })
        .catch((error) => {
          console.log("error from courseInfo with select year, prof: ", error);
        });
    };
    refreshCourseData();
  }, [selectedYear, selectedProfessor]);

  const [selectedCriteria, setSelectedCriteria] = useState("FinalExamDifficulty")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: { xs: "20px", md: "30px" },
        paddingRight: { xs: "20px", md: "30px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "center",
          marginBottom: { xs: "10px", sm: "-5px" },
        }}
      >
        <Heading32>
          <span style={{ color: colors.greenAccent[400] }}>{courseId} </span>
          <span>/ {courseDescription.Name}</span>
        </Heading32>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: { xs: 0, sm: "auto" },
          }}
        >
          {isOverview ? (
            <span style={{ marginRight: "10px", color: colors.grey[100] }}>
              Total Reviews: {numReviews}
            </span>
          ) : (
            <></>
          )}
          <IconButton onClick={handleFavoriteClick} sx={{ marginRight: 1 }}>
            {isFavorite ? (
              <FavoriteIcon
                sx={{ color: colors.greenAccent[400], fontSize: 24 }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ color: colors.greenAccent[400], fontSize: 24 }}
              />
            )}
          </IconButton>
          {hasReviewed ? (
            <Button
              variant="contained"
              disabled
              sx={{
                bgcolor: `${colors.greenAccent[500]}`,
                ":hover": {
                  bgcolor: `${colors.greenAccent[600]}`,
                },
              }}
              onClick={() => navigate(`/review/${params.courseId}`)}
            >
              Add review
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate(`/review/${params.courseId}`)}
            >
              Add review
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: colors.primary[400],
            width: { xs: "100%", lg: "65%" },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Overview"
              {...a11yProps(0)}
              onClick={() => {
                setIsOverview(true);
                setIsYearlyTrend(false);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Course Information"
              {...a11yProps(1)}
              onClick={() => {
                setIsOverview(false);
                setIsYearlyTrend(false);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Yearly Trend"
              {...a11yProps(2)}
              onClick={() => {
                setIsOverview(false);
                setIsYearlyTrend(true);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Professor Statistics"
              {...a11yProps(3)}
              onClick={() => {
                setIsOverview(false);
                setIsYearlyTrend(false);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
          </Tabs>
        </AppBar>
        <Box sx={{ marginTop: { xs: 2, lg: 0 } }}>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              display: "flex",
            }}
          >
            {isOverview ? (
              <>
                <TextField
                  id="get-by-year"
                  select
                  label="Select Year"
                  variant="standard"
                  color="secondary"
                  defaultValue={selectedYear}
                  sx={{
                    width: "130px",
                    marginLeft: "auto",
                    "& label.Mui-focused": {
                      color: `${colors.greenAccent[500]}`,
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: `${colors.greenAccent[500]}`,
                      },
                    },
                  }}
                >
                  {selectYear.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      onClick={() => setSelectedYear(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="get-by-professor"
                  select
                  label="Select Professor"
                  variant="standard"
                  defaultValue={selectedProfessor}
                  color="secondary"
                  sx={{
                    width: "130px",
                    marginLeft: "auto",
                    "& label.Mui-focused": {
                      color: `${colors.greenAccent[500]}`,
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: `${colors.greenAccent[500]}`,
                      },
                    },
                  }}
                >
                  {selectProfessor.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      onClick={() => setSelectedProfessor(option)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              <></>
            )}
            {isYearlyTrend ? (
              <>
                <TextField
                  id="select-view"
                  select
                  variant="standard"
                  label="Select Criteria"
                  defaultValue="Final Exam"
                  color="secondary"
                  sx={{
                    width: "130px",
                    marginLeft: "auto",
                    "& label.Mui-focused": {
                      color: `${colors.greenAccent[500]}`,
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: `${colors.greenAccent[500]}`,
                      },
                    },
                  }}
                >
                  {criteria.map((option) => (
                    <MenuItem
                      key={option.label}
                      value={option.label}
                      onClick={() => setSelectedCriteria(option.value)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      </Box>
      <Box height="100%" marginBottom={2}>
        <TabPanel value={value} index={0}>
          <Overview data={overviewData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CourseInfo description={courseDescription} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <YearlyTrend data={yearlyTrends[selectedCriteria]} profList={profStats.key} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ProfessorStats data={profStats.data} profList={profStats.key} />
        </TabPanel>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
export default Visualization;
