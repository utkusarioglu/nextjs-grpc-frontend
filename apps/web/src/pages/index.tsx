import HomeScreen from "app/src/screens/Home.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    console.log("RUNNING IN HOME");
    return routeProtector({ store, props });
  };
});

export default HomeScreen;
