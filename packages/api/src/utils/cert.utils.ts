import { readFileSync } from "fs";
import path from "path";

export const readCertPath = (filename: string): Buffer => {
  const certsPath = process.env.CERTIFICATES_ABSPATH!;
  const msGrpcClientCertForWebServer =
    process.env.MS_GRPC_CLIENT_CERT_FOR_WEB_SERVER_RELPATH!;
  const certPath = readFileSync(
    path.resolve(certsPath, msGrpcClientCertForWebServer, filename)
  );
  return certPath;
};

export const getTlsProps = () => ({
  caCrt: readCertPath("ca.crt"),
  tlsCrt: readCertPath("tls.crt"),
  tlsKey: readCertPath("tls.key"),
});
