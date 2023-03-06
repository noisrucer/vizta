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
import Overview from "./Overview";
import PropTypes from "prop-types";
import CourseInfo from "./CourseInfo";
import YearlyTrend from "./YearlyTrend";
import ProfessorStats from "./ProfessorStats";

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
  const params = useParams();
  const baseURL = "https://vizta.onrender.com";
  const [isOverview, setIsOverview] = useState(true);
  const [numReviews, setNumReviews] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const courseId = params.courseId;
  const navigate = useNavigate();

  const { UserToken, UserData } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;

  const [selectYear, setSelectYear] = useState([]);
  const [selectProfessor, setSelectProfessor] = useState([]);

  const [courseDescription, setCourseDescription] = useState({
    CourseID: "",
    Description: "",
    Faculty: "",
    GradingRatio: {},
    Name: "",
    Timetable: {},
  });

  const [isFavorite, setIsFavorite] = useState(false);

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [value, setValue] = useState(0);

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

  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedProfessor, setSelectedProfessor] = useState("All");

  useEffect(() => {
    // get request from courseInfo, courseDescription, available year and professor, favorites
    // const fetchCourseData = async () => {
    //   axios
    //     .request({
    //       method: "get",
    //       url: `${baseURL}/visualization/${courseId}`,
    //       headers: userToken["headers"],
    //     })
    //     .then((response) => {
    //       console.log("response.data.GPA.values: ", response.data.GPA.values);
    //       console.log(
    //         "response.data.LectureDifficulty.values: ",
    //         response.data.LectureDifficulty.values
    //       );
    //       setGPA({
    //         ...GPA,
    //         datasets: [
    //           {
    //             label: "# Students",
    //             data: response.data.GPA.values,
    //             backgroundColor: dataColor,
    //           },
    //         ],
    //       });
    //       setLectureDifficulty({
    //         ...lectureDifficulty,
    //         datasets: [
    //           {
    //             label: "# Students",
    //             data: response.data.LectureDifficulty.values,
    //             backgroundColor: dataColor,
    //           },
    //         ],
    //       });
    //       setFinalDifficulty({
    //         ...finalDifficulty,
    //         datasets: [
    //           {
    //             label: "# Students",
    //             data: response.data.FinalDifficulty.values,
    //             backgroundColor: dataColor,
    //           },
    //         ],
    //       });
    //       setWorkload({
    //         ...workload,
    //         datasets: [
    //           {
    //             label: "# Students",
    //             data: response.data.Workload.values,
    //             backgroundColor: dataColor,
    //           },
    //         ],
    //       });
    //       const teachingQuality = response.data.LectureQuality;
    //       setDelivery(
    //         calculateAverage(
    //           teachingQuality.Delivery.keys,
    //           teachingQuality.Delivery.values
    //         )
    //       );
    //       setEntertaining(
    //         calculateAverage(
    //           teachingQuality.Entertainment.keys,
    //           teachingQuality.Entertainment.values
    //         )
    //       );
    //       setInteractivity(
    //         calculateAverage(
    //           teachingQuality.Interactivity.keys,
    //           teachingQuality.Interactivity.values
    //         )
    //       );
    //       setOverallTeachingQuality(
    //         calculateOverallAverage(
    //           calculateAverage(
    //             teachingQuality.Delivery.keys,
    //             teachingQuality.Delivery.values
    //           ),
    //           calculateAverage(
    //             teachingQuality.Entertainment.keys,
    //             teachingQuality.Entertainment.values
    //           ),
    //           calculateAverage(
    //             teachingQuality.Interactivity.keys,
    //             teachingQuality.Interactivity.values
    //           )
    //         )
    //       );
    //       setPentagon({
    //         ...pentagon,
    //         datasets: [
    //           {
    //             label: "Overall Score",
    //             data: [
    //               response.data.Pentagon.FinalDifficulty,
    //               response.data.Pentagon.GPA * (5.0 / 4.3),
    //               response.data.Pentagon.LectureDifficulty,
    //               response.data.Pentagon.LectureQuality,
    //               response.data.Pentagon.Workload,
    //             ],
    //           },
    //         ],
    //       });
    //       const sum = [
    //         response.data.Pentagon.FinalDifficulty,
    //         (response.data.Pentagon.GPA * 5.0) / 4.3,
    //         response.data.Pentagon.LectureDifficulty,
    //         response.data.Pentagon.LectureQuality,
    //         response.data.Pentagon.Workload,
    //       ].reduce((acc, curr) => acc + Math.round(curr * 100) / 100, 0);
    //       setOverallScore(Math.round((sum / 5) * 10));
    //       setConditionalPentagon({
    //         ...conditionalPentagon,
    //         datasets: [
    //           {
    //             label: "Overall Score",
    //             data: [
    //               response.data.Pentagon.FinalDifficulty,
    //               (response.data.Pentagon.GPA * 5.0) / 4.3,
    //               response.data.Pentagon.LectureDifficulty,
    //               response.data.Pentagon.LectureQuality,
    //               response.data.Pentagon.Workload,
    //             ],
    //           },
    //         ],
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("error from /visualization/course_id: ", error);
    //     });
    // };
    // fetchCourseData();

    // const fecthCourseGeneralInfo = async () => {
    //   axios
    //     .request({
    //       method: "get",
    //       url: `${baseURL}/visualization/${courseId}/general_info`,
    //       headers: userToken["headers"],
    //     })
    //     .then((response) => {
    //       setCourseDescription(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(
    //         "error from /visualization/course_id/general_info: ",
    //         error
    //       );
    //     });
    // };
    // fecthCourseGeneralInfo();

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
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: { xs: "20px", md: "30px" },
        paddingRight: { xs: "20px", md: "30px" },
        height: { xs: "100%", lg: "85vh" },
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
              variant="outlined"
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
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Course Information"
              {...a11yProps(1)}
              onClick={() => {
                setIsOverview(false);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Yearly Trend"
              {...a11yProps(2)}
              onClick={() => {
                setIsOverview(false);
              }}
              sx={{ fontSize: { xs: "10px", md: "12px" } }}
            />
            <Tab
              label="Professor Statistics"
              {...a11yProps(3)}
              onClick={() => {
                setIsOverview(false);
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
          </Stack>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview></Overview>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CourseInfo description={courseDescription} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <YearlyTrend />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ProfessorStats />
      </TabPanel>
    </Box>
  );
};
export default Visualization;
