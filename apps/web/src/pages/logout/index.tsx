// import LogoutScreen from "app/src/screens/Logout.screen";
// import { standardGetServerSideProps } from "src/utils/next.utils";

import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["global"] },
// });

// export default LogoutScreen;

export default NextStandardHoc({
  screen: () => import("app/src/screens/Logout.screen"),
});
