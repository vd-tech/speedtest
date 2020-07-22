import dynamic from "next/dynamic";
import Head from "next/head";

const UI = dynamic(() => import("../components/ui"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <meta charSet="UTF-8" />
        <script type="text/javascript" src="/speedtest.js" />
        <title>Speedtest</title>
      </Head>
      <UI />
    </div>
  );
}
