import SettingsScreen from "app/src/screens/Settings.screen";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

export default SettingsScreen;
