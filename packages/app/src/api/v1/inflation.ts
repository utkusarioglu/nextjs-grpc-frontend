import { InflationService } from "../../services/inflation/inflation.service";
import { getTlsProps } from "../../utils/readCertPath";
import { MockData } from "../../utils/mock-data.utils";
import { Paths } from "openapi";

type Get = Paths["/data/inflation/decade-stats"]["get"];

type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryParams) => Promise<ResponsesUnion>;

export const tlsProps = getTlsProps();

// TODO this route needs authorization
export const inflationApi: ApiHandler = async ({ codes }) => {
  try {
    const codesSanitized = codes
      .split(",")
      .map((code) => code.toUpperCase().trim());
    if (process.env.MOCK_ENDPOINTS === "true") {
      const mockData = await MockData.decadeStats(codesSanitized);
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
    const payload = await inflationService.decadeStats(codesSanitized);
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
};
