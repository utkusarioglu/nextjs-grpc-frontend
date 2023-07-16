import {
  inflationClient,
  type InflationDecadeStatsRequest,
  type InflationDecadeStatsResponse,
} from "grpc";
import { MockData } from "../utils/mock-data.utils";
import { Paths } from "openapi";

type Get = Paths["/data/inflation/decade-stats"]["get"];

export type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
export type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryParams) => Promise<ResponsesUnion>;

async function getInflationApiV1Response(params: InflationDecadeStatsRequest) {
  return new Promise<InflationDecadeStatsResponse[]>(
    async (resolve, reject) => {
      const payload: InflationDecadeStatsResponse[] = [];
      const { responses } = inflationClient.decadeStats(params);
      responses.onComplete(() => {
        console.log("Grpc message completed: ", {
          codes: params.codes,
          payload,
        });
        resolve(payload);
      });
      responses.onNext((message) => {
        if (message) {
          console.log("Received grpc message:", message);
          payload.push(message);
        }
      });
      responses.onError((e) => reject(e));
    }
  );
}

// TODO this route needs authorization
// @ts-ignore
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

    const payload = await getInflationApiV1Response({ codes: codesSanitized });

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
