import { type FC } from "react";
import { YStack, Text, DecadeStatsCardView } from "ui";
import {
  useInflationDecadeStats,
  useSelector,
  selectCountryList,
} from "store/src/index";

interface DecadeStatsCardListLayoutProps {}
export const DecadeStatsCardListLayout: FC<
  DecadeStatsCardListLayoutProps
> = () => {
  const countryList = useSelector(selectCountryList);
  const countriesArray = countryList
    .split(",")
    .map((i) => i.trim())
    .filter((i) => !!i);
  const { data, error, isLoading } = useInflationDecadeStats(countriesArray);

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data || !data.decadeStats.length) {
    return <Text>Empty...</Text>;
  }

  return (
    <YStack>
      {data.decadeStats.map((item) => (
        <DecadeStatsCardView key={item.countryCode} item={item} />
      ))}
    </YStack>
  );
};