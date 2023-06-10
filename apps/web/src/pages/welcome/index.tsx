import WelcomeScreen from "app/src/screens/Welcome.screen";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default WelcomeScreen;
