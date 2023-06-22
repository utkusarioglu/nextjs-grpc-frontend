import { type NextPageWithLayout } from "../../_app";
import UserScreen from "app/src/screens/User.screen";
import { wrapper } from "src/store";
import { routeProtector } from "src/utils/route.util";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

(UserScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default UserScreen;
