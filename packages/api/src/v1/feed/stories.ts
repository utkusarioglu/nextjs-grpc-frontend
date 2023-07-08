import { MockData } from "../../utils/mock-data.utils";
import { Paths } from "openapi";

type Get = Paths["/feed/stories"]["get"];

export type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
export type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryParams) => Promise<ResponsesUnion>;

export const storiesApiV1: ApiHandler = async ({ offset, limit }) => {
  try {
    if (process.env.MOCK_ENDPOINTS === "true") {
      const payload = await MockData.stories(offset, limit);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            status: "success",
            payload,
          });
        }, +process.env.MOCK_LATENCY!);
      });
    }

    throw new Error("NOT_IMPLEMENTED");
  } catch (err) {
    console.log("storiesApi", { err });
    switch (err) {
      case "NOT_IMPLEMENTED":
        return {
          status: "failure",
          message: "Method not yet implemented",
        };

      default:
        console.log("Unknown error");
        return {
          status: "failure",
          message: "Generic error",
        };
    }
  }
};
