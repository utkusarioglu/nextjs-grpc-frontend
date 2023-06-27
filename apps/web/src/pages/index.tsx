import { type NextPageWithLayout } from "./_app";
import HomeScreen from "app/src/screens/Home.screen";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

(HomeScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default HomeScreen;
