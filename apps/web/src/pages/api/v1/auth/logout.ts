import { type NextApiHandler } from "next";
import { logoutApiV1, type LogoutApiV1Responses } from "api";

const handler: NextApiHandler<LogoutApiV1Responses> = async (req, res) => {
  console.log("logout endpoint hit", req.cookies);
  try {
    switch (req.method) {
      case "POST":
        const response = await logoutApiV1();
        res.status(200).json(response);
        break;

      default:
        res.status(501).end();
    }
  } catch (e) {
    console.log("userpass post", e);
    res.status(500).end();
  }
};

export default handler;
