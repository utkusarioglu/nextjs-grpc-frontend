import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";
import HomeTabsLayout from "src/components/layouts/HomeTabs.layout";

export default NextStandardHoc({
  screen: () => import("app/src/screens/DecadeStats.screen"),
  // layout: () => import("../../components/layouts/HomeTabs.layout"),
  Layout: HomeTabsLayout,
});
