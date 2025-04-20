import { useLayoutEffect, type FC, type ReactNode } from "react";
import { useSelector, selectIsLoggedIn, selectIsAppInitialized } from "store";
import { useRouter } from "solito/router";
import { GUEST_PATHS, GUEST_ENTRY_PATH } from "../../constants";
import { AppSkeleton } from "../skeletons/App.skeleton";

interface ClientSideRouteGuardProviderProps {
  children: ReactNode;
}

const ClientSideRouteGuardProvider: FC<ClientSideRouteGuardProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const isAppInitialized = useSelector(selectIsAppInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useLayoutEffect(() => {
    if (!!global.window) {
      const pathname = window.location.pathname;
      const onGuestPath = GUEST_PATHS.includes(pathname);

      if (!isAppInitialized) {
        console.log("App not initialized");
        return;
      }
      console.log("App is initialized");

      if (isLoggedIn && onGuestPath) {
        console.log("Pushing to /");
        router.push("/");
      } else if (!isLoggedIn && !onGuestPath) {
        console.log("Pushing to /welcome");
        router.push(GUEST_ENTRY_PATH);
      }
    }
  }, [router, isLoggedIn, isAppInitialized]);

  if (!isAppInitialized) {
    return (
      <AppSkeleton>
        {/* <div style={{ color: "#0FF" }}>ClientSide Route guard</div> */}
      </AppSkeleton>
    );
  }

  return <>{children}</>;
};

export default ClientSideRouteGuardProvider;
