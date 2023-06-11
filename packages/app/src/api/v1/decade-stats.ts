import { InflationService } from "../../services/inflation/inflation.service";
import { getTlsProps } from "../../utils/readCertPath";
import { MockData } from "../../utils/mock-data.utils";

export const tlsProps = getTlsProps();

console.log({ MOCK_ENDPOINTS: process.env.MOCK_ENDPOINTS });

// TODO this route needs authorization
export async function inflationApi(codes: string[]) {
  try {
    if (process.env.MOCK_ENDPOINTS === "true") {
      const mockData = await MockData.decadeStats(codes);
      return { decadeStats: mockData };
    }

    const inflationService = new InflationService(tlsProps);
    const response = await inflationService.decadeStats(codes);
    return { decadeStats: response };
  } catch (e: any) {
    return { decadeStats: [], error: e.toString() };
  }
}
