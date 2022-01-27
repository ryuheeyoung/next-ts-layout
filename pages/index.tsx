import { useRouter } from "next/router";
import React, { useCallback } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { teal } from "@mui/material/colors";
import { Color, Link } from "@mui/material";

import { TemplateLayout } from "../interfaces";
import { Layers as layers } from "../utils/Layers";

interface Colors extends Color {
  [key: string]: string;
}

const IndexPage = () => {
  const router = useRouter();

  const onClick = useCallback((layer: TemplateLayout) => {
    router.push(layer.content);
  }, []);
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
            key={layers[idx]?.id || cIndex}
            sx={() => ({
              backgroundColor: (teal as Colors)[cIndex],
              width: "25vw",
              m: "1.25em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            {layers[idx] ? (
              <Link
                underline="none"
                color="inherit"
                onClick={() => onClick(layers[idx])}
              >
                {layers[idx].name}
              </Link>
            ) : (
              `Flex Box ${cIndex}`
            )}
          </Box>
        );
      })}
    </Container>
  );
};
export default IndexPage;
