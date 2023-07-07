import { type FC } from "react";
import { YStack, DecadeStatsCardSkeleton, Paragraph } from "ui";
import {
  useFetchDecadeStatsQuery,
  useSelector,
  selectCountryList,
} from "store";
import { DecadeStatsCardView } from "../views/DecadeStatsCard.view";

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
  const codesArray = countryList
    .split(",")
    // TODO remove any
    .map((i: any) => i.trim())
    .filter((i: any) => !!i);
  const {
    data,
    error,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    isUninitialized,
  } = useFetchDecadeStatsQuery({ codes: codesArray.join(",") });

  if (isError) {
    return (
      <>
        <Paragraph>There is an error</Paragraph>
        <Paragraph>{error}</Paragraph>
      </>
    );
  }

  if (isLoading || isFetching) {
    return <DecadeStatsCardListLayoutSkeleton />;
  }

  if (!data || data.status !== "success") {
    return <Paragraph>Something broken on the server side</Paragraph>;
  }

  if (!data.payload.length) {
    return <Paragraph textAlign="center">Empty...</Paragraph>;
  }

  return (
    <YStack>
      {data.payload.map((item) => (
        <DecadeStatsCardView
          key={item.stats.countryCode + item.stats.decade}
          item={item}
        />
      ))}
    </YStack>
  );
};

export default DecadeStatsCardListLayout;
