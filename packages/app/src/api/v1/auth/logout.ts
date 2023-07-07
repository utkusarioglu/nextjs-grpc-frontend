import { Paths } from "openapi";
import authService from "../../../services/auth/auth.service";

type Method = Paths["/auth/logout"]["post"];

type Responses = Method["responses"];
type Response200 = Responses["200"]["content"]["application/json"];
type Response500 = Responses["500"]["content"]["application/json"];
type ResponsesUnion = Response200 | Response500;

type ApiHandler = () => Promise<ResponsesUnion>;

// TODO this route needs authorization
export const logoutApi: ApiHandler = async () => {
  try {
    // res.status(200).end();
    // if (!req.cookies[AUTH_SLICE_COOKIE_NAME]) {
    //   res.status(200).end();
    //   return;
    // }
    // const authObject = ReduxPersistCookie.parse<PersistedAuthObject>(
    //   req.cookies[AUTH_SLICE_COOKIE_NAME]
    // );
    // if (!authObject) {
    //   res.status(200).end();
    //   return;
    // }

    // const { authId } = authObject;
    // TODO this needs a remake
    const authId = "guest";
    if (!authId) {
      return {
        status: "success",
        payload: {
          authId: "",
          username: "",
        },
      };
    }

    const authResponse = await authService.logoutWithAuthId({
      authId,
    });
    console.log({ authResponse });
    return {
      status: "success",
      payload: authResponse,
    };
    // res.status(200).json(authResponse);
  } catch (e) {
    console.log("userpass post", e);
    return {
      status: "failure",
      message: "server error",
    };
    // res.status(500).end();
  }
};
