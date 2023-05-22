import { inflationApi } from "app/src/api/decade-stats";
import { type NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const searchParamsStr = req.url.split("?")[1] || "";
      const searchParams = new URLSearchParams(searchParamsStr);
      const codes = searchParams.get("codes")?.split(",");
      if (!codes || !codes.length) {
        res.status(500);
        throw new Error("NO_CODES_GIVEN");
      }
      const codesSanitized = codes.map((code) => code.toUpperCase());
      const response = await inflationApi(codesSanitized);
      console.log({ codes, codesSanitized, response });
      res.status(200).json(response);
      break;

    default:
      res.status(501);
  }
};

export default handler;
