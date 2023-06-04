import LoginScreen from "app/src/screens/Login.screen";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default LoginScreen;
