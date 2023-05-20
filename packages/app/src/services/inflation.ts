import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// enabling secure grpc on this end breaks data transmission.
// when server enables it, it's all fine, but if the client enables it,
// connection is never established.
// TODO get rid of this
const grpcTlsEnabled = ["1", "TRUE", "YES"].includes(
  (!!process.env["GRPC_CLIENT_TLS_ENABLED"]
    ? process.env["GRPC_CLIENT_TLS_ENABLED"]
    : "false"
  ).toUpperCase()
);

const protoPath = [
  process.env.PROJECT_ROOT_ABSPATH,
  process.env.REPO_PROTOS_RELPATH,
  "inflation/decade-stats.proto",
].join("/");
const serviceUrl = [process.env.MS_HOST, process.env.MS_PORT].join(":");

interface InflationServiceConstructorParams {
  caCrt: Buffer;
  tlsCrt: Buffer;
  tlsKey: Buffer;
}

export class InflationService {
  caCrt: Buffer;
  tlsCrt: Buffer;
  tlsKey: Buffer;
  credentials: grpc.ChannelCredentials;
  // TODO any type
  inflationDefinition: any;
  // TODO any type
  service: any;
  inflationProtoDef: protoLoader.PackageDefinition;

  constructor({ caCrt, tlsCrt, tlsKey }: InflationServiceConstructorParams) {
    this.caCrt = caCrt;
    this.tlsCrt = tlsCrt;
    this.tlsKey = tlsKey;
    this.credentials = grpcTlsEnabled
      ? grpc.credentials.createSsl(this.caCrt, this.tlsKey, this.tlsCrt, {})
      : grpc.credentials.createInsecure();
    this.inflationProtoDef = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    this.inflationDefinition = grpc.loadPackageDefinition(
      this.inflationProtoDef
      // @ts-ignore
    ).ms.nextjs_grpc.Inflation;
    this.service = new this.inflationDefinition(serviceUrl, this.credentials);
  }

  async decadeStats(codes: string[]) {
    // TODO you need a type here
    return new Promise<any[]>((resolve, reject) => {
      try {
        const rows: any[] = [];
        const call = this.service.decadeStats({ codes });
        // TODO you need a way for types to be created from protos
        // @ts-expect-error
        call.on("data", (row) => {
          rows.push(row);
        });
        call.on("end", () => {
          resolve(rows);
        });
        // TODO typing
        // @ts-expect-error
        call.on("error", (error) => {
          console.log({ error });
          reject("GRPC_ERROR");
        });
      } catch (error) {
        console.log({ error });
        reject("Something broken");
      }
    });
  }
}
