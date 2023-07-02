// import { type NextPageWithLayout } from "../../../types/next-js.types";

import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";

// import UserScreen from "app/src/screens/User.screen";
// import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";
// import { standardGetServerSideProps } from "src/utils/next.utils";

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["global"] },
// });

// (UserScreen as NextPageWithLayout).getLayout = (page) => (
//   <HomeTabsLayout page={page} />
// );

// export default UserScreen;

export default NextStandardHoc({
  screen: () => import("app/src/screens/User.screen"),
  Layout: HomeTabsLayout,
});
