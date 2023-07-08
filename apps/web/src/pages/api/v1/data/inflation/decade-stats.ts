import {
  inflationApiV1,
  type InflationApiV1Responses,
  type InflationApiV1ResponsesQueryParams,
} from "api";
import { type NextApiHandler } from "next";
import { getSearchParam } from "../../../../../utils/next.utils";

const handler: NextApiHandler<InflationApiV1Responses> = async (req, res) => {
  switch (req.method) {
    case "GET":
      const codes = getSearchParam<InflationApiV1ResponsesQueryParams>(
        req.url,
        "codes"
      );
      if (!codes || !codes.length) {
        res.status(500);
        throw new Error("NO_CODES_GIVEN");
      }
      const response = await inflationApiV1({ codes });
      res.status(200).json(response);
      break;

    default:
      res.status(501);
  }
};

export default handler;
