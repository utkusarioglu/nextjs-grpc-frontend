import { GUEST_PATHS, GUEST_ENTRY_PATH } from "../constants";
import { authService } from "src/services";
import type { Store } from "src/store";
import type { ParsedUrlQuery } from "querystring";
import type { GetServerSidePropsContext, PreviewData } from "next";
import { setAuth } from "store";

const EMPTY_PROPS = {
  props: {},
};

interface RouteProtectorProps {
  store: Store;
  props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
}

export async function routeProtector({ store, props }: RouteProtectorProps) {
  const state = store.getState();
  const resolvedUrl = props.resolvedUrl;

  const isLoggedIn = state.auth._computed.isLoggedIn;
  const authId = state.auth.authId;
  const onAGuestPath = GUEST_PATHS.includes(resolvedUrl);
  const onGuestEntryPath = resolvedUrl === GUEST_ENTRY_PATH;
  try {
    const hasValidSession = await authService.validateWithAuthId(authId);

    if (hasValidSession && resolvedUrl === "/logout") {
      store.dispatch(setAuth({ username: "", authId: "" }));
    }

    if (onAGuestPath && isLoggedIn && hasValidSession) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    if (!onAGuestPath && !isLoggedIn) {
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
