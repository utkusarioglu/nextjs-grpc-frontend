import LogoutScreen from "app/src/screens/Logout.screen";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default LogoutScreen;
