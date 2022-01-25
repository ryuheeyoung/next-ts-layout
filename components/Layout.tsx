import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { teal } from "@mui/material/colors";
import { BoxProps, Color } from "@mui/material";
import { TemplateLayout } from "../interfaces";
import { useRouter } from "next/router";

interface Colors extends Color {
  [key: string]: string;
}

interface TypeProps {
  layers: TemplateLayout[];
}

const Layout = ({ layers }: TypeProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        p: 0,
        display: "flex",
        width: "100vw",
        height: "100vh",
        m: 0,
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {Array.from(Array(9).keys()).map((item, idx) => {
        var cIndex = ((idx + 1) * 100).toString();
        return (
          <Box
            key={cIndex}
            sx={(theme) => ({
              backgroundColor: (teal as Colors)[cIndex],
              width: "25vw",
              m: "1.25em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <Box id={layers[idx]?.id.toString() || `item-${item + 1}`}>
              {layers[idx]?.name ?? `Flex Box ${item + 1}`}
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};

export default Layout;
