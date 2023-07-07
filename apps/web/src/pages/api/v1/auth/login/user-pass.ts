import { type NextApiHandler } from "next";
import { loginUserPassApi } from "app/src/api/v1/auth/login/user-pass";
import { Paths } from "openapi";

type Method = Paths["/auth/login/user-pass"]["post"];

type QueryBody = NonNullable<
  Method["requestBody"]
>["content"]["application/json"];
type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

const handler: NextApiHandler<ResponsesUnion> = async (req, res) => {
  try {
    switch (req.method) {
      case "POST":
        console.log({ body: req.body });
        const response = await loginUserPassApi(req.body);
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
