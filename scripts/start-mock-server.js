#! /usr/local/bin/node

const http = require("node:http");
const { pipeline, Readable } = require("node:stream");

const errorHandler = (err) => err && console.error(err);

const dataSource = new Readable({
  write(_, __, next) {
    next();
  },
});

function produceData(dataStream, data) {
  const dataChunk = JSON.stringify(data);
  dataStream.push(dataChunk);
  dataStream.push(null);
}

function main() {
  const server = http.createServer((req, res) => {
    const url = new URL(`http://localhost:4000${req.url}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (url.pathname) {
      case "/api/v1/decade-stats":
        console.log("hit");
        // pipeline(dataSource, res, errorHandler);
        // produceData(dataSource, { url: req.url });
        const codes = url.searchParams.get("codes").split(",");
        console.log({ codes });
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
        res.write(JSON.stringify({ decadeStats: data }));
        res.end();
        break;

      default:
        console.log({ url: req.url });
        produceData(dataSource, {
          error: "Not implemented",
          url,
        });
        break;
    }
  });
  const PORT = 4000;
  server.listen(PORT, () => {
    console.log(`Mock Server started listening on ${PORT}`);
  });
}

main();
