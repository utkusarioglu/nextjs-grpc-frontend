import { readCertPath } from "../../utils/readCertPath";

process.env = {
  ...process.env,
  CERTIFICATES_ABSPATH:
    "/utkusarioglu-com/projects/nextjs-grpc/frontend/apps/web/.certs",
  MS_GRPC_CLIENT_CERT_FOR_WEB_SERVER_RELPATH:
    "ms-grpc-client-cert-for-web-server",
  WEB_SERVER_SERVER_CERT_RELPATH: "web-server-server-cert",
};

describe("decade-stats", () => {
  it("readCertPath", () => {
    const response = readCertPath("ca.crt");
    expect(Buffer.isBuffer(response)).toBe(true);
    expect(response.length).toBeGreaterThan(2);
  });
});
