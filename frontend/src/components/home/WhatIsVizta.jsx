import {
  Box,
  Icon,
  IconButton,
  useTheme,
  Container,
  Typography,
  Button,
  Link,
  Grid,
} from "@mui/material";

import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { styled } from "@mui/system";
import {
  SectionWrap,
  H1Heading128,
  Description,
  H1Heading32,
  Heading48,
  Paragraph16,
} from "../GlobalStyledComponents";
import EmblaCarousel from "../Carousel/EmblaCarousel";
import "../../css/embla.css";

const OPTIONS = {};
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const WhatIsVizta = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <SectionWrap
      sx={{
        width: "full",
        backgroundColor: "white",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} xl={6}>
          <Box>
            <H1Heading32
              style={{
                color: "#70d8bd",
                paddingBottom: "2rem",
              }}
            >
              What is VIZTA
            </H1Heading32>
            <Paragraph16 style={{ color: "#1F2A40" }}>
              Have you struggled to find appropriate courses during the add &
              drop period? VIZTA offers a powerful visualization tool for course
              evaluation including GPA, workload, lecture difficulty, final exam
              difficulty, and lecture quality. You can also select a specific
              year and professor to see detailed results.
            </Paragraph16>
          </Box>
        </Grid>
        <Grid item xs={12} xl={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </Box>
        </Grid>
      </Grid>
    </SectionWrap>
  );
};

export default WhatIsVizta;
