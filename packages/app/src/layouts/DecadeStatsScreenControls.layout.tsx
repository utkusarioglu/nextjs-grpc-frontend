import { Input, Stack } from "ui";
import {
  setCountries,
  useSelector,
  selectCountryList,
  useDispatch,
} from "store";

const DecadeStatsScreenControlsLayout = () => {
  const countryList = useSelector(selectCountryList);
  const dispatch = useDispatch();

  return (
    <Stack paddingLeft="$4" paddingRight="$4">
      <Input
        onChangeText={(e) => {
          return dispatch(setCountries(e));
        }}
        value={countryList}
      />
    </Stack>
  );
};

export default DecadeStatsScreenControlsLayout;
