const express = require("express");
const next = require("next");
const randomBytes = require("random-bytes");
const path = require("path");
const cors = require("cors");
const helpers = require("./helpers");
const request = require("request");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
let cache;

app.prepare().then(() => {
  const server = express();
  server.use(cors());

  server.get("/empty", function (req, res) {
    return res.status(200).send("");
  });

  server.post("/empty", function (req, res) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.set("Cache-Control", "post-check=0, pre-check=0");
    res.set("Pragma", "no-cache");
    return res.status(200).send("");
  });

  server.get("/garbage", function (req, res) {
    res.set("Content-Description", "File Transfer");
    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Disposition", "attachment; filename=random.dat");
    res.set("Content-Transfer-Encoding", "binary");
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.set("Cache-Control", "post-check=0, pre-check=0");
    res.set("Pragma", "no-cache");
    const requestedSize = req.query.ckSize || 100;

    const send = () => {
      for (let i = 0; i < requestedSize; i++) res.write(cache);
      res.end();
    };

    if (cache) {
      send();
    } else {
      randomBytes(1048576, (error, bytes) => {
        cache = bytes;
        send();
      });
    }
  });

  server.get("/getIP", function (req, res) {
    let requestIP =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.headers["HTTP_CLIENT_IP"] ||
      req.headers["X-Real-IP"] ||
      req.headers["HTTP_X_FORWARDED_FOR"];
    if (requestIP.substr(0, 7) === "::ffff:") {
      requestIP = requestIP.substr(7);
    }
    request("https://ipinfo.io/" + requestIP + "/json", function (
      err,
      body,
      ipData
    ) {
      ipData = JSON.parse(ipData);
      if (err) res.send(requestIP);
      else {
        request("https://ipinfo.io/json", function (err, body, serverData) {
          serverData = JSON.parse(serverData);
          if (err) res.send(`${requestIP} - ${ipData.org}, ${ipData.country}`);
          else if (ipData.loc && serverData.loc) {
            const d = helpers.calcDistance(
              ipData.loc.split(","),
              serverData.loc.split(",")
            );
            res.send(
              `${requestIP} - ${ipData.org}, ${ipData.country} (${d}km)`
            );
          } else {
            res.send(`${requestIP} - ${ipData.org}, ${ipData.country}`);
          }
        });
      }
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
