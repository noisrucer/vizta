import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";

const YearlyTrend = () => {
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
        gridColumn="span 12"
        gridRow="span 26"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="2%"
      ></Box>
    </Box>
  );
};

export default YearlyTrend;
