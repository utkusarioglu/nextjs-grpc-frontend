import {
  Avatar,
  Card,
  H3,
  XStack,
  Circle,
  SizableText,
  Spacer,
  useWindowDimensions,
  YStack,
  Paragraph,
} from "tamagui";
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
  index: number;
}

export const DecadeStatsCardView: FC<DecadeStatsCardViewProps> = ({
  item: { countryName, countryCode, decade, ...rest },
  index,
}) => {
  const { width } = useWindowDimensions();
  return (
    <Card
      animation="fast"
      pressStyle={{
        scale: 0.9,
      }}
      marginBottom="$4"
      padding="$4"
      borderRadius="$4"
    >
      <Card.Header>
        <XStack space alignItems="center">
          <YStack>
            <Avatar circular size="$5" shadowColor="black" shadowRadius={3}>
              <Avatar.Image
                src={[
                  process.env.NEXT_PUBLIC_WEB_APP_URL,
                  `/mock/avatars/${index % 7}.jpg`,
                ].join("/")}
              />
              <Avatar.Fallback
                // @ts-ignore #1
                bc="$color6"
              />
            </Avatar>
            <Circle
              rotate="-45deg"
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              zIndex={1}
            >
              <SizableText textShadowColor="black" textShadowRadius={5}>
                {countryCode}
              </SizableText>
            </Circle>
          </YStack>
          <H3>{countryName.toUpperCase()}</H3>
          <H3 flexGrow={1} textAlign="right">
            {decade}
          </H3>
        </XStack>
      </Card.Header>
      <Spacer />

      {Object.entries(rest).map(([key, stat]) => (
        <YStack key={key}>
          <YStack justifyContent="center">
            <XStack
              position="absolute"
              backgroundColor="$color7"
              height="$1"
              minWidth={100}
              maxWidth={width - 40}
              width={(stat / 10) * width}
              zIndex={-1}
              justifyContent="flex-end"
              alignItems="center"
              paddingRight="$2"
              borderRadius="$2"
            >
              <Paragraph color="black">{stat}</Paragraph>
            </XStack>

            <Paragraph marginLeft="$2">
              {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
            </Paragraph>
          </YStack>
          <Spacer size="$1" />
        </YStack>
      ))}
    </Card>
  );
};

// export default DecadeStatsCardView;
