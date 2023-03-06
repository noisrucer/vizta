import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

const CourseInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        gridColumn={{ xs: "span 12", lg: "span 5" }}
        gridRow={{ xs: "span 3", lg: "span 2" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GENERAL INFO in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 7" }}
        gridRow={{ xs: "span 3", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GRADING RATIO in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 12", lg: "span 7" }}
        gridRow={{ xs: "span 3", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put TIMETABLE in Here */}
      </Box>
    </Box>
  );
};

export default CourseInfo;
