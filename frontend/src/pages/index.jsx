import {
  Box,
  Icon,
  IconButton,
  useTheme,
  Container,
  Typography,
  Button,
  Link,
} from "@mui/material";

import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import Navbar from "./global/Navbar";
import { styled } from "@mui/system";
import {
  SectionWrap,
  H1Heading128,
  Paragraph16,
} from "../components/GlobalStyledComponents";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const CircleElement = styled("div")`
    height: 500px;
    width: 500px;
    border-radius: 100vmax;
    border: 1px solid ${colors.greenAccent[500]};
    position: absolute;
  `;

  const CircleHeroWrap = styled(SectionWrap)`
    min-height: 60vh;
    // max-height: 600px;
    overflow: hidden;
    padding-top: 150px;
    ${({ overlay }) => overlay && ` overflow:visible;`}
    @media(min-width:992px) {
      padding-top: 80px;
    }
  `;

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <CircleElement
          sx={{
            top: { xs: "-30%", md: "-20%" },
            left: { xs: "-30%", md: "-10%" },
          }}
        ></CircleElement>
        <CircleElement
          sx={{
            top: { xs: "30%", md: "20%" },
            left: { xs: "-50%", md: "-20%" },
          }}
        ></CircleElement>
        <CircleElement
          sx={{
            top: { xs: "50%", md: "55%" },
            right: { xs: "-50%", md: "-15%" },
          }}
        ></CircleElement>
        <CircleHeroWrap
          className={
            "flex flex-col flex-wrap lg:flex-nowrap items-start justify-center relative"
          }
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: { xs: "wrap", lg: "nowrap" },
            justifyContent: "center",
            alignItems: "start",
            position: "relative",
          }}
        >
          <div sx={{ marginTop: "auto", zIndex: "10" }}>
            <H1Heading128
              sx={{
                color: "white",
                fontWeight: "semiBold",
                maxWidth: { sm: "100%" },
              }}
            >
              VIZTA
            </H1Heading128>
          </div>
          <Paragraph16 className="self-end mb-16 right-0 relative text-white mt-auto sm:max-w-[70%]">
            HKU Course Evaluation System
          </Paragraph16>
          {/* <Link href="/auth/sign-in">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: `${colors.greenAccent[500]}`,
                ":hover": {
                  bgcolor: `${colors.greenAccent[600]}`,
                },
              }}
            >
              Log In
            </Button>
          </Link> */}
        </CircleHeroWrap>
      </Box>
    </Box>
  );
};

export default Home;
