import { type NextPageWithLayout } from "../../_app";
import UserScreen from "app/src/screens/User.screen";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

(UserScreen as NextPageWithLayout).getLayout = (page) => (
  <HomeTabsLayout page={page} />
);

export default UserScreen;
