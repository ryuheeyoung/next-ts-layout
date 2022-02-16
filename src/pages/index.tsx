import Link from "next/link";
import React from "react";

import { Color } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { teal } from "@mui/material/colors";
import MuiLink from "@mui/material/Link";

import { Layers as layers } from "utils/Layers";

interface Colors extends Color {
  [key: string]: string;
}

const IndexPage = () => {
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
              <Link href={layers[idx].content} passHref>
                <MuiLink underline="none" color="inherit">
                  {layers[idx].name}
                </MuiLink>
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
