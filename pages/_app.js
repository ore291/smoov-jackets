import Head from "next/head";
import "../styles/globals.css";
import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>VarsityJacketPlug</title>
      </Head>
      <style>{`
        html {
          font-family: ${jost.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
