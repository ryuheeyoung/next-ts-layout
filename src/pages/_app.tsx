import CssBaseline from "@mui/material/CssBaseline";
import Layout from "components/layout";
import { AppProps } from "next/app";
import Head from "next/head";
import { ComponentType } from "react";

type CompProps = AppProps["Component"] & {
  Layout?: ComponentType;
};

const App = ({ Component, pageProps }: AppProps & { Component: CompProps }) => {
  const ComputedLayout = Component.Layout || Layout;

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <meta name="viewport" content="viewport-width=device-width" />
        <title>HeeApp</title>
      </Head>
      <ComputedLayout>
        <Component {...pageProps} />
      </ComputedLayout>
      <CssBaseline />
    </>
  );
};

export default App;
