import { Paths } from "openapi";
import authService from "../../../services/auth/auth.service";

type Method = Paths["/auth/login/user-pass"]["post"];

type QueryBody = NonNullable<
  Method["requestBody"]
>["content"]["application/json"];
type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
export type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryBody) => Promise<ResponsesUnion>;

// export const tlsProps = getTlsProps();

// TODO this route needs authorization
export const loginUserPassApiV1: ApiHandler = async ({
  username,
  password,
}) => {
  try {
    const authObject = await authService.loginWithUserPass({
      username,
      password,
    });
    return {
      status: "success",
      payload: authObject,
    };
  } catch (e: any) {
    return {
      status: "failure",
      message: e.toString(),
    };
  }
};
