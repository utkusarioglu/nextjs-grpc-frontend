import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import * as grpc from "@grpc/grpc-js";
import { getTlsProps } from "./utils/cert.utils";

const tls = getTlsProps();

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

const serviceUrl = [process.env.MS_HOST, process.env.MS_PORT].join(":");

const credentials = grpcTlsEnabled
  ? grpc.credentials.createSsl(tls.caCrt, tls.tlsKey, tls.tlsCrt, {})
  : grpc.credentials.createInsecure();

export const grpcTransport = new GrpcTransport({
  host: serviceUrl,
  channelCredentials: credentials,
});
