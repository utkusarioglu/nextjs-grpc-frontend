import { routeProtector } from "src/utils/route.util";
import SettingsScreen from "app/src/screens/Settings.screen";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

export default SettingsScreen;
