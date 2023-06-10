import { YStack, Spacer, Input, Paragraph } from "ui";
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
    <YStack fullscreen>
      <Paragraph>Api v1: {process.env.NEXT_PUBLIC_API_V1_URL}</Paragraph>
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
