import { type FC } from "react";
import {
  YStack,
  Text,
  DecadeStatsCardView,
  Spacer,
  DecadeStatsCardSkeleton,
  Paragraph,
} from "ui";
import { useInflationDecadeStats, useSelector, selectCountryList } from "store";

interface DecadeStatsCardListLayoutProps {}

export const DecadeStatsCardListLayoutSkeleton = () => (
  <>
    {Array(3)
      .fill(null)
      .map((_, i) => (
        <DecadeStatsCardSkeleton key={i} />
      ))}
  </>
);

const DecadeStatsCardListLayout: FC<DecadeStatsCardListLayoutProps> = () => {
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
    return (
      <>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <DecadeStatsCardSkeleton key={i} />
          ))}
      </>
    );
  }

  if (!data || !data.decadeStats.length) {
    return <Paragraph textAlign="center">Empty...</Paragraph>;
  }

  return (
    <YStack>
      {data.decadeStats.map((item, index) => (
        <DecadeStatsCardView
          key={item.countryCode + item.decade}
          item={item}
          index={index}
        />
      ))}
    </YStack>
  );
};

export default DecadeStatsCardListLayout;
