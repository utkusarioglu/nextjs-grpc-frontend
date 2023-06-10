import { NextRequest } from "next/server";
import { GUEST_PATHS, SYSTEM_PATHS, GUEST_ENTRY_PATH } from "../constants";
import { ReduxPersistCookie } from "../utils/cookie.utils";
import { type PersistedAuthObject } from "../types/auth.types";
import { authService } from "src/services";
import { AUTH_SLICE_COOKIE_NAME } from "../constants";

const EMPTY_PROPS = {
  props: {},
};

export async function routeProtector(req: NextRequest) {
  const onAGuestPath = GUEST_PATHS.includes(req.url);
  const onGuestEntryPath = req.url === GUEST_ENTRY_PATH;
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

    if (onAGuestPath && hasValidSession) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    } else if (!onAGuestPath && !onSystemPath && !hasValidSession) {
      return {
        redirect: {
          permanent: false,
          destination: GUEST_ENTRY_PATH,
        },
      };
    }
  } catch (e) {
    // TODO remove this
    console.log("something failed", e);
    if (!onGuestEntryPath) {
      return {
        redirect: {
          permanent: false,
          destination: GUEST_ENTRY_PATH,
        },
      };
    }
    return EMPTY_PROPS;
  }

  return EMPTY_PROPS;
}
