import { GUEST_PATHS, GUEST_ENTRY_PATH, LOGOUT_PATH } from "../constants";
import authService from "app/src/services/auth/auth.service";
import type { Store } from "src/store";
import type { ParsedUrlQuery } from "querystring";
import type { GetServerSidePropsContext, PreviewData } from "next";
import { setAuth } from "store";

const EMPTY_PROPS = {};

interface RouteProtectorProps {
  store: Store;
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
}

export async function routeProtector({ store, props }: RouteProtectorProps) {
  const resolvedUrl = props.resolvedUrl;
  const state = store.getState();
  const isLoggedIn = state.app._computed.isLoggedIn;
  const authId = state.app.auth.authId;
  const isOnAGuestPath = GUEST_PATHS.includes(resolvedUrl);

  const onGuestEntryPath = resolvedUrl === GUEST_ENTRY_PATH;
  const isOnLogoutPath = resolvedUrl === LOGOUT_PATH;

  try {
    const hasValidSession = await authService.validateWithAuthId(authId);
    const isAuthorized = isLoggedIn && hasValidSession;

    if (isAuthorized && isOnLogoutPath) {
      store.dispatch(setAuth({ username: "", authId: "" }));
    }

    if (isAuthorized && isOnAGuestPath) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    if (!isAuthorized && !isOnAGuestPath) {
      store.dispatch(setAuth({ authId: "", username: "" }));
      console.log("WILL REDIRECT");
      return {
        redirect: {
          permanent: false,
          destination: GUEST_ENTRY_PATH,
        },
      };
    }

    return EMPTY_PROPS;
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
}
