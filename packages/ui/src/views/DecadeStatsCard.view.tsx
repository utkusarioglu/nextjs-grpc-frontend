import { Card, H2, Text, H1, ListItem } from "tamagui";
import { type FC } from "react";

interface DecadeStatsCardViewProps {
  item: {
    countryName: string;
    countryCode: string;
    decade: number;
    count: number;
    average: number;
    max: number;
    min: number;
    median: number;
    range: number;
    stdDev: number;
    variance: number;
  };
}

export const DecadeStatsCardView: FC<DecadeStatsCardViewProps> = ({
  item: { countryName, countryCode, ...rest },
}) => {
  return (
    <Card
      pressStyle={{
        scale: 0.9,
      }}
      marginBottom={10}
      padding={10}
    >
      <Card.Header>
        <H1>{countryName}</H1>
      </Card.Header>
      <H2>{countryCode}</H2>
      {Object.entries(rest).map(([key, stat]) => (
        <Text key={key}>
          {key}: {stat}
        </Text>
      ))}
    </Card>
  );
};

// export default DecadeStatsCardView;
