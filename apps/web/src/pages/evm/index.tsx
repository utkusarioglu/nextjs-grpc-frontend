import EvmScreen from "app/src/screens/Evm.screen";
import { standardGetServerSideProps } from "src/utils/next.utils";

export const getServerSideProps = standardGetServerSideProps({
  i18n: { namespaces: ["global"] },
});

export default EvmScreen;
