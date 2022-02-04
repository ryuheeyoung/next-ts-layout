import { ComponentType, useState, useCallback } from "react";
import { Container, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import NavTab from "components/commons/nav-tab";

const SoapLayout: ComponentType = ({ children }) => {
  const [menu, setMenu] = useState(0);

  const onMenuChange = useCallback(
    (e: React.SyntheticEvent, v: number) => setMenu(v),
    []
  );

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
        background: "#fff1e0",
      }}
    >
      <Box sx={{ height: "100%", width: "10vw" }}>
        <Tabs orientation="vertical" value={menu} onChange={onMenuChange}>
          <NavTab label="카탈로그" href="/soap" />
          <NavTab label="재료모음" href="/soap" />
          <NavTab label="레시피모음" href="/soap/recipe" />
        </Tabs>
      </Box>
      {children}
    </Container>
  );
};
export default SoapLayout;
