import { type FC } from "react";
import { YStack, Text, DecadeStatsCardView, ScrollView } from "ui";
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
    // TODO remove any
    .map((i: any) => i.trim())
    .filter((i: any) => !!i);
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
    <ScrollView>
      <YStack>
        {data.decadeStats.map((item) => (
          <DecadeStatsCardView key={item.countryCode} item={item} />
        ))}
      </YStack>
    </ScrollView>
  );
};
