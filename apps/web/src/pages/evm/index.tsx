// import EvmScreen from "app/src/screens/Evm.screen";
// import { standardGetServerSideProps } from "src/utils/next.utils";

import { NextStandardHoc } from "src/components/hocs/NextStandardHocProps";

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["global"] },
// });

// export default EvmScreen;

export default NextStandardHoc({
  screen: () => import("app/src/screens/Evm.screen"),
});
