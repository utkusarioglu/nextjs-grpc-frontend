import { useEffect, type FC, type ReactNode } from "react";
import { selectProfile, useSelector } from "store/src";
import { useRouter } from "solito/router";
import { GUEST_PATHS, GUEST_ENTRY_PATH } from "../../constants";

interface ClientSideRouteGuardProviderProps {
  children: ReactNode;
}

const ClientSideRouteGuardProvider: FC<ClientSideRouteGuardProviderProps> = ({
  children,
}) => {
  const {
    authId,
    username,
    _persist: { rehydrated },
  } = useSelector(selectProfile);
  const router = useRouter();

  useEffect(() => {
    if (window) {
      const pathname = window.location.pathname;
      const isGuest = !authId && !username;
      const isLoggedIn = !!authId && !!username;
      const onGuestPath = GUEST_PATHS.includes(pathname);

      if (rehydrated) {
        if (isLoggedIn && onGuestPath) {
          router.push("/");
        } else if (isGuest && !onGuestPath) {
          router.push(GUEST_ENTRY_PATH);
        }
      }
    } else {
      console.log("no window", authId, username);
    }
  }, [authId, username, router, rehydrated]);

  return <>{children}</>;
};

export default ClientSideRouteGuardProvider;
