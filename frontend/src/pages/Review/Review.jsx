import React from "react";

import Box from "@mui/material/Box";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Divider from "@mui/material/Divider";
import "typeface-roboto";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import FormHelperText from "@mui/material/FormHelperText";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";

import { SnackbarProvider, useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { H1Heading32 } from "../../components/GlobalStyledComponents";

const baseURL = "https://vizta.onrender.com";

const indents = 12;

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 20,
}));

const PrettoSlider = styled(Slider)({
  // color: "secondary",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    // backgroundColor: "secondary",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const GradeList = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];

class ReviewTopBar extends React.Component {
  render() {
    return (
      <Box
        sx={{
          display: "flex",
          minWidth: 275,
          marginTop: "10px",
          mx: indents,
          flexDirection: "column",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="stretch">
          <Grid item>
            {/*<h4 style={{*/}
            {/*  fontFamily: "Roboto",*/}
            {/*  color: "#C8FFF4",*/}
            {/*  marginBottom: 30*/}
            {/*}}>*/}
            {/*  Create an review*/}
            {/*</h4>*/}
            <H1Heading32
              style={{
                fontFamily: "Roboto",
                color: this.props.colors.primary[100],
              }}
            >
              {this.props.course_id} / {this.props.course_title}
            </H1Heading32>
            {/*<h1 style={{*/}
            {/*  fontFamily: "Roboto",*/}
            {/*  color: "white"*/}
            {/*}}>*/}
            {/*  {this.props.course_title}*/}
            {/*</h1>*/}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

function VariableNameCapitalize(name) {
  return String(name)
    .split("_")
    .map((s) => s.capitalize())
    .join(" ");
}

function MergeDict(d1, d2) {
  return Object.assign({}, d1, d2);
}

function isInt(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

class ReviewSection extends React.Component {
  constructor(props) {
    let lLabel = "";
    if ("lLabel" in props) {
      lLabel = props.lLabel;
    }

    let rLabel = "";
    if ("rLabel" in props) {
      rLabel = props.rLabel;
    }

    let max = 5;
    if ("max" in props) {
      max = props.max;
    }

    let min = 1;
    if ("min" in props) {
      min = props.min;
    }

    let step = 1;
    if ("step" in props) {
      step = props.step;
    }

    super(props);

    this.state = {
      max: max,
      min: min,
      lLabel: lLabel,
      rLabel: rLabel,
      step: step,
      ...this.props.reviewItems.reduce(
        (a, b) => ((a[b] = this.props.itemValues[b] || 0), a),
        {}
      ),
    };
  }

  render() {
    const label = this.state.lLabel !== "" && this.state.rLabel !== "";

    const card = (
      <CardContent sx={{}}>
        <Typography
          sx={{ color: this.props.colors.primary[100] }}
          variant="h3"
          component="div"
        >
          {this.props.title}
        </Typography>
        <Box sx={{ my: 4 }}>
          {this.props.reviewItems.map((v, i) => (
            <Grid
              sx={{ my: 1 }}
              container
              spacing={4}
              alignItems="center"
              key={i}
            >
              <Grid item xs="3" sx={{ color: this.props.colors.primary[100] }}>
                {VariableNameCapitalize(v)}
              </Grid>
              {label ? (
                <Grid
                  item
                  xs="2"
                  sx={{ color: this.props.colors.primary[100] }}
                >
                  {this.state.lLabel}
                </Grid>
              ) : null}
              <Grid item xs={label ? 4 : 9}>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  value={this.state[v]}
                  step={this.state.step}
                  marks
                  min={this.state.min}
                  max={this.state.max}
                  onChange={(e, nv) => {
                    this.setState(
                      MergeDict(this.state, {
                        [v]: this.props.valueCheck(v, nv),
                      })
                    );
                  }}
                  onChangeCommitted={(e, nv) => {
                    this.props.handleValueChange(v, nv);
                  }}
                  color="secondary"
                />
              </Grid>
              {label ? (
                <Grid
                  item
                  xs="2"
                  sx={{ color: this.props.colors.primary[100] }}
                >
                  {this.state.rLabel}
                </Grid>
              ) : null}
            </Grid>
          ))}
        </Box>
      </CardContent>
    );

    const boxStyle = { my: 3, width: 800 };
    return (
      <Item sx={boxStyle} backgroundColor={this.props.colors.primary[400]}>
        {card}
      </Item>
    );
  }
}

function SubmitReview(data, userToken, enqueueSnackbar, onSuccess) {
  console.log(data);

  axios
    .request({
      method: "post",
      url: `${baseURL}/courses/review`,
      data: data,
      headers: userToken["headers"],
    })
    .then((response) => {
      console.log(response);
      enqueueSnackbar("Your review has been submitted!", {
        autoHideDuration: 5000,
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      onSuccess();
    })
    .catch((err) => {
      var reason = "Reason here";

      enqueueSnackbar(
        <div>
          Failed to submit review <br />
          {/* {reason} */}
        </div>,
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
      console.log(err);
    });
}

class SubclassSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      year: new Date().getFullYear(),
      semester: 0,
      subclass: "",
      subclasses: [],
    };
  }

  updateSubclasses(year, semester) {
    axios
      .request({
        method: "get",
        url: `${baseURL}/courses/subclasses/${this.props.course_id}?academic_year=${year}&semester=${semester}`,
        headers: this.props.userToken["headers"],
      })
      .then((response) => {
        this.setState({
          init: false,
          subclasses: response.data.map((e) => {
            return {
              label: e["professor_name"],
              subclass_id: e["subclass_id"],
            };
          }),
        });
      })
      .catch((error) => {
        console.log("error fromerror from /courses/subclasses: ", error);
      });
  }

  render() {
    return (
      <Box
        key="Subclass Detail"
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          marginBottom: "10px",
          height: "300px",
        }}
      >
        <TextField
          width="100px"
          id="outlined-helperText"
          sx={{ marginBottom: 2 }}
          label="Year"
          type="number"
          color="secondary"
          onChange={(e) => {
            if (e.target.value === "") return;
            let value = e.target.value;
            value = Math.max(
              0,
              Math.min(parseInt(value, 10), new Date().getFullYear())
            );
            this.setState(MergeDict(this.state, { year: value }));
            this.updateSubclasses(value, this.state.semester);
            this.props.handleValueChange("academic_year", value);
          }}
          defaultValue={this.state.year}
        />
        <FormControl required>
          <InputLabel color="secondary">Semester</InputLabel>
          <Select
            width="100px"
            sx={{ marginBottom: 2 }}
            value={this.state.semester}
            label="Semester"
            color="secondary"
            onChange={(e) => {
              if (e.target.value === 0) return;
              this.setState(
                MergeDict(this.state, { semester: e.target.value })
              );
              this.updateSubclasses(this.state.year, e.target.value);
              this.props.handleValueChange("semester", e.target.value);
            }}
          >
            <MenuItem value={0}>
              <em>Not Specified</em>
            </MenuItem>
            <MenuItem value={1}>First semester</MenuItem>
            <MenuItem value={2}>Second semester</MenuItem>
          </Select>
        </FormControl>

        <Autocomplete
          onChange={(e, v) => {
            this.setState(MergeDict(this.state, { subclass: v.subclass_id }));
            this.props.handleValueChange("subclass_id", v.subclass_id);
          }}
          value={
            this.state.subclasses.find(
              (e) => e.subclass_id === this.state.subclass
            ) ?? ""
          }
          options={this.state.subclasses}
          width="100px"
          renderInput={(params) => (
            <TextField
              sx={{ marginBottom: 2 }}
              color="secondary"
              {...params}
              label="Professor"
            />
          )}
        />
        <FormControl>
          <InputLabel color="secondary">Subclass</InputLabel>
          <Select
            width="100px"
            value={this.state.subclass}
            label="Subclass"
            color="secondary"
            sx={{ marginBottom: 2 }}
            onChange={(e) => {
              this.setState(
                MergeDict(this.state, { subclass: e.target.value })
              );
              this.props.handleValueChange("subclass_id", e.target.value);
            }}
          >
            {this.state.subclasses.map((e) => (
              <MenuItem key={e.subclass_id} value={e.subclass_id}>
                {e.subclass_id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default function Review() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const params = useParams();
  const courseId = params.courseId;

  const { UserToken, UserData } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;

  const reviewList = [
    "workload",
    "lecture_difficulty",
    "final_exam_difficulty",
    "course_entertainment",
    "course_delivery",
    "course_interactivity",
    "final_exam_ratio",
    "midterm_ratio",
    "assignments_ratio",
    "project_ratio",
  ];

  const courseRatingSection = [
    "workload",
    "lecture_difficulty",
    "final_exam_difficulty",
  ];

  const lectureQualitySection = [
    "course_entertainment",
    "course_delivery",
    "course_interactivity",
  ];

  const gradeDistrSection = [
    "final_exam_ratio",
    "midterm_ratio",
    "assignments_ratio",
    "project_ratio",
  ];

  // FIXME: subclass_id, academic_year, semester
  const [ReviewData, setReviewData] = useState({
    email: userData,
    course_id: params.courseId,
    subclass_id: "A",
    academic_year: 2022,
    semester: 1,
    gpa: "F",
    ...reviewList.reduce(
      (a, b) => ((a[b] = b.endsWith("ratio") ? 0 : 1), a),
      {}
    ),
  });
  const [courseDescription, setCourseDescription] = useState({
    CourseID: "",
    Description: "",
    Faculty: "",
    GradingRatio: {},
    Name: "",
    Timetable: {},
  });

  const [ShowSubmitDialog, setShowSubmitDialog] = useState(false);

  useEffect(() => {
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
  }, []);

  // return value that fulfil all constraints
  function checkValue(key, value) {
    if (gradeDistrSection.includes(key)) {
      const maxValue =
        100 -
        gradeDistrSection
          .filter((x) => x !== key)
          .map((e) => ReviewData[e])
          .reduce((partialSum, a) => partialSum + a, 0);
      value = Math.max(0, Math.min(value, maxValue));
    }
    return value;
  }

  function AlterReviewData(key, value) {
    setReviewData(MergeDict(ReviewData, { [key]: checkValue(key, value) }));
  }

  const StepList = [
    "Subclass Detail",
    "Course Rating",
    "Lecture Quality Rating",
    "Course Grading Distribution",
    "Submit",
  ];

  const [ReviewStep, setReviewStep] = useState(0);

  return (
    <React.Fragment>
      <ReviewTopBar
        course_id={courseDescription.CourseID}
        course_title={courseDescription.Name}
        colors={colors}
      />

      <Stepper sx={{}} activeStep={ReviewStep} alternativeLabel>
        {StepList.map((label) => (
          <Step
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "secondary.dark", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "grey.500", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "secondary.main", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: colors.primary[100].light, // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "black", // circle's number (ACTIVE)
              },
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: 2, sm: 0 },
        }}
      >
        {
          [
            <SubclassSection
              userToken={userToken}
              course_id={courseDescription.CourseID}
              handleValueChange={AlterReviewData}
              onClose={() => setShowSubmitDialog(false)}
            />,
            <ReviewSection
              key="Course Rating"
              title="Course Rating"
              reviewItems={courseRatingSection}
              itemValues={ReviewData}
              lLabel="Hard"
              rLabel="Easy"
              valueCheck={checkValue}
              handleValueChange={AlterReviewData}
              colors={colors}
            />,
            <ReviewSection
              key="Lecture Quality Rating"
              title="Lecture Quality Rating"
              reviewItems={lectureQualitySection}
              itemValues={ReviewData}
              lLabel="Poor"
              rLabel="Exceptional"
              valueCheck={checkValue}
              handleValueChange={AlterReviewData}
              colors={colors}
            />,
            <ReviewSection
              key="Course Grading Distribution"
              title="Course Grading Distribution"
              reviewItems={gradeDistrSection}
              itemValues={ReviewData}
              min={0}
              max={100}
              step={5}
              valueCheck={checkValue}
              handleValueChange={AlterReviewData}
              colors={colors}
            />,
            <Box
              key="Final Grade"
              display="flex"
              sx={{ fontSize: 40 }}
              height={300}
              fullWidth
              alignItems="center"
              justifyContent="center"
            >
              <FormControl
                required
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="secondary"
              >
                <InputLabel color="secondary">Final Grade</InputLabel>
                <Select
                  sx={{ width: "20vw" }}
                  value={ReviewData["gpa"]}
                  label="Final Grade *"
                  color="secondary"
                  onChange={(e) => {
                    AlterReviewData("gpa", e.target.value);
                  }}
                >
                  {GradeList.map((e, i) => (
                    <MenuItem key={i} value={e}>
                      {e.length === 1 ? e : e[0] + " " + e[1]}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
            </Box>,
          ][ReviewStep]
        }
      </Box>

      <Box
        sx={{
          mx: indents,
          float: "right",
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Fab
          sx={{ marginRight: 3 }}
          variant="extended"
          disabled={ReviewStep === 0}
          onClick={() => setReviewStep(ReviewStep - 1)}
          backgroundColor="red"
        >
          <ChevronLeftIcon sx={{ mr: 1 }} />
          Back
        </Fab>
        <Fab
          variant="extended"
          onClick={() =>
            ReviewStep !== StepList.length - 1
              ? setReviewStep(ReviewStep + 1)
              : SubmitReview(ReviewData, userToken, enqueueSnackbar, () => {
                  navigate(`/visualization/${params.courseId}`);
                })
          }
        >
          {ReviewStep !== StepList.length - 1 ? "Next" : "Submit"}
          {ReviewStep !== StepList.length - 1 ? (
            <ChevronRightIcon sx={{ ml: 1 }} />
          ) : (
            <SendIcon sx={{ ml: 1 }} />
          )}
        </Fab>
      </Box>
    </React.Fragment>
  );
}
