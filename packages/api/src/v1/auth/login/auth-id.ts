import { Paths } from "openapi";
import authService from "../../../services/auth/auth.service";

type Method = Paths["/auth/login/auth-id"]["post"];

type QueryBody = NonNullable<
  Method["requestBody"]
>["content"]["application/json"];
type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
export type ResponsesUnion = Response200 | Response500;

type ApiHandler = (params: QueryBody) => Promise<ResponsesUnion>;

export const loginAuthIdApiV1: ApiHandler = async ({ authId }) => {
  try {
    const authResponse = await authService.loginWithAuthId({
      authId,
    });
    return {
      status: "success",
      payload: authResponse,
    };
  } catch (e) {
    console.log("userpass post", e);
    return {
      status: "failure",
      message: "server error",
    };
  }
};
