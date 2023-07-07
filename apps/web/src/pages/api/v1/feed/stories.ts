import { storiesApi } from "app/src/api/v1/feed/stories";
import { type NextApiHandler } from "next";
import { type Paths } from "openapi";
import { getSearchParam } from "../../../../utils/next.utils";

type Get = Paths["/feed/stories"]["get"];

type QueryParams = Get["parameters"]["query"];
type Responses = Get["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

const handler: NextApiHandler<ResponsesUnion> = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const offset = getSearchParam<QueryParams>(req.url, "offset");
        if (!offset) {
          res.status(500).json({
            status: "failure",
            message: "no offset given",
          });
          throw new Error("NO_OFFSET_GIVEN");
        }
        const limit = getSearchParam<QueryParams>(req.url, "limit");
        if (!limit) {
          res.status(500).json({
            status: "failure",
            message: "no limit given",
          });
          throw new Error("NO_LIMIT_GIVEN");
        }
        const response = await storiesApi({
          offset: +offset,
          limit: +limit,
        });
        res.status(200).json(response);
        break;

      default:
        res.status(501);
    }
  } catch (err) {
    res.status(500);
  }
};

export default handler;
