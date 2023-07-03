import { postsApi } from "app/src/api/v1/feed/posts";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        const searchParamsStr = req.url.split("?")[1] || "";
        const searchParams = new URLSearchParams(searchParamsStr);
        const offset = searchParams.get("offset");
        if (!offset) {
          res.status(500).json({ msg: "no offset given" });
          throw new Error("NO_OFFSET_GIVEN");
        }
        const limit = searchParams.get("limit");
        if (!limit) {
          res.status(500).json({ msg: "no limit given" });
          throw new Error("NO_LIMIT_GIVEN");
        }
        // const codesSanitized = codes.map((code) => code.toUpperCase());
        const response = await postsApi(+offset, +limit);
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
