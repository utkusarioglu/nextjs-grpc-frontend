import { YStack, Spacer, Input, Text } from "ui";
import {
  setCountries,
  useSelector,
  selectCountryList,
  useDispatch,
} from "store/src/index";
import { DecadeStatsCardListLayout } from "../layouts/DecadeStatsCardList.layout";

const DecadeStatsScreen = () => {
  const countryList = useSelector(selectCountryList);
  const dispatch = useDispatch();
  return (
    <YStack>
      <Text>Api url: {process.env.NEXT_PUBLIC_NEXT_API_URL}</Text>
      <Input
        onChangeText={(e) => {
          return dispatch(setCountries(e));
        }}
        value={countryList}
      />
      <Spacer />
      <DecadeStatsCardListLayout />
    </YStack>
  );
};

export default DecadeStatsScreen;
