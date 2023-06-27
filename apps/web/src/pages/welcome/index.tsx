import WelcomeScreen from "app/src/screens/Welcome.screen";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

export default WelcomeScreen;
