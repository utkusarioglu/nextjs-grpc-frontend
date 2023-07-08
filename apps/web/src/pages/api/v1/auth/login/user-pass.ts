import { type NextApiHandler } from "next";
import { loginUserPassApiV1, type LoginUserPassApiV1Responses } from "api";

const handler: NextApiHandler<LoginUserPassApiV1Responses> = async (
  req,
  res
) => {
  try {
    switch (req.method) {
      case "POST":
        console.log({ body: req.body });
        const response = await loginUserPassApiV1(req.body);
        res.status(200).json(response);
        break;

      default:
        res.status(501);
    }
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: "server error",
    });
    console.log("reached handler", req.method);
  }
};

export default handler;
