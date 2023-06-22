import { useEffect, type FC, type ReactNode } from "react";
import { useSelector, selectLoggedIn } from "store";
import { useRouter } from "solito/router";
import { GUEST_PATHS, GUEST_ENTRY_PATH } from "../../constants";

interface ClientSideRouteGuardProviderProps {
  children: ReactNode;
}

const ClientSideRouteGuardProvider: FC<ClientSideRouteGuardProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const isLoggedIn = useSelector(selectLoggedIn);

  useEffect(() => {
    if (!!global.window) {
      const pathname = window.location.pathname;
      const onGuestPath = GUEST_PATHS.includes(pathname);

      if (isLoggedIn && onGuestPath) {
        console.log("pushing home", !!global.window, pathname);
        router.push("/");
      } else if (!isLoggedIn && !onGuestPath) {
        console.log("pushing guest", !!global.window);
        router.push(GUEST_ENTRY_PATH);
      }
    }
  }, [router, isLoggedIn]);

  return <>{children}</>;
};

export default ClientSideRouteGuardProvider;
