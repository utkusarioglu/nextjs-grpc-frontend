import { type NextApiHandler } from "next";
import { logoutApi } from "app/src/api/v1/auth/logout";
import { Paths } from "openapi";

type Method = Paths["/auth/logout"]["post"];

type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

const handler: NextApiHandler<ResponsesUnion> = async (req, res) => {
  console.log("logout endpoint hit", req.cookies);
  try {
    switch (req.method) {
      case "POST":
        const response = await logoutApi();
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
