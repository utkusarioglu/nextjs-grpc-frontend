import { YStack, Spacer, Input, Paragraph, ScrollView, Stack } from "ui";
import {
  setCountries,
  useSelector,
  selectCountryList,
  useDispatch,
} from "store";
import { DecadeStatsCardListLayout } from "../layouts/DecadeStatsCardList.layout";

const DecadeStatsScreen = () => {
  const countryList = useSelector(selectCountryList);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Stack paddingLeft="$4" paddingRight="$4">
        <Paragraph>Api v1: {process.env.NEXT_PUBLIC_API_V1_URL}</Paragraph>
        <Input
          onChangeText={(e) => {
            return dispatch(setCountries(e));
          }}
          value={countryList}
        />
      </Stack>
      <Spacer />
      <DecadeStatsCardListLayout />
    </ScrollView>
  );
};

export default DecadeStatsScreen;
