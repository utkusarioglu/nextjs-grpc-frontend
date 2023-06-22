import { type NextPageWithLayout } from "../_app";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    console.log("RUNNING IN DECADE STATS");
    return routeProtector({ store, props });
  };
});

(DecadeStatsScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default DecadeStatsScreen;
