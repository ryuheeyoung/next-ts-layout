// pages/_app.js
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
      <CssBaseline />
    </>
  );
};

export default App;
