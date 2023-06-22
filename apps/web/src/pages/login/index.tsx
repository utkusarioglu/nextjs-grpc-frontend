import LoginScreen from "app/src/screens/Login.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

export default LoginScreen;
