import { routeProtector } from "src/utils/route.util";
import SettingsScreen from "app/src/screens/Settings.screen";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default SettingsScreen;
