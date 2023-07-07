import { inflationApi } from "app/src/api/v1/inflation";
import { type NextApiHandler } from "next";
import { type Paths } from "openapi";
import { getSearchParam } from "../../../../../utils/next.utils";

type Get = Paths["/data/inflation/decade-stats"]["get"];

type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

const handler: NextApiHandler<ResponsesUnion> = async (req, res) => {
  switch (req.method) {
    case "GET":
      const codes = getSearchParam<QueryParams>(req.url, "codes");
      if (!codes || !codes.length) {
        res.status(500);
        throw new Error("NO_CODES_GIVEN");
      }
      const response = await inflationApi({ codes });
      res.status(200).json(response);
      break;

    default:
      res.status(501);
  }
};

export default handler;
