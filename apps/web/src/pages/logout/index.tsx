import LogoutScreen from "app/src/screens/Logout.screen";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

export default LogoutScreen;
