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
  Paragraph16,
  Paragraph24,
  CircleElement,
  BlurSection,
  Heading64,
} from "../GlobalStyledComponents";

const Overlay = styled("div")`
  background: ${({ background }) =>
    background === "white" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)"};
  position: absolute;
  inset: 0;
`;

const Detail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const DETAILS = [
    {
      title: "Metric Visualization",
      description:
        "Find out overall score, GPA, workload, lecture/final exam difficulty, and lecture quality",
    },
    {
      title: "General Information",
      description:
        "Find out grading distribution, timetable, and general information for each subclass/professor",
    },
    {
      title: "Yearly Trends",
      description: "Find out yearly trends for professors based on each metric",
    },
    {
      title: "Professor Statistics",
      description:
        "Compare two or more professors over a range of different metrics",
    },
  ];
  console.log(DETAILS);
  return (
    <Box
      sx={{
        color: "white",
        position: "relative",
        overflow: "hidden",
        marginTop: { xs: "100px", md: "100px" },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1F2A40",
          color: "white",
          position: "relative",
          overflow: "hidden",
          width: "full",
        }}
      >
        <CircleElement
          className="top-[30%] left-[-10%]"
          size={500}
          color="#70d8bd"
        />
        ,
        <CircleElement
          className="top-[50%] right-[-10%]"
          size={700}
          color="#70d8bd"
        />
        <Overlay background="#1F2A40" />
        <BlurSection
          blur={320}
          background="#1F2A40"
          style={{
            paddingTop: "8rem",
            paddingBottom: "8rem",
            marginTop: "-4rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Heading64 style={{ fontWeight: "bold" }}>
              WHAT CAN YOU DO <br /> WITH VIZTA
            </Heading64>
            <Box>
              <Paragraph16></Paragraph16>
              <Paragraph16></Paragraph16>
              <Paragraph16></Paragraph16>
            </Box>
          </Box>
          <Box sx={{ paddingTop: "8rem" }}>
            {DETAILS.map((i, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  paddingBottom: "8rem",
                  flexWrap: "wrap",
                }}
                key={i.title + "-" + index + "-" + "detail"}
              >
                <Box
                  sx={{
                    paddingRight: "8rem",
                    flexBasis: { xs: "full", sm: "0" },
                  }}
                >
                  <Paragraph24>0{index + 1}</Paragraph24>
                </Box>

                <Box
                  sx={{
                    flex: "1.5 1.5 0%",
                    paddingRight: "8rem",
                    paddingTop: { xs: "2rem", md: "0" },
                    flexBasis: { xs: "full", md: "1" },
                  }}
                >
                  <H1Heading32
                    style={{
                      paddingBottom: 0,
                      fontWeight: 400,
                    }}
                  >
                    {i.title}
                  </H1Heading32>
                </Box>
                <Box
                  sx={{
                    flex: "1 1 0%",
                    paddingTop: { xs: "2rem", md: "0" },
                    flexBasis: { xs: "full", md: "1" },
                  }}
                >
                  <Paragraph16 className="text-[#e3e3e3]">
                    {i.description}
                  </Paragraph16>
                </Box>
              </Box>
            ))}
          </Box>
        </BlurSection>
      </Box>
    </Box>
  );
};

export default Detail;
