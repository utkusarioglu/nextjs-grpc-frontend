#!/usr/local/bin/node

const https = require("node:https");
const fs = require("node:fs");

// const CERT_PATH =
//   "/utkusarioglu-com/projects/nextjs-grpc/frontend/apps/web/.certs/web-server-server-cert";
const CERT_PATH =
  "/utkusarioglu-com/projects/nextjs-grpc/frontend/.certs.local/mock-server";

const PORT = 443;

const options = {
  // ca: fs.readFileSync(`${CERT_PATH}/ca.crt`),
  ca: fs.readFileSync(`${CERT_PATH}/chain.crt`),
  cert: fs.readFileSync(`${CERT_PATH}/chain.crt`),
  key: fs.readFileSync(`${CERT_PATH}/tls.key`),
};

function produceData(codes) {
  const data =
    codes[0] === ""
      ? []
      : codes
          .map((code) =>
            Array(2)
              .fill(null)
              .map((_, i) => ({
                countryCode: `${code.toUpperCase()}-${i}`,
                countryName: code.toLowerCase(),
                decade: i,
                count: i,
                average: i,
                max: i,
                min: i,
                median: i,
                range: i,
                stdDev: i,
                variance: i,
              }))
          )
          .reduce((p, c) => {
            p = [...p, ...c];
            return p;
          }, []);
  return JSON.stringify({ decadeStats: data });
}

https
  .createServer(options, (req, res) => {
    const url = new URL(`http://localhost:4000${req.url}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    switch (url.pathname) {
      case "/api/v1/decade-stats":
        console.log("hit");
        // pipeline(dataSource, res, errorHandler);
        // produceData(dataSource, { url: req.url });
        const codesParam = url.searchParams.get("codes");
        if (!codesParam) {
          res.statusCode = 400;
          res.write(JSON.stringify({ error: "no codes param given" }));
          res.end();
          break;
        }

        const codes = codesParam.split(",");
        console.log({ codes });
        res.write(produceData(codes));
        res.end();
        break;

      default:
        console.log("default hit");
        res.write(produceData(["a"]));
        // res.write(
        //   JSON.stringify({
        //     error: "Not implemented",
        //     url,
        //   })
        // );
        res.end();
        break;
    }
  })
  .listen(PORT, () => {
    console.log(`Mock server listening on port ${PORT}`);
  });
