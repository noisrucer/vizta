import React from "react";

import Box from "@mui/material/Box";
import "typeface-roboto";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import Divider from "@mui/material/Divider";

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
import useBreakpoints from "./useBreakpoints";
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

// const baseURL = "https://vizta.onrender.com";
const baseURL = process.env.REACT_APP_BASEURL;

const indents = 12;

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "#26323F",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
  borderRadius: 20,
}));

const PrettoSlider = styled(Slider)({
  color: "primary",
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
    backgroundColor: "#52af77",
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
          marginTop: 15,
          marginBottom: 10,
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
            <h1
              style={{
                fontFamily: "Roboto",
                color: "white",
              }}
            >
              {this.props.course_id} / {this.props.course_title}
            </h1>
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
      <CardContent sx={{ mx: 3, my: 5 }}>
        <Typography sx={{ color: "#fff" }} variant="h3" component="div">
          {this.props.title}
        </Typography>
        <Box sx={{ my: 4, mx: 3 }}>
          {this.props.reviewItems.map((v, i) => (
            <Grid
              sx={{ my: 1 }}
              container
              spacing={4}
              alignItems="center"
              key={i}
            >
              <Grid item xs="3">
                {VariableNameCapitalize(v)}
              </Grid>
              {label ? (
                <Grid item xs="2">
                  {this.state.lLabel}
                </Grid>
              ) : null}
              <Grid item xs={label ? 6 : 9}>
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
                />
              </Grid>
              {label ? (
                <Grid item xs="1">
                  {this.state.rLabel}
                </Grid>
              ) : null}
            </Grid>
          ))}
        </Box>
      </CardContent>
    );

    const boxStyle = { my: 3, width: 800 };
    return <Item sx={boxStyle}>{card}</Item>;
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
      });
      onSuccess();
    })
    .catch((err) => {
      var reason = "Reason here";

      enqueueSnackbar(
        <div>
          {" "}
          Failed to submit review ! <br />
          {reason}
        </div>,
        { autoHideDuration: 5000, variant: "error" }
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
        display="flex"
        flexDirection="column"
        mx={indents}
        height={300}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            sx={{ width: 225, marginRight: 3 }}
            id="outlined-helperText"
            label="Year"
            type="number"
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
            <InputLabel>Semester</InputLabel>
            <Select
              sx={{ width: 175 }}
              value={this.state.semester}
              label="Semester"
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
        </Box>
        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
          }}
        >
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
            sx={{ width: 275, marginRight: 3 }}
            renderInput={(params) => (
              <TextField {...params} label="Professor" />
            )}
          />
          <FormControl>
            <InputLabel>Subclass</InputLabel>
            <Select
              sx={{ width: 125, marginRight: 3 }}
              value={this.state.subclass}
              label="Subclass"
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
      </Box>
    );
  }
}

export default function ReviewCreate() {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const point = useBreakpoints();

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
      />

      <Stepper sx={{ my: 6 }} activeStep={ReviewStep} alternativeLabel>
        {StepList.map((label) => (
          <Step key={label}>
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
            />,
            <Box
              key="Final Grade"
              display="flex"
              mx={indents}
              sx={{ fontSize: 40 }}
              height={300}
              alignItems="center"
              justifyContent="center"
            >
              <FormControl
                required
                width={500}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <InputLabel>Final Grade</InputLabel>
                <Select
                  sx={{ width: "20vw" }}
                  value={ReviewData["gpa"]}
                  label="Final Grade *"
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

      <Box sx={{ mx: indents, float: "right" }}>
        <Fab
          sx={{ marginRight: 3 }}
          variant="extended"
          disabled={ReviewStep === 0}
          onClick={() => setReviewStep(ReviewStep - 1)}
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
          {ReviewStep !== StepList.length - 1 ? (
            <ChevronRightIcon sx={{ mr: 1 }} />
          ) : (
            <SendIcon sx={{ mr: 1 }} />
          )}
          {ReviewStep !== StepList.length - 1 ? "Next" : "Submit"}
        </Fab>
      </Box>
    </React.Fragment>
  );
}
