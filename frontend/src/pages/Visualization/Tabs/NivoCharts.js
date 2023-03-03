import NivoBarChart from "../Charts/NivoBarChart";
import NivoLineChart from "../Charts/NivoLineChart";
import NivoPieChart from "../Charts/NivoPieChart";
import NivoRadarChart from "../Charts/NivoRadarChart";
import barData from "./NivoData/BarData";
import lineData from "./NivoData/LineData";
import pieData from "./NivoData/PieData";
import radarData from "./NivoData/RadarData";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1D2630' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const NivoCharts = () => {
    console.log("lineData: ", lineData)

    return (
        <Box sx={{ width: "180%", flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoRadarChart data={radarData} />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoLineChart data={lineData} />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoPieChart data={pieData} />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoBarChart data={barData} />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoBarChart data={barData} />
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item sx={{ height: "33vh" }}>
                        <NivoBarChart data={barData} />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    )
};

export default NivoCharts