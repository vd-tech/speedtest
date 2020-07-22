import NextHead from "components/NextHead";
import NextProgress from "components/NextProgress";
import React from "react";
import "src/styles/index.css";

export default function App({ Component, pageProps }: any) {
  return (
    <main className="relative w-full overflow-hidden antialiased">
      <NextProgress />
      <NextHead title="Speedtest" />
      <Component {...pageProps} />
    </main>
  );
}
