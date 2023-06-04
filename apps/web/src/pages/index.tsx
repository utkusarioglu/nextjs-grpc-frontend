import HomeScreen from "app/src/screens/Home.screen";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default HomeScreen;
