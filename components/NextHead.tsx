import React from "react";
import Head from "next/head";

const NextHead = ({
  title = "Speedtest Page",
  description = "Test network speeds",
  locale = "en",
}) => (
  <Head>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta
      name="msapplication-TileImage"
      content="/system/mstile-144x144.png"
    ></meta>

    <meta property="og:locale" content={locale} />
    {/* <meta
      name="google-site-verification"
      content={process.env.GOOGLE_SITE_VERIFICATION}
    /> */}
    <link
      href="https://fonts.googleapis.com/css?family=Mallanna&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Raleway:700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/system/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/system/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/system/favicon-16x16.png"
    />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" />
    {process.env.NODE_ENV === "production" && (
      <link rel="manifest" href="/system/site.webmanifest" />
    )}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"
    />

    <script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API}&libraries=places`}
    />
  </Head>
);

export default NextHead;
