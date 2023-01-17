import React from 'react';

import Box from "@mui/material/Box";
import 'typeface-roboto'
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../../UserContext";
import Divider from '@mui/material/Divider';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Slider from '@mui/material/Slider';
import Grid from "@mui/material/Grid";
import SendIcon from '@mui/icons-material/Send';

import useBreakpoints from "./useBreakpoints";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from "@mui/material";

import {SnackbarProvider, useSnackbar} from 'notistack';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

const baseURL = 'http://127.0.0.1:8000';

const indents = 12;

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': {display: 'none'},
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const GradeList = [
  'A +', 'A', 'A -', 'B +', 'B', 'B -', 'C +', 'C', 'C -', 'D +', 'D', 'D -', 'F'
]

class ReviewTopBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      "grade": GradeList.at(-1)
    }
  }

  render() {
    return (
      <Box
        sx={{
          display: "flex",
          minWidth: 275,
          marginTop: 10,
          mx: indents,
          flexDirection: "column",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="stretch">
          <Grid item>
            <h4 style={{
              fontFamily: "Roboto",
              color: "#C8FFF4",
              marginBottom: 30
            }}>
              Create an review
            </h4>
            <h1 style={{
              fontFamily: "Roboto",
              color: "white"
            }}>
              {this.props.course_id}
            </h1>
            <h1 style={{
              fontFamily: "Roboto",
              color: "white"
            }}>
              {this.props.course_title}
            </h1>
          </Grid>
          <Grid item>
            <Box sx={{
              height: "100%",
              flexDirection: "column",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <Fab variant="extended" onClick={this.props.onSubmit}>
                <SendIcon sx={{mr: 1}}/>
                Submit
              </Fab>

              <FormControl required sx={{m: 1, minWidth: 120}}>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={this.state.grade}
                  label="Grade *"
                  onChange={(e) => {
                    this.props.onGradeChange(e.target.value.replace(/\s+/g, ''))
                    this.setState({
                      "grade": e.target.value
                    })
                  }}
                >
                  {
                    GradeList.map(e =>
                      (
                        <MenuItem value={e}>{e}</MenuItem>
                      ))
                  }
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  ,
  enumerable: false
});

function VariableNameCapitalize(name) {
  return String(name).split('_').map(s => s.capitalize()).join(' ')
}

function MergeDict(d1, d2) {
  return Object.assign({}, d1, d2)
}

function isInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

class ReviewSection extends React.Component {

  constructor(props) {

    let max = 10
    if ('max' in props) {
      max = props.max
    }

    let step = 1
    if ('step' in props) {
      step = props.step
    }

    super(props)

    this.state = {
      max: max,
      step: step,
      ...this.props.reviewItems.reduce((a, b) => (a[b] = 0 , a), {})
    }
  }

  render() {

    const card = (
      <React.Fragment>
        <CardContent>
          <Typography sx={{fontSize: 14, color: "red"}} color="text.secondary" gutterBottom>
            Must complete
          </Typography>
          <Typography sx={{color: "#C8FFF4"}} variant="h3" component="div">
            {this.props.title}
          </Typography>
          <Box sx={{my: 4, mx: 3}}>
            {
              this.props.reviewItems.map((v) => (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs="3">
                      {VariableNameCapitalize(v)}
                    </Grid>
                    <Grid item xs>
                      <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        value={this.state[v]}
                        step={this.state.step}
                        marks
                        min={0}
                        max={this.state.max}
                        onChange={(e, nv) => {
                          this.setState(MergeDict(this.state, {[v]: this.props.valueCheck(v, nv)}))
                        }}
                        onChangeCommitted={(e, nv) => {
                          this.props.handleValueChange(v, nv);
                        }}
                      />
                    </Grid>
                  </Grid>
                )
              )
            }
          </Box>
        </CardContent>
      </React.Fragment>
    )

    const boxStyle = {mx: indents, my: 3, minWidth: 550};
    if ('marginRight' in this.props)
      boxStyle['marginRight'] = this.props['marginRight']
    if ('marginLeft' in this.props)
      boxStyle['marginLeft'] = this.props['marginLeft']

    return (
      <Box sx={boxStyle}>
        <Card variant="outlined">{card}</Card>
      </Box>
    )
  }
}

function SubmitReview(data, userToken, onSuccess) {
  axios.request({
    method: 'post',
    url: `${baseURL}/courses/review`,
    data: data,
    headers: userToken['headers']
  }).then(response => {
    console.log(response)
    onSuccess();
  })
    .catch(err => {
      console.log(err)
    })
}

class SubmitDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      year: new Date().getFullYear(),
      semester: 1,
      subclass: null,
      subclasses: []
    }
  }

  updateSubclasses(year, semester) {
    axios.request({
      method: 'get',
      url: `${baseURL}/courses/subclasses/${this.props.course_id}?academic_year=${year}&semester=${semester}`,
      headers: this.props.userToken['headers']
    })
      .then(response => {
        this.setState({
          init: false,
          subclasses: response.data.map((e) => {
            return {label: e['professor_name'], subclass_id: e['subclass_id']}
          })
        })
      })
      .catch(error => {
        console.log("error fromerror from /courses/subclasses: ", error)
      })
  }

  render() {
    return (
      <Dialog open={this.props.show} onClose={() => {
      }}>
        <DialogTitle>Subclass detail</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom: 3}}>
            We need more information for better analysis
          </DialogContentText>
          <Box sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
          }}>
            <TextField
              sx={{width: 225, marginRight: 3}}
              id="outlined-helperText"
              label="Year"
              type="number"
              onChange={(e) => {
                if (e.target.value === "") return
                let value = e.target.value
                value = Math.max(0, Math.min(parseInt(value, 10), new Date().getFullYear()));
                this.setState(MergeDict(this.state, {year: value}))
                this.updateSubclasses(value, this.state.semester)
                this.props.handleValueChange('academic_year', value)
              }}
              defaultValue={this.state.year}
            />
            <Select
              sx={{width: 175}}
              value={this.state.semester}
              label="Semester"
              onChange={(e) => {
                this.setState(MergeDict(this.state, {semester: e.target.value}))
                this.updateSubclasses(this.state.year, e.target.value)
                this.props.handleValueChange('semester', e.target.value)
              }}
            >
              <MenuItem value={1}>First semester</MenuItem>
              <MenuItem value={2}>Second semester</MenuItem>
            </Select>
          </Box>
          <Box sx={{
            my: 2,
            display: "flex",
            flexDirection: "row",
          }}>
            <Autocomplete
              onChange={(e, v) => {
                this.setState(MergeDict(this.state, {subclass: v.subclass_id}))
                this.props.handleValueChange('subclass_id', v.subclass_id)
              }}
              value={this.state.subclasses.find((e) => e.subclass_id === this.state.subclass) ?? null}
              options={this.state.subclasses}
              sx={{width: 275, marginRight: 3}}
              renderInput={(params) => <TextField {...params} label="Professor"/>}
            />
            <Select
              sx={{width: 125, marginRight: 3}}
              value={this.state.subclass}
              label="S"
              onChange={(e) => {
                this.setState(MergeDict(this.state, {subclass: e.target.value}))
                this.props.handleValueChange('subclass_id', e.target.value)
              }}
            >
              {
                this.state.subclasses.map((e) => (
                  <MenuItem value={e.subclass_id}>{e.subclass_id}</MenuItem>
                ))
              }
            </Select>
          </Box>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.props.onSubmit}>Sumbit</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default function ReviewCreate() {

  const {enqueueSnackbar} = useSnackbar();

  const navigate = useNavigate();

  const point = useBreakpoints();

  const params = useParams()
  const courseId = params.courseId

  const {UserToken, UserData} = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;
  const [userData, setUserData] = UserData;

  const reviewList = [
    "gpa",
    "workload",
    "lecture_difficulty",
    "final_exam_difficulty",
    "course_entertaining",
    "course_delivery",
    "course_interactivity",
    "final_exam_ratio",
    "midterm_ratio",
    "assignments_ratio",
    "project_ratio"
  ]

  const courseRatingSection = [
    "workload",
    "lecture_difficulty",
    "final_exam_difficulty"
  ]

  const teachingQualitySection = [
    "course_entertaining",
    "course_delivery",
    "course_interactivity"
  ]

  const gradeDistrSection = [
    "final_exam_ratio",
    "midterm_ratio",
    "assignments_ratio",
    "project_ratio"
  ]

  // FIXME: subclass_id, academic_year, semester
  const [ReviewData, setReviewData] = useState(
    {
      email: userData,
      course_id: params.courseId,
      subclass_id: "A",
      academic_year: 2022,
      semester: 1,
      ...reviewList.reduce((a, b) => (a[b] = 0 , a), {})
    }
  );
  const [courseDescription, setCourseDescription] = useState({
    CourseID: "",
    Description: "",
    Faculty: "",
    GradingRatio: {},
    Name: "",
    Timetable: {}
  });

  const [ShowSubmitDialog, setShowSubmitDialog] = useState(false)

  useEffect(() => {
    axios.request({
      method: 'get',
      url: `${baseURL}/visualization/${courseId}/general_info`,
      headers: userToken['headers']
    })
      .then(response => {
        setCourseDescription(response.data)
      })
      .catch(error => {
        console.log("error from /visualization/course_id/general_info: ", error)
      })
  }, [])

  // return value that fulfil all constraints
  function checkValue(key, value) {
    if (gradeDistrSection.includes(key)) {
      const maxValue = 100 - gradeDistrSection.filter(x => x !== key).map(e => ReviewData[e]).reduce((partialSum, a) => partialSum + a, 0);
      value = Math.max(0, Math.min(value, maxValue));
    }
    return value;
  }

  function AlterReviewData(key, value) {
    setReviewData(MergeDict(ReviewData, {[key]: checkValue(key, value)}));
  }

  return (
    <React.Fragment>
      <ReviewTopBar course_id={courseDescription.CourseID}
                    course_title={courseDescription.Name}
                    onGradeChange={(g) => AlterReviewData('gpa', g)}
                    onSubmit={() => setShowSubmitDialog(true)}/>
      <Divider
        sx={{
          background: "#9A9A9A",
          mx: indents - 2,
          my: 3
        }}/>

      <Grid container>
        <Grid item md={12} lg={6}>
          <ReviewSection title="Course Rating"
                         reviewItems={courseRatingSection}
                         itemValues={ReviewData}
                         marginRight={point === 'lg' ? indents / 2 : null}
                         valueCheck={checkValue}
                         handleValueChange={AlterReviewData}/>
        </Grid>
        <Grid item md={12} lg={6}>
          <ReviewSection title="Teaching Quality Rating"
                         reviewItems={teachingQualitySection}
                         itemValues={ReviewData}
                         marginLeft={point === 'lg' ? indents / 2 : null}
                         valueCheck={checkValue}
                         handleValueChange={AlterReviewData}/>
        </Grid>
      </Grid>
      <ReviewSection title="Course Grading Distribution"
                     reviewItems={gradeDistrSection}
                     itemValues={ReviewData}
                     max={100}
                     step={5}
                     valueCheck={checkValue}
                     handleValueChange={AlterReviewData}/>
      <SubmitDialog
        userToken={userToken}
        course_id={courseDescription.CourseID}
        show={ShowSubmitDialog}
        handleValueChange={AlterReviewData}
        onClose={() => setShowSubmitDialog(false)}
        onSubmit={() => SubmitReview(ReviewData, userToken, () => {
          enqueueSnackbar('Your review has been submitted!', {autoHideDuration: 5000, variant: 'success'});
          navigate(`/visualization/${params.courseId}`)
        })}/>
    </React.Fragment>
  )
    ;
}
