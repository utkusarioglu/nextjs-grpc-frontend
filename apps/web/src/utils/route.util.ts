import { NextRequest } from "next/server";
import { GUEST_PATHS, SYSTEM_PATHS } from "../constants";
import { ReduxPersistCookie } from "../utils/cookie.utils";
import { type PersistedAuthObject } from "../types/auth.types";
import { authService } from "src/services";
import { AUTH_SLICE_COOKIE_NAME } from "../constants";

const EMPTY_PROPS = {
  props: {},
};

export async function routeProtector(req: NextRequest) {
  const onGuestPath = GUEST_PATHS.includes(req.url);
  const onLoginPage = req.url === "/login";
  const onSystemPath = SYSTEM_PATHS.some((path) => req.url.startsWith(path));

  try {
    const authObject = ReduxPersistCookie.parse<PersistedAuthObject>(
      req.cookies[AUTH_SLICE_COOKIE_NAME]
    );

    if (!authObject) {
      return EMPTY_PROPS;
    }
    const { authId } = authObject;
    if (!authId) {
      return EMPTY_PROPS;
    }

    const hasValidSession = await authService.validateWithAuthId(authId);

    if (onGuestPath && hasValidSession) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    } else if (!onGuestPath && !onSystemPath && !hasValidSession) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
  } catch (e) {
    // TODO remove this
    console.log("something failed", e);
    if (!onLoginPage) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    return EMPTY_PROPS;
  }

  return EMPTY_PROPS;
}
