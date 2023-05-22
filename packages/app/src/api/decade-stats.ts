import { InflationService } from "../services/inflation";
import { getTlsProps } from "../utils/readCertPath";

export const tlsProps = getTlsProps();

export async function inflationApi(codes: string[]) {
  try {
    const inflationService = new InflationService(tlsProps);
    const response = await inflationService.decadeStats(codes);
    return { decadeStats: response };
  } catch (e: any) {
    return { decadeStats: [], error: e.toString() };
  }
}
