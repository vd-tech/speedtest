import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//JUST AN EXAMPLE, PLEASE USE YOUR OWN PICTURE!
var imageAddr = "/31120037-5mb.jpg";
var downloadSize = 4995374; //bytes

const numberStyle = { fontVariantNumeric: "lining-nums" };

const initialResult = {
  mbs: "0",
  kbps: "0",
  bps: "0",
};

const Home = () => {
  const [result, setResult] = useState<{
    mbs: string;
    kbps: string;
    bps: string;
  }>(initialResult);
  const [running, setRunning] = useState(false);
  const [readmore, setReadmore] = useState(false);

  const runSpeedTest = async () => {
    setRunning(true);
    setResult(initialResult);
    let startTime: number = 0;
    let endTime: number = 0;
    const download = new Image();
    download.onload = function () {
      endTime = new Date().getTime();
      showResults();
    };

    download.onerror = function (err, msg) {
      console.error(err);
      console.log(msg);
      setRunning(false);
    };

    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = downloadSize * 8;
      const speedBps = (bitsLoaded / duration).toFixed(2);
      const speedKbps = (parseInt(speedBps) / 1024).toFixed(2);
      const speedMbps = (parseInt(speedKbps) / 1024).toFixed(2);

      setResult({
        mbs: speedMbps,
        kbps: speedKbps,
        bps: speedBps,
      });
      setRunning(false);
    }
  };
  const counter = (value: any, type: any) => (
    <div
      className="flex items-center mb-2"
      style={{ height: running ? "45px" : undefined }}
    >
      <h2 style={numberStyle}>
        {running ? (
          <sup>
            <img alt="loading" src="/dots.svg" className="h-2 mt-3" />
          </sup>
        ) : (
          value
        )}
      </h2>{" "}
      <sup className="ml-1">{type}</sup>
    </div>
  );

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <>
          <div className="flex flex-col items-center justify-center text-center">
            <h5 className="mb-2">Your download speed:</h5>
            {counter(result.mbs, "Mbps")}
            {(readmore && result.kbps !== initialResult.kbps) ||
              (result.bps !== initialResult.bps && (
                <>
                  {counter(result.kbps, "Kbps")}
                  {counter(result.bps, "Bps")}
                </>
              ))}
            <div
              onClick={() => setReadmore((flag) => !flag)}
              className="text-blue-500 cursor-pointer hover:text-blue-700"
            >
              {readmore ? "less details" : "more details"}
            </div>
          </div>
        </>

        <button
          type="button"
          onClick={runSpeedTest}
          className="px-8 py-3 mt-4 mb-1 mr-1 text-base font-bold text-white uppercase transition-all bg-blue-500 rounded shadow-md outline-none active:bg-blue-600 hover:shadow-lg focus:outline-none hover:bg-blue-700"
        >
          Run Speedtest
        </button>
      </div>
    </div>
  );
};

export default Home;
