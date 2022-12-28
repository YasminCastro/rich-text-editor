import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import GlobalStyles from "../styles/GlobalStyles";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <GlobalStyles />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
