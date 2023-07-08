import {
  storiesApiV1,
  type StoriesApiV1QueryParams,
  type StoriesApiV1Responses,
} from "api";
import { type NextApiHandler } from "next";
import { getSearchParam } from "../../../../utils/next.utils";

const handler: NextApiHandler<StoriesApiV1Responses> = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const offset = getSearchParam<StoriesApiV1QueryParams>(
          req.url,
          "offset"
        );
        if (!offset) {
          res.status(500).json({
            status: "failure",
            message: "no offset given",
          });
          throw new Error("NO_OFFSET_GIVEN");
        }
        const limit = getSearchParam<StoriesApiV1QueryParams>(req.url, "limit");
        if (!limit) {
          res.status(500).json({
            status: "failure",
            message: "no limit given",
          });
          throw new Error("NO_LIMIT_GIVEN");
        }
        const response = await storiesApiV1({
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
