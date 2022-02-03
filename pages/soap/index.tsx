import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs from "@mui/material/Tabs";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import NavTab from "../../components/commons/nav-tab";

const Soap = () => {
  const [menu, setMenu] = useState(0);

  const onChangeMenu = useCallback(
    (e: React.SyntheticEvent, v: number) => setMenu(v),
    []
  );

  return (
    <>
      <Head>
        <title>HeeSoap</title>
      </Head>
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
          <Tabs orientation="vertical" value={menu} onChange={onChangeMenu}>
            <NavTab label="카탈로그" href="/soap" />
            <NavTab label="재료모음" href="/soap" />
            <NavTab label="레시피모음" href="/soap/recipe" />
          </Tabs>
        </Box>
        <pre>{`
        #1. 비누레시피별 관리
        #2. 소유한 재료 관리
        #3. 구매가능한 재료 관리
        #4. 작업가능 레시피 관리 
        #5. 레시피별 필요 재료 관리
      `}</pre>
      </Container>
    </>
  );
};

export default Soap;
