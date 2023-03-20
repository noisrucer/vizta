import { useState, useEffect, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import NivoLineChart from "../Charts/NivoLineChart";
import lineData from "./NivoData/LineData";

const YearlyTrend = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState({
    labels: ["prof A", "prof B"],
    datasets: ["prof A", "prof B"],
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
        gridRow={{ xs: "span 6", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        borderRadius="2%"
        padding={3}
      >
        <Box width="100%" height="500px">
          <NivoLineChart data={lineData} />
        </Box>
        <Box
          sx={{
            marginTop: 2,
            width: { xs: "100%", lg: "20%" },
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

export default YearlyTrend;
