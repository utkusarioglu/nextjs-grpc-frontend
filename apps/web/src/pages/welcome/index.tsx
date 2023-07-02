// import { useMemo } from "react";
// import { standardGetServerSideProps } from "src/utils/next.utils";
import { NextStandardHoc } from "../../components/hocs/NextStandardHocProps";

// export const getServerSideProps = standardGetServerSideProps({
//   i18n: { namespaces: ["global"] },
// });

// const WelcomePage = () => {
//   const LazyScreen = useMemo(
//     () =>
//       dynamic(() => import("app/src/screens/Welcome.screen"), {
//         loading: () => <div style={{ color: "#0F0" }}>Screen</div>,
//       }),
//     []
//   );

//   return <LazyScreen />;
// };

// const WelcomePage = NextStandardHoc({
//   screen: () => import("app/src/screens/Welcome.screen"),
// });

// export default WelcomePage;

export default NextStandardHoc({
  screen: () => import("app/src/screens/Welcome.screen"),
});

// export default WelcomePage;
