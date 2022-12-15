import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Toolbar from "../components/Toolbar";
import { Footer } from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Hind+Siliguri:@700'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Inter:@400,500,600,700'
        />
      </Head>
      <Toolbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
