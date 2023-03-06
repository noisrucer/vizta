import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    //Grid & Charts
    <Box
      display="grid"
      gridTemplateColumns="repeat(14,1fr)"
      gridAutoRows={{ xs: "100px", lg: "1fr" }}
      gap="20px"
      marginTop={4}
      marginBottom={3}
      sx={{ height: "100%" }}
    >
      {/* Row 1 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 4" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put RADAR CHART in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GPA in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put WORKLOAD in Here */}
      </Box>
      {/* Row 2 */}
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE DIFFICULTY in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 5" }}
        gridRow="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put EXAM DIFFICULTY in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 14", lg: "span 4" }}
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put LECTURE QUALITY in Here */}
      </Box>
    </Box>
  );
};

export default Overview;
