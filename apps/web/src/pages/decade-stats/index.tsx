import DecadeStatsScreen from "app/src/screens/DecadeStats.screen";
import { routeProtector } from "src/utils/route.util";
import { wrapper } from "src/store";

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  return async (props) => {
    console.log("RUNNING IN DECADE STATS");
    return routeProtector({ store, props });
  };
});

export default DecadeStatsScreen;
