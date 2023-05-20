import { InflationService } from "../services/inflation";
import { readFileSync } from "fs";
import path from "path";

const readCertPath = (filename: string): Buffer => {
  const certsPath = process.env.CERTIFICATES_ABSPATH!;
  const msGrpcClientCertForWebServer =
    process.env.MS_GRPC_CLIENT_CERT_FOR_WEB_SERVER_RELPATH!;
  const certPath = readFileSync(
    path.resolve(certsPath, msGrpcClientCertForWebServer, filename)
  );
  return certPath;
};
const tlsProps = {
  caCrt: readCertPath("ca.crt"),
  tlsCrt: readCertPath("tls.crt"),
  tlsKey: readCertPath("tls.key"), // TODO fix this
};

export async function inflationApi(codes: string[]) {
  const inflationService = new InflationService(tlsProps);
  const response = await inflationService.decadeStats(codes);
  return response;
}
