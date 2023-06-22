import EvmScreen from "app/src/screens/Evm.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

export default EvmScreen;
