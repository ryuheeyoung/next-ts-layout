import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
        <title>HeeApp</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <CssBaseline />
    </>
  );
};

export default App;
