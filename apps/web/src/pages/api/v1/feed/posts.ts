import {
  postsApiV1,
  type PostsApiV1QueryParams,
  type PostsApiV1Responses,
} from "api";
import type { NextApiHandler } from "next";
import { getSearchParam } from "../../../../utils/next.utils";

const handler: NextApiHandler<PostsApiV1Responses> = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const offset = getSearchParam<PostsApiV1QueryParams>(req.url, "offset");
        if (!offset) {
          res.status(500).json({
            status: "failure",
            message: "no offset given",
          });
          throw new Error("NO_OFFSET_GIVEN");
        }
        const limit = getSearchParam<PostsApiV1QueryParams>(req.url, "limit");
        if (!limit) {
          res.status(500).json({
            status: "failure",
            message: "no limit given",
          });
          throw new Error("NO_LIMIT_GIVEN");
        }
        const response = await postsApiV1({
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
