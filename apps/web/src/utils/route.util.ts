import { NextRequest } from "next/server";
import { GUEST_PATHS, SYSTEM_PATHS } from "../constants";

// const SAFE_PATHS_FOR_GUESTS = ["/", "/logout"];
interface Auth {
  authId: string;
  username: string;
  _persist: string;
}

async function validateSession(auth: Auth): Promise<boolean> {
  const { authId } = auth;
  return Promise.resolve(authId === "guest");
}

export async function routeProtector(req: NextRequest) {
  const onGuestPath = GUEST_PATHS.includes(req.url);
  const onLoginPage = req.url === "/login";
  const onSystemPath = SYSTEM_PATHS.some((path) => req.url.startsWith(path));

  try {
    const sessionSliceString = req.cookies["persist:profileSlice"];
    if (!sessionSliceString) {
      return {
        props: {},
      };
    }
    const session = JSON.parse(sessionSliceString.replace(/\\"/g, ""));
    const hasValidSession = await validateSession(session);

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
    return {
      props: {},
    };
  }

  return {
    props: {},
  };
}
