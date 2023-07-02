import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";
import { standardGetServerSideProps } from "src/utils/next.utils";

export default NextStandardHoc({
  screen: () => import("app/src/screens/Home.screen"),
  Layout: HomeTabsLayout,
});

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["rest"] },
// });
