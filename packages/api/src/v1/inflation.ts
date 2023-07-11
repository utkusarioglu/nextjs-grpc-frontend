// import { InflationService } from "../services/inflation/inflation.service";
import { getTlsProps } from "../utils/cert.utils";
import { inflationClient } from "grpc";
import { MockData } from "../utils/mock-data.utils";
import { Paths } from "openapi";

type Get = Paths["/data/inflation/decade-stats"]["get"];

export type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
export type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryParams) => Promise<ResponsesUnion>;

export const tlsProps = getTlsProps();

async function getResponse(codes: string[]) {
  return new Promise(async (resolve, reject) => {
    const payload: any[] = [];
    const response = inflationClient.decadeStats({
      codes,
    });
    response.responses.onComplete(() => resolve(payload));
    response.responses.onNext((message) => payload.push(message));
    response.responses.onError((e) => reject(e));
  });
}

// TODO this route needs authorization
export const inflationApiV1: ApiHandler = async ({ codes }) => {
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

    // const inflationService = new InflationService(tlsProps);
    // const payload = await inflationService.decadeStats(codesSanitized);
    const payload = await getResponse(codesSanitized);
    console.log({ payload });
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
