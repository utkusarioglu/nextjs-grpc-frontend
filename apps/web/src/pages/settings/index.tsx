import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";

export default NextStandardHoc({
  screen: () => import("app/src/screens/Settings.screen"),
});
