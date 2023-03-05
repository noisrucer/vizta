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
      gridTemplateRows="repeat(12,1fr)"
      gap="20px"
      marginTop={3}
      marginBottom={{ xs: 3 }}
    >
      <Box
        gridColumn={{ xs: "span 12", md: "span 5", lg: "span 5" }}
        gridRow="span 26"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GENERAL INFO in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 12", md: "span 7", lg: "span 7" }}
        gridRow="span 13"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      >
        {/*Put GRADING RATIO in Here */}
      </Box>
      <Box
        gridColumn={{ xs: "span 12", md: "span 7", lg: "span 7" }}
        gridRow="span 13"
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
