import { type NextPageWithLayout } from "../_app";
import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

(DecadeStatsScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default DecadeStatsScreen;
