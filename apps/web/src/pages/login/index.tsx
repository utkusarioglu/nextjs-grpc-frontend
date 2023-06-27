import LoginScreen from "app/src/screens/Login.screen";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

export default LoginScreen;
