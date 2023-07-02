// import LoginScreen from "app/src/screens/Login.screen";
// import { standardGetServerSideProps } from "src/utils/next.utils";

import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["global"] },
// });

// export default LoginScreen;

export default NextStandardHoc({
  screen: () => import("app/src/screens/Login.screen"),
});
