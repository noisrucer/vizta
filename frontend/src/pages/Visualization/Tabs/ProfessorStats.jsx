import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ColorModeContext, tokens } from "../../../theme";
import NivoRadarChart from "../Charts/NivoRadarChart";
import radarData from "./NivoData/RadarData";

const profStats = ["chardonay", "carmenere", "syrah"];

const ProfessorStats = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const params = useParams();
  const courseId = params.courseId;

  const { UserToken } = useContext(UserContext);
  const [userToken, setUserToken] = UserToken;

  const [chartData, setChartData] = useState({
    labels: [
      "Lecture Difficulty",
      "Final Difficulty",
      "Workload",
      "Lecture Quality",
      "GPA",
    ],
    datasets: ["Prof A", "Prof B"],
  });

  const initialState = chartData.datasets.reduce((acc, dataset) => {
    acc[dataset.label] = false;
    return acc;
  }, {});

  initialState[Object.keys(initialState)[0]] = true;
  initialState[Object.keys(initialState)[1]] = true;

  const [state, setState] = useState(initialState);
  const [switchClicked, setSwitchClicked] = useState(false);

  useEffect(() => {
    setState(initialState);
  }, [chartData]);

  function renderSwitch(prof) {
    const handleChange = (event) => {
      setSwitchClicked(true);
      setState({
        ...state,
        [event.target.name]: !state[event.target.name],
      });
    };

    const label = { inputProps: { "aria-label": "Switch demo" } };

    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              {...label}
              checked={state[prof.label]}
              onClick={handleChange}
              name={prof.label}
            />
          }
          label={prof.label}
        />
      </FormGroup>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={4}
      marginBottom={3}
      sx={{ height: "100%" }}
    >
      <Box
        gridColumn="span 12"
        gridRow={{ xs: "span 5", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="row"
        borderRadius="2%"
      >
        <Box width="80%" height="400px">
          <NivoRadarChart data={radarData} keys={profStats} />
        </Box>
        <Box
          width="20%"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormControl component="fieldset" variant="standard">
            {chartData.datasets.map((item) => {
              return renderSwitch(item);
            })}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfessorStats;
