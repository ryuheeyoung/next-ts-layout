import { ComponentType, useState, useCallback, useEffect } from "react";
import { Container, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import NavTab from "components/commons/nav-tab";
import { useRouter } from "next/router";

const SoapLayout: ComponentType = ({ children }) => {
  const { asPath } = useRouter();
  const [menu, setMenu] = useState("soap");

  const onMenuChange = useCallback(
    (e: React.SyntheticEvent, v: string) => setMenu(v),
    []
  );

  useEffect(() => {
    const keys = asPath.replace("/", "").split("/");
    const key = keys.length == 1 ? keys[0] : keys[1];
    setMenu(key);
  }, [asPath]);

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
      <Box sx={{ height: "100%", width: "10vw", p: 0, m: 0 }}>
        <Tabs orientation="vertical" value={menu} onChange={onMenuChange}>
          <NavTab value={"soap"} label="카탈로그" href="/soap" />
          <NavTab value={"material"} label="재료모음" href="/soap/material" />
          <NavTab value={"recipe"} label="레시피모음" href="/soap/recipe" />
        </Tabs>
      </Box>
      <Box sx={{ height: "100%", width: "85vw", p: 0, m: 0 }}>{children}</Box>
    </Container>
  );
};
export default SoapLayout;
