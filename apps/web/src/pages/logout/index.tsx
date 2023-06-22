import LogoutScreen from "app/src/screens/Logout.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";
import { authService } from "src/services";
import { setAuth } from "store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

export default LogoutScreen;
