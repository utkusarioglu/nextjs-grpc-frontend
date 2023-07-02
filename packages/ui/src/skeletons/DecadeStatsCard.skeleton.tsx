import {
  Card,
  XStack,
  Circle,
  Spacer,
  useWindowDimensions,
  YStack,
  Stack,
} from "tamagui";

export const DecadeStatsCardSkeleton = () => {
  const { width } = useWindowDimensions();
  return (
    <Card
      marginBottom="$4"
      padding="$4"
      borderRadius="$4"
      backgroundColor="$color4"
    >
      <Card.Header>
        <XStack space alignItems="center">
          <YStack>
            <Circle size="$5" backgroundColor="$color5" />
          </YStack>
          <XStack
            height="$2"
            borderRadius="$4"
            width={100}
            backgroundColor="$color5"
          />
          <Stack flexGrow={1} alignItems="flex-end">
            <Stack
              height="$2"
              borderRadius="$4"
              width={80}
              backgroundColor="$color5"
            />
          </Stack>
        </XStack>
      </Card.Header>
      <Spacer />
      <YStack>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <YStack key={i}>
              <XStack
                backgroundColor="$color5"
                height="$1"
                maxWidth={width - 40}
                width={Math.sin(((i + 1) / 9) * Math.PI) * (width - 40)}
                borderRadius="$2"
              />
              <Spacer size="$1" />
            </YStack>
          ))}
      </YStack>
    </Card>
  );
};

// export default DecadeStatsCardView;
