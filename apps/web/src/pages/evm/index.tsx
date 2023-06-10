import EvmScreen from "app/src/screens/Evm.screen";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = async ({ req, _res }) => {
  return routeProtector(req);
};

export default EvmScreen;
