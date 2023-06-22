import { type NextPageWithLayout } from "./_app";
import HomeScreen from "app/src/screens/Home.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    console.log("RUNNING IN HOME");
    return routeProtector({ store, props });
  };
});

(HomeScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default HomeScreen;
