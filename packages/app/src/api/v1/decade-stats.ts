import { InflationService } from "../../services/inflation/inflation.service";
import { getTlsProps } from "../../utils/readCertPath";
import { MockData } from "../../utils/mock-data.utils";

export const tlsProps = getTlsProps();

// TODO this route needs authorization
export async function inflationApi(codes: string[]) {
  try {
    if (process.env.MOCK_ENDPOINTS === "true") {
      const mockData = await MockData.decadeStats(codes);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: "success",
            payload: mockData,
          });
        }, +process.env.MOCK_LATENCY!);
      });
    }

    const inflationService = new InflationService(tlsProps);
    const payload = await inflationService.decadeStats(codes);
    return {
      status: "success",
      payload,
    };
  } catch (e: any) {
    return {
      status: "failure",
      message: e.toString(),
    };
  }
}
