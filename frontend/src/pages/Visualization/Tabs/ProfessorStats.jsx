import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";

const ProfessorStats = () => {
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
        gridColumn="span 12"
        gridRow={{ xs: "span 6", lg: "span 1" }}
        backgroundColor={colors.primary[400]}
        display="flex"
        flexDirection="row"
        borderRadius="2%"
      >
        <Box width="80%"></Box>
        <Box width="20%"></Box>
      </Box>
    </Box>
  );
};

export default ProfessorStats;
