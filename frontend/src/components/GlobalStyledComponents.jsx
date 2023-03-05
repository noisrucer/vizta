import { styled } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";

const ParagraphBase = styled("p")`
  line-height: 200%;
  font-weight: 300;
  @media (min-width: 768px) {
    line-height: 180%;
  }
`;

export const ContentWrap = styled(motion.div)`
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 1rem;
  @media (min-width: 1024px) {
    padding: 0 6rem;
  }
`;

export const SectionWrap = styled(ContentWrap)`
  padding-top: 3rem;
  position: relative;
  margin: 0 auto;
  // ${({ $outerMargin }) => $outerMargin && `margin:3rem 0;`}
  ${({ $paddingBottom }) => $paddingBottom && `padding-bottom:3rem;`}

  @media(min-width:1024px) {
    padding-top: 6rem;
    ${({ $paddingBottom }) => $paddingBottom && `padding-bottom:6rem;`}// ${({
      $outerMargin,
    }) => $outerMargin && `margin:6rem 0rem;`}
  }
`;

export const Paragraph32 = styled(ParagraphBase)`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

export const Paragraph24 = styled(ParagraphBase)`
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;
export const Paragraph20 = styled(ParagraphBase)`
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const Paragraph16 = styled(ParagraphBase)`
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export const H1Heading128 = styled("h1")`
  line-height: 100%;
  font-size: 64px;
  padding-bottom: 1.5rem;
  @media (min-width: 992px) {
    font-size: 100px;
    padding-bottom: 3rem;
  }
`;

export const Heading128 = styled("h2")`
  line-height: 100%;
  font-size: 64px;
  padding-bottom: 1.5rem;
  @media (min-width: 992px) {
    font-size: 100px;
    padding-bottom: 3rem;
  }
`;

export const H1Heading64 = styled("h1")`
  font-size: 32px;
  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

export const Heading64 = styled("h2")`
  font-size: 32px;
  @media (min-width: 768px) {
    font-size: 64px;
  }
`;

export const H1Heading48 = styled("h1")`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

export const Heading48 = styled("h2")`
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

export const H1Heading32 = styled("h1")`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 1.5rem;
  @media (min-width: 768px) {
    padding-bottom: 3rem;
    font-size: 32px;
  }
`;

export const Heading32 = styled("h2")`
  font-size: 24px;
  font-weight: 600;
  // padding-bottom: 1.5rem;
  // @media (min-width: 768px) {
  //   padding-bottom: 3rem;
  //   font-size: 32px;
  // }
`;

export const Heading24 = styled("h2")`
  font-size: 20px;
  font-weight: 600;
  // padding-bottom: 1.5rem;
  // @media (min-width: 768px) {
  //   font-size: 24px;
  //   padding-bottom: 3rem;
  // }
`;
