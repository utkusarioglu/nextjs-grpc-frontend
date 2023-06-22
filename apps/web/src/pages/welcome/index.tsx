import WelcomeScreen from "app/src/screens/Welcome.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    console.log("RUNNING IN WELCOME");
    return routeProtector({ store, props });
  };
});

export default WelcomeScreen;
