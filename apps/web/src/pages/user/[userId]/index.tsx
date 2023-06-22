import UserScreen from "app/src/screens/User.screen";
import { wrapper } from "src/store";
import { routeProtector } from "src/utils/route.util";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    return routeProtector({ store, props });
  };
});

export default UserScreen;
