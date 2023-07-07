import { type NextApiHandler } from "next";
import { loginAuthIdApi } from "app/src/api/v1/auth/login/auth-id";
import { Paths } from "openapi";
type Method = Paths["/auth/login/auth-id"]["post"];

type QueryBody = NonNullable<
  Method["requestBody"]
>["content"]["application/json"];
type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

const handler: NextApiHandler<ResponsesUnion> = async (req, res) => {
  switch (req.method) {
    case "POST":
      const response = await loginAuthIdApi(req.body);
      res.status(200).json(response);
      break;

    default:
      res.status(501);
  }
};

export default handler;
