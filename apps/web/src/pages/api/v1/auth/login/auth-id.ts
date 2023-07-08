import { type NextApiHandler } from "next";
import { loginAuthIdApiV1, type LoginAuthIdApiV1Responses } from "api";

const handler: NextApiHandler<LoginAuthIdApiV1Responses> = async (req, res) => {
  switch (req.method) {
    case "POST":
      const response = await loginAuthIdApiV1(req.body);
      res.status(200).json(response);
      break;

    default:
      res.status(501);
  }
};

export default handler;
